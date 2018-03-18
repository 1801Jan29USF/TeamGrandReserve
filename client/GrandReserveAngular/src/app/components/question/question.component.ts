import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { Game } from '../../beans/game';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';
import { Question } from '../../beans/question';
import { CookieService } from 'angular2-cookie/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngbd-modal-correct',
  template: `
  <div class="modal-header">
  <h4 class="modal-title">You chose {{selected}} which is:</h4>
  <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
<div class="modal-body">
  <p>{{answer}}</p>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">
    Close
  </button>

</div>
  `
})

export class NgbdModalCorrectComponent {
  @Input() selected;
  @Input() answer;
  constructor(public activeModal: NgbActiveModal) { }


}

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

  constructor(private modalService: NgbModal, private ws: WebsocketService, private client: HttpClient, private router: Router, private cookie: CookieService) { }

  ngOnInit() {
    this.correct = 0;
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.user = this.cookie.get('user').replace(/"/g, '');
    this.team = Number(this.cookie.get('team').replace(/"/g, ''));
    this.cell = Number(this.cookie.get('cell'));

    if (this.team === 0) {
      this.ws.initializeWebSocketConnection('waiting-red');
    } else if (this.team === 1) {
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
      this.open('Correct');
    } else {
      this.open('Incorrect');
    }
    if (this.questionSet.length === 5) {
      this.client.get(`${environment.context}game/update-cell/${this.code}/${this.team}/${this.user}/${this.cell}/${this.correct}`).subscribe(
        (succ: boolean) => {
          if (!succ) {
            this.router.navigateByUrl('/waiting-lobby');
          } else {
            // I can do an app/send here if necessary
            if (this.team == 0) {
              this.ws.sendToMenuRed(this.code);
            } else {
              this.ws.sendToMenuBlue(this.code);
            }
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

  open(message) {
    const modalRef = this.modalService.open(NgbdModalCorrectComponent);
    modalRef.componentInstance.selected = this.selected;
    modalRef.componentInstance.answer = message;
  }
}
