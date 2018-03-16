import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {WebsocketService} from "../../services/websocket.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-waiting-lobby',
  templateUrl: './waiting-lobby.component.html',
  styleUrls: ['./waiting-lobby.component.css']
})
export class WaitingLobbyComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private cookie: CookieService, private ws: WebsocketService, private client: HttpClient) { }

  ngOnInit() {
    let team = this.cookie.getObject('team');
    if(team == '0'){
      this.ws.initializeWebSocketConnection('waiting-red');
    }
    else if(team == '1'){
      this.ws.initializeWebSocketConnection('waiting-blue');
    }
  }

  ngOnDestroy(){
    this.ws.endConnection();
  }

}
