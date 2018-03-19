import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Stomp from 'stompjs';
import { StompService } from 'ng2-stomp-service';
import { Router } from '@angular/router';
import { Team } from '../beans/team';
import { Subject } from 'rxjs/Subject';
import { Player } from '../beans/player';
import {CookieService} from "angular2-cookie/core";


@Injectable()
export class WebsocketService {

  public static teams: Array<Subject<Player>> = new Array(2);
  public static stomp;
  public subject: Subject<any> = new Subject;
  public leaderSubject: any = new Subject;
  private wsConf: any = {
    host: 'http://ec2-18-216-134-35.us-east-2.compute.amazonaws.com:8090/server/socket'
  };
  constructor(public stomp: StompService, private router: Router, private cookie: CookieService) {
  }

  initializeWebSocketConnection(channel: string) {

    this.stomp.configure(this.wsConf);

    this.stomp.startConnect().then(() => {
      console.log('connected');
      switch (channel) {
        case ('question-instructor'):
        this.stomp.subscribe(`/stomp/end`, this.routeToEnd);
          this.stomp.subscribe(`/stomp/waiting-red`, this.routeToMap);
          this.stomp.subscribe(`/stomp/waiting-blue`, this.routeToMap);
        break;
        case ('question-red'):
          this.stomp.subscribe(`/stomp/question-red`, this.routeToQuestion);
          this.stomp.subscribe(`/stomp/end`, this.routeToEnd);
          break;
        case ('question-blue'):
          this.stomp.subscribe(`/stomp/question-blue`, this.routeToQuestion);
          this.stomp.subscribe(`/stomp/end`, this.routeToEnd);
          break;
        case ('player'):
          this.stomp.subscribe(`/stomp/player`, this.getTeams);
          this.stomp.subscribe(`/stomp/leader`, this.getLeader);
          this.stomp.subscribe(`/stomp/map`, this.routeToMap);
          break;
        case ('waiting-red'):
          this.stomp.subscribe(`/stomp/waiting-red`, this.routeToMap);
          this.stomp.subscribe(`/stomp/end`, this.routeToEnd);
          break;
        case ('waiting-blue'):
          this.stomp.subscribe(`/stomp/waiting-blue`, this.routeToMap);
          this.stomp.subscribe(`/stomp/end`, this.routeToEnd);
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

  sendToMap(code) {
    this.stomp.send('/app/send/map', { 'code': code });
  }

  sendToMenuRed(code) {
    this.stomp.send('/app/send/waiting-red', { 'code': code });
  }

  sendToMenuBlue(code) {
    this.stomp.send('/app/send/waiting-blue', { 'code': code });
  }

  sendToQuestionRed(code) {
    this.stomp.send('/app/send/question-red', { 'code': code });
  }

  sendToQuestionBlue(code) {
    this.stomp.send('/app/send/question-blue', { 'code': code });
  }

  sendToEnd(code) {
    this.stomp.send('/app/send/end', { 'code': code });
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
    this.cookie.put('cell', data.code);
    this.router.navigateByUrl('/question');
  }

  public routeToMap = (data) => {
    console.log(data);
    this.subject.next(data);
    this.router.navigateByUrl('/menu');
  }

  public routeToEnd = (data) => {
    console.log(data);
    this.router.navigateByUrl('/game-over');
  }

}
