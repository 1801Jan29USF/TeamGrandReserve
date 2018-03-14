import { Component, OnInit, OnDestroy } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../../beans/game';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { WebsocketService } from '../../services/websocket.service';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  code;
  name;
  team;

  constructor(private client: HttpClient, private router: Router,
    private cookie: CookieService, private ws: WebsocketService) { }

  ngOnInit() {
    this.ws.initializeWebSocketConnection('player');
  }

  ngOnDestroy() {
    this.ws.endConnection();
  }

  submitGameRegis() {
    const url = (this.code.toLowerCase()).concat('/').concat(this.team).concat('/').concat(this.name);
    console.log(url);
    this.client.get(`${environment.context}game/add-player/`.concat(url)).subscribe(
      (succ: Game) => {
        this.cookie.putObject('game-code', succ.code);
        this.ws.sendPlayer(this.name, this.team);
        this.router.navigateByUrl('/pregame');

      },
      (err) => {
        console.log('failed');
      }
    );
  }
}
