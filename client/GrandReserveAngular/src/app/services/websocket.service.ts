import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Stomp from 'stompjs';
import { StompService } from 'ng2-stomp-service';
import {Router} from "@angular/router";


@Injectable()
export class WebsocketService {


  private wsConf: any = {
    host: 'http://localhost:8080/server/socket'
  };
  private subscription: any;
  constructor(public stomp: StompService, private router: Router) {
  }
  private data: any;

  initializeWebSocketConnection(channel: string) {

    this.stomp.configure(this.wsConf);

    this.stomp.startConnect().then(() => {
      console.log('connected');
      this.subscription = this.stomp.subscribe(`/question`, this.routeToQuestion);
    });

  }


  sendPLayer(player) {
    this.stomp.send('/app/send/player', {'player': player});
  }

  sendQuestion(code) {
    this.stomp.send('/app/send/question', {'code': code});
  }

  public response = (data) => {
    console.log(data);
    this.data = data;
  }
  public routeToQuestion = (data) => {
    console.log(data);
    this.router.navigateByUrl('/question');
  }

}
