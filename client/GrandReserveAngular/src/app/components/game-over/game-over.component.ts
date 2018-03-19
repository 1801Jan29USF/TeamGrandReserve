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
  winner;
  team0points: number = 0;
  team1points: number = 0;
  constructor(private client: HttpClient, private cookie: CookieService) { }

  ngOnInit() {
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.client.get(`${environment.context}game/get/`.concat(this.code)).subscribe(
      (succ: Game) => {
        this.game = succ;
        this.calculateWinner();
      },
      (err) => {
        console.log('failed');
      }
    );
  }

  calculateWinner(){
    for(let cell of this.game.map){
      if(cell.color === 'red'){
        this.team0points++;
      }
      else if(cell.color === 'blue'){
        this.team1points++;
      }
    }
    if(this.team0points > this.team1points){
      this.winner = 'Red team'
    }
    else if(this.team1points > this.team0points){
      this.winner = 'Blue team'
    }
    else{
      this.winner = 'No one'
    }
    console.log(this.team0points);
  }

}
