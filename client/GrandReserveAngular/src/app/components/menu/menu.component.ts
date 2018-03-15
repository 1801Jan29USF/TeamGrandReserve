import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../../beans/game';
import { Instructor } from '../../beans/instructor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { WebsocketService } from '../../services/websocket.service';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Are you sure?</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <p>Difficulty: {{difficulty}}</p>
    <p>Subject: {{subject}}</p>
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-outline-success" (click)="activeModal.close('Close click');
        sendQuestionToAll();
        this.cookie.putObject('cell', cellId);
        this.cookie.putObject('answering-team', answeringTeam)">
      Begin
    </button>
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContentComponent {
  @Input() difficulty;
  @Input() subject;
  @Input() cellId;
  @Input() answeringTeam;
  constructor(public activeModal: NgbActiveModal, public cookie: CookieService) { }

  sendQuestionToAll() {
    MenuComponent.ws.sendQuestion(this.answeringTeam);
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit, OnDestroy {
  static ws: WebsocketService;
  player;
  game: Game = new Game;
  code;
  decoded = decodeURIComponent(document.cookie).split('; ');
  isPlayer;
  team;
  constructor(private modalService: NgbModal, private client: HttpClient, public ws: WebsocketService, private cookie: CookieService) { }

  ngOnInit() {
    console.log('MENU COOKIE' + this.cookie.get('user'));
    this.code = this.cookie.get('game-code').replace(/"/g, '');
    this.team = this.cookie.get('team').replace(/"/g, '');
    console.log(this.team);
    this.decoded.forEach(() => {
      if (this.cookie.get('user')) {
        this.isPlayer = true;
      } else if (this.cookie.get('instructor')) {
        this.isPlayer = false;
      }
    });
    MenuComponent.ws = this.ws;

    MenuComponent.ws.initializeWebSocketConnection('question');
    console.log(document.cookie);
    this.startGame();
    console.log(this.isPlayer);
  }

  ngOnDestroy() {
    this.ws.endConnection();
  }

  startGame() {
    this.client.get(`${environment.context}game/get/`.concat(this.code)).subscribe(
      (succ: Game) => {
        this.game = succ;
      },
      (err) => {
        console.log('failed');
      }
    );
  }

  endGame() {
    this.ws.sendToEnd();
  }


  open(i) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.difficulty = this.game.map[i].difficulty;
    modalRef.componentInstance.subject = this.game.map[i].subject;
    modalRef.componentInstance.cellId = i;
    modalRef.componentInstance.answeringTeam = this.team;
  }

  addClass(i) {
    console.log(this.cookie.get('team'));
    if (this.cookie.get('team') == '"0"') {
      document.getElementsByClassName('col')[i].classList.add('red');
    } else if (this.cookie.get('team') == '"1"') {
      document.getElementsByClassName('col')[i].classList.add('blue');
    }

    document.getElementsByClassName('col')[i].classList.remove('white');
  }

}
