import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Stomp from 'stompjs';
import { StompService } from 'ng2-stomp-service';
import { Router } from '@angular/router';
import { Team } from '../beans/team';
import { Subject } from 'rxjs/Subject';
import { Player } from '../beans/player';


@Injectable()
export class WebsocketService {

  public static teams: Array<Subject<Player>> = new Array(2);
  public static stomp;
  private subscription: any = new Subject;
  public leaderSubject: any = new Subject;
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
        case ('question'):
          this.stomp.subscribe(`/stomp/question`, this.routeToQuestion);
          this.stomp.subscribe(`/stomp/end`, this.routeToEnd);
          break;
        case ('player'):
          this.stomp.subscribe(`/stomp/player`, this.getTeams);
          this.stomp.subscribe(`/stomp/leader`, this.getLeader);
          this.stomp.subscribe(`/stomp/map`, this.routeToMap);
          break;
        case ('waiting-red'):
          this.stomp.subscribe(`/stomp/waiting-red`, this.routeToMap);
          break;
        case ('waiting-blue'):
          this.stomp.subscribe(`/stomp/waiting-blue`, this.routeToMap);
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
    this.stomp.send('/app/send/player', { 'player': player, 'team': team });
  }

  sendLeader(player: Player) {
    this.stomp.send('/app/send/leader', player);
  }

  sendQuestion(code) {
    this.stomp.send('/app/send/question', { 'code': code });
  }

  sendToMap() {
    this.stomp.send('/app/send/map', {});
  }

  sendToEnd() {
    this.stomp.send('/app/send/end', {});
  }

  public getLeader = (data) => {
      // const tmp: Player = new Player;
      // tmp.points = data.points;
      // tmp.name = data.name;
      // tmp.captain = data.captain;
      this.leaderSubject.next(data);
    }

  public getTeams = (data) => {
      const tmp = new Player;
      tmp.name = data.player;
      WebsocketService.teams[data.team].next(tmp);
  }

  public routeToQuestion = (data) => {
    console.log(data);
    this.router.navigateByUrl('/question');
  }

  public routeToMap = (data) => {
    console.log(data);
    this.router.navigateByUrl('/menu');
  }

  public routeToEnd = (data) => {
    console.log(data);
    this.router.navigateByUrl('/game-over');
  }

}
