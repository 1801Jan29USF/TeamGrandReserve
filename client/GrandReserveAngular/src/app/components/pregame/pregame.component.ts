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
import {CookieService} from 'angular2-cookie/core';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css']
})
export class PregameComponent implements OnInit, OnDestroy {
  code;
  redTeam: Team = new Team;
  blueTeam: Team = new Team;
  isPlayer;
  constructor(private client: HttpClient, private router: Router, private ws: WebsocketService, private cookie: CookieService) { }

  ngOnInit() {
    console.log('PREGAME COOKIE' + this.cookie.get('user'));
    this.code = this.cookie.get('game-code').replace(/"/g, '');
      if (this.cookie.get('user')) {
        this.isPlayer = true;
      }else if (this.cookie.get('instructor')) {
        this.isPlayer = false;
      }
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
    if (player.points === 0) {
      this.redTeam.players.forEach(function (value) {
        value.captain = player.name === value.name;
      });
    } else if (player.points === 1) {
      this.blueTeam.players.forEach(function (value) {
        value.captain = player.name === value.name;
      });
    }

  }
  startGame() {
    this.ws.sendToMap(this.code);
  }

}
