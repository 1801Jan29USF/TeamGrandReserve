import { Component, OnInit } from '@angular/core';
import { Team } from '../../beans/team';
import { Game } from '../../beans/game';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {
  game: Game;
  code;
  constructor(private client: HttpClient, private cookie: CookieService) { }

  ngOnInit() {
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.client.get(`${environment.context}game/get/`.concat(this.code)).subscribe(
      (succ: Game) => {
        this.game = succ;
      },
      (err) => {
        console.log('failed');
      }
    );
  }

}
