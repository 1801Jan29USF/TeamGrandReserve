import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Game } from '../../beans/game';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-login',
  templateUrl: './instructor-login.component.html',
  styleUrls: ['./instructor-login.component.css']
})
export class InstructorLoginComponent implements OnInit {
  game: Game = new Game;
  name: '';
  constructor(private cookie: CookieService, private client: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  startGame() {
    this.client.post(`${environment.context}game/create/`, this.name).subscribe(
      (succ: Game) => {
        this.game = succ;
        this.cookie.putObject('game-code', succ.code);
        this.cookie.putObject('instructor', succ.instructor);
        this.router.navigateByUrl('/pregame');
      },
      (err) => {
        console.log('failed');
      }
    );
  }
  show() {
    document.getElementById('alert').style.opacity = '1';
    document.getElementById('alert').style.animation = 'fadeIn 2s';
    document.getElementsByClassName('loading')[0].classList.add('loading1');
    document.getElementsByClassName('loading')[0].classList.remove('loading');

  }
}
