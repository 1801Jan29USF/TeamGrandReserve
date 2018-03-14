import { Component,  OnInit } from '@angular/core';
import { WebsocketService } from './services/websocket.service';
import { Team } from './beans/team';
import { Subject } from 'rxjs/Subject';
import { Player } from './beans/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  yup: string;

  constructor() {
  }

  ngOnInit()  {
    WebsocketService.teams[0] = new Subject<Player>();
    WebsocketService.teams[1] = new Subject<Player>();
    // called after the constructor and called  after the first ngOnChanges()
    this.yup = 'yes';
  }

  change() {
    this.yup = 'no';
  }
}
