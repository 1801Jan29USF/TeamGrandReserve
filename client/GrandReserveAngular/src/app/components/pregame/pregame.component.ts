import { Component, OnInit, OnDestroy } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Game } from '../../beans/game';
import { environment } from '../../../environments/environment';
import { Instructor } from '../../beans/instructor';
import { Team } from '../../beans/team';
import { Player } from '../../beans/player';
import { WebsocketService } from '../../services/websocket.service';
import { AsyncPipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css']
})
export class PregameComponent implements OnInit, OnDestroy {
  decoded: string = decodeURIComponent(document.cookie);
  code = this.decoded.substr(this.decoded.indexOf('game-code="') + 'game-code="'.length, 4);
  redTeam: Team = new Team;
  blueTeam: Team = new Team;

  constructor(private client: HttpClient, private router: Router, private ws: WebsocketService) { }

  ngOnInit() {
    this.ws.initializeWebSocketConnection('player');
    this.client.get(`${environment.context}game/get/`.concat(this.code)).subscribe(
      (succ: Game) => {
         console.log(succ);
         this.code = succ.code.toUpperCase();
         this.redTeam = succ.teams[0];
         this.blueTeam = succ.teams[1];
         WebsocketService.teams[0].subscribe((player: Player) => {
            this.redTeam.players.push(player);
         });
         WebsocketService.teams[1].subscribe((player: Player) => {
          this.blueTeam.players.push(player);
         });
         this.ws.leaderSubject.subscribe((player: Player) => {
          this.updateLeader(player);
         });

      },
      (err) => {
        console.log('failed');
      }
    );
  }

  ngOnDestroy() {
     this.ws.endConnection();
  }

  setLeader(player: Player) {
    // TODO: this doesn't work when you get to game screen, need db calls here to keep changes
    if (!player.captain) {
      if (this.redTeam.players.includes(player)) {
        this.redTeam.players.forEach(function (value) {
          if (value.captain) {
            value.captain = false;

          }
        });
      } else if (this.blueTeam.players.includes(player)) {
        this.blueTeam.players.forEach(function (value) {
          if (value.captain) {
            value.captain = false;
          }
        });
      }
      player.captain = true;
      this.ws.sendLeader(player);
      console.log('This player is now the leader');
    } else {
      console.log('This player is already the leader.');
    }

  }

  updateLeader(player: Player) {
    console.log(1);
    if (player.points === 0) {
      console.log(2);
      this.redTeam.players.forEach(function (value) {
        if (player.name === value.name) {
          value.captain = true;
          console.log(3);
        } else {
          value.captain = false;
          console.log(4);
        }
      });
    } else if (player.points === 1) {
      this.blueTeam.players.forEach(function (value) {
        if (player.name === value.name) {
          value.captain = true;
        } else {
          value.captain = false;
        }
      });
    }

  }
  startGame() {
    this.ws.sendToMap();
  }

}
