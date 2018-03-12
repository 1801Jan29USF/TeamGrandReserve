import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import Stomp from 'stompjs';
import { StompService } from 'ng2-stomp-service';


@Injectable()
export class WebsocketService implements OnInit {


  private wsConf: any = {
    host: 'http://localhost:8080/server/socket'
  };
  private subscription: any;
  constructor(private stomp: StompService) {
  }
  ngOnInit() {
  }
  initializeWebSocketConnection() {

    this.stomp.configure(this.wsConf);

    this.stomp.startConnect().then(() => {
      console.log('connected');
      this.subscription = this.stomp.subscribe('/chat', this.response);
    });

  }

  sendMessage(message) {
    this.stomp.send('/app/send/message', {'message': message});
  }

  public response = (data) => {
    console.log(data);
  }

}
