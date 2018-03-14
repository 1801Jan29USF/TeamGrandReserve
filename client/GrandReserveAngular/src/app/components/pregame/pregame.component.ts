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
  decoded = decodeURIComponent(document.cookie).split("; ");
  code;
  redTeam: Team = new Team;
  blueTeam: Team = new Team;
  isPlayer;
  constructor(private client: HttpClient, private router: Router, private ws: WebsocketService) { }

  ngOnInit() {
    this.decoded.forEach((cookie) =>{
      if(cookie.startsWith('game-code')){
        this.code = cookie.substr('game-code="'.length);
        this.code = this.code.slice(0, -1);
      }
      if(cookie.startsWith('user')){
        this.isPlayer = true;
      }
      else if(cookie.startsWith('instructor')){
        this.isPlayer = false;
      }
    });
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
    if (!player.isCaptain) {
      if (this.redTeam.players.includes(player)) {
        this.redTeam.players.forEach(function (value) {
          if (value.isCaptain) {
            value.isCaptain = false;

          }
        });
      } else if (this.blueTeam.players.includes(player)) {
        this.blueTeam.players.forEach(function (value) {
          if (value.isCaptain) {
            value.isCaptain = false;
          }
        });
      }
      player.isCaptain = true;
      console.log('This player is now the leader');
    } else {
      console.log('This player is already the leader.');
    }

  }

  startGame() {
    this.router.navigateByUrl('/menu');
  }

}
