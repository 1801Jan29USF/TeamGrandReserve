import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Game } from '../../beans/game';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { Question } from '../../beans/question';
import {CookieService} from 'angular2-cookie/core';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit {
  code: string;
  user: string;
  team: number;
  cell: number;
  questionSet: Array<Question>;
  question: Question;
  correct: number;
  selected: number;

  constructor(private ws: WebsocketService, private client: HttpClient, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
    this.correct = 0;
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.user = this.cookie.get('user').replace(/"/g, '');
    this.team = Number(this.cookie.get('team').replace(/"/g, ''));
    this.cell = Number(this.cookie.get('cell'));

    if (this.team === 0) {
      this.ws.initializeWebSocketConnection('waiting-red');
    }else if (this.team === 1) {
      this.ws.initializeWebSocketConnection('waiting-blue');
    }

    this.client.get(`${environment.context}game/get/`.concat(this.code)).subscribe(
      (succ: Game) => {
        this.questionSet = succ.map[this.cell].questionSet;
        console.log(this.questionSet);
        this.getRandomQuestion();
      },
      (err) => {
        console.log('failed');
      }
    );
  }

  submitAnswer() {
    console.log(Number(this.cookie.get('team').replace(/"/g, '')));
    console.log(parseInt(this.cookie.get('cell'), 10));
    if (this.selected == this.question.correct) {
      this.correct += 1;
      alert('CORRECT');
    } else {
      alert('INCORRECT');
    }
    if (this.questionSet.length === 5) {
      this.client.get(`${environment.context}game/update-cell/${this.code}/${this.team}/${this.user}/${this.cell}/${this.correct}`).subscribe(
        (succ: boolean) => {
          if (!succ) {
            this.router.navigateByUrl('/waiting-lobby');
          } else {
            // I can do an app/send here if necessary
            this.router.navigateByUrl('/menu');
          }
        },
        (err) => {
          console.log('failed');
        }
      );
    }
    this.getRandomQuestion();
    this.selected = -1;
  }

  getRandomQuestion() {
    const randIndex = Math.floor((Math.random() * this.questionSet.length));
    this.question = this.questionSet[randIndex];
    this.questionSet.splice(randIndex, 1);
  }
}
