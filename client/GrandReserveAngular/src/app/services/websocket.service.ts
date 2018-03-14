import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Stomp from 'stompjs';
import { StompService } from 'ng2-stomp-service';
import {Router} from '@angular/router';
import { Team } from '../beans/team';
import { Subject } from 'rxjs/Subject';
import { Player } from '../beans/player';


@Injectable()
export class WebsocketService {

  public static teams: Array<Subject<Player>> = new Array(2);
  private subscription: any = new Subject;
  private wsConf: any = {
    host: 'http://localhost:8080/server/socket'
  };
  constructor(public stomp: StompService, private router: Router) {
  }

  initializeWebSocketConnection(channel: string) {

    this.stomp.configure(this.wsConf);

    this.stomp.startConnect().then(() => {
      console.log('connected');
      switch (channel) {
        case('question'):
          this.subscription = this.stomp.subscribe(`/stomp/question`, this.routeToQuestion);
          break;
        case('player'):
          this.subscription = this.stomp.subscribe(`/stomp/player`, this.getTeams);
          break;
      }
    });

  }

  endConnection() {
    this.stomp.disconnect().then(() => {
      console.log('Connection closed');
    });
  }


  sendPlayer(player, team) {
    this.stomp.send('/app/send/player', {'player': player, 'team': team});
  }

  sendQuestion(code) {
    this.stomp.send('/app/send/question', {'code': code});
  }


  public getTeams = (data, i) => {
    const tmp = new Player;
    tmp.name = data.player;
    WebsocketService.teams[data.team].next(tmp);
  }

  public routeToQuestion = (data) => {
    console.log(data);
    this.router.navigateByUrl('/question');
  }

}
