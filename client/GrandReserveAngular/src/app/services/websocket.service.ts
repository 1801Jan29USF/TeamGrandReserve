import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Stomp from 'stompjs';
import { StompService } from 'ng2-stomp-service';


@Injectable()
export class WebsocketService {


  private wsConf: any = {
    host: 'http://localhost:8080/server/socket'
  };
  private subscription: any;
  constructor(private stomp: StompService) {
  }
  private data: any;

  initializeWebSocketConnection(channel: string) {

    this.stomp.configure(this.wsConf);

    this.stomp.startConnect().then(() => {
      console.log('connected');
      this.subscription = this.stomp.subscribe(`/${channel}`, this.response);
    });

  }

  sendPLayer(player) {
    this.stomp.send('/app/send/player', {'player': player});
  }

  sendQuestion(player) {
    this.stomp.send('/app/send/question', {});
  }

  public response = (data) => {
    console.log(data);
    this.data = data;
  }

}
