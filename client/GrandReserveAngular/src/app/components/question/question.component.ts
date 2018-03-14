import { Component, OnInit } from '@angular/core';
import {Game} from "../../beans/game";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";
import {Question} from "../../beans/question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  decoded = decodeURIComponent(document.cookie).split('; ');
  code: string;
  user: string;
  team: number;
  cell: number;
  questionSet: Array<Question>;
  question : Question;
  correct: number;

  selected: number;
  constructor(private client: HttpClient, private router: Router) { }



  ngOnInit() {
    console.log(this.decoded);
    this.decoded.forEach((cookie) => {
      if(cookie.startsWith('user')){
        this.user = cookie.substr('user="'.length);
        this.user = this.user.slice(0, -1);
      }
      else if(cookie.startsWith('game-code')){
        this.code = cookie.substr('game-code="'.length);
        this.code = this.code.slice(0, -1);
      }
      else if(cookie.startsWith('team')){
        this.team = Number(cookie.substr('team="'.length).slice(0, -1));
      }
      else if(cookie.startsWith('cell')){
        this.cell = Number(cookie.substr('cell='.length));
      }
    });
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
    console.log(this.question.correct);
    console.log(this.selected);
    if (this.selected == this.question.correct) {
      alert('CORRECT');
    }else {
      alert('INCORRECT');
    }
    if(this.questionSet.length === 5){
      this.router.navigateByUrl("/menu")
    }
    this.getRandomQuestion();
    this.selected = -1;
  }

  getRandomQuestion() {
    let randIndex = Math.floor((Math.random()*this.questionSet.length));
    this.question = this.questionSet[randIndex];
    this.questionSet.splice(randIndex, 1);
  }
}
