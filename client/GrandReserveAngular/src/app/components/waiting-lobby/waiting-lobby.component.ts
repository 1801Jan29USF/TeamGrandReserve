import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { WebsocketService } from '../../services/websocket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Game } from '../../beans/game';

@Component({
  selector: 'app-waiting-lobby',
  templateUrl: './waiting-lobby.component.html',
  styleUrls: ['./waiting-lobby.component.css']
})
export class WaitingLobbyComponent implements OnInit, OnDestroy {
  code;
  game: Game = new Game;
  points;
  player;
  constructor(private router: Router, private cookie: CookieService, private ws: WebsocketService, private client: HttpClient) { }

  ngOnInit() {
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.player = this.cookie.get('user').replace(/"/g, '');
    this.client.get(`${environment.context}game/get/`.concat(this.code)).subscribe(
      (succ: Game) => {
        console.log(succ);
        this.game = succ;
        const team = this.cookie.getObject('team');
        if (team === '0') {
          console.log('hello');

          for (const player of this.game.teams[0].players) {
            console.log(player.name);

            if (this.player === player.name) {
              this.points = player.points;
            }
          }
          document.getElementsByTagName('thead')[0].classList.add('red');
          this.ws.initializeWebSocketConnection('waiting-red');
        } else if (team === '1') {
          for (const player of this.game.teams[1].players) {
            if (this.player === player.name) {
              this.points = player.points;
            }
          }
          document.getElementsByTagName('thead')[0].classList.add('blue');
          this.ws.initializeWebSocketConnection('waiting-blue');
        }
      },
      (err) => {
        console.log('failed');
      }
    );

  }

  ngOnDestroy() {
    this.ws.endConnection();
  }

}
