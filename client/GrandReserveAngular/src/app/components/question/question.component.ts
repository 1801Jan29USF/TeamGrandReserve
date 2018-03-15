import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Game } from '../../beans/game';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { Question } from '../../beans/question';
import {CookieService} from "angular2-cookie/core";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})

export class QuestionComponent implements OnInit, OnDestroy {
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
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.user = this.cookie.get('user').replace(/"/g, '');
    this.team = Number(this.cookie.get('team'));
    this.cell = Number(this.cookie.get('cell'));
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

  ngOnDestroy() {
    this.ws.endConnection();
  }

  submitAnswer() {
    console.log(this.question.correct);
    console.log(this.selected);
    if (this.selected == this.question.correct) {
      alert('CORRECT');
    } else {
      alert('INCORRECT');
    }
    if (this.questionSet.length === 5) {
      this.router.navigateByUrl('/menu');
    }
    this.getRandomQuestion();
    this.selected = -1;
  }

  getRandomQuestion() {
    let randIndex = Math.floor((Math.random() * this.questionSet.length));
    this.question = this.questionSet[randIndex];
    this.questionSet.splice(randIndex, 1);
  }
}
