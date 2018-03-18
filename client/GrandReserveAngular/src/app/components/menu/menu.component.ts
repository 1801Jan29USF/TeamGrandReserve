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
    if (MenuComponent.team == 0) {
      MenuComponent.wes.sendToQuestionRed(MenuComponent.code);
    } else if (MenuComponent.team == 1) {
      MenuComponent.wes.sendToQuestionBlue(MenuComponent.code);
    }
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit, OnDestroy {
  static wes: WebsocketService;
  static code;
  static team;
  player;
  game: Game = new Game;
  decoded = decodeURIComponent(document.cookie).split('; ');
  isPlayer;
  constructor(private modalService: NgbModal, private client: HttpClient, public ws: WebsocketService, private cookie: CookieService) { }

  ngOnInit() {
    console.log('MENU COOKIE' + this.cookie.get('user'));
    MenuComponent.code = this.cookie.get('game-code').replace(/"/g, '');
    console.log(MenuComponent.team);
    this.decoded.forEach(() => {
      if (this.cookie.get('user')) {
        this.isPlayer = true;
      } else if (this.cookie.get('instructor')) {
        this.isPlayer = false;
      }
    });
    if (this.isPlayer) {
      MenuComponent.team = this.cookie.get('team').replace(/"/g, '');
    }
    MenuComponent.wes = this.ws;
    if (MenuComponent.team == 0) {
      MenuComponent.wes.initializeWebSocketConnection('question-red');
    } else if (MenuComponent.team == 1) {
      MenuComponent.wes.initializeWebSocketConnection('question-blue');
    } else {
      MenuComponent.wes.initializeWebSocketConnection('question-instructor');
    }
    console.log(document.cookie);
    this.startGame();
    console.log(this.isPlayer);
  }

  ngOnDestroy() {
    MenuComponent.wes.endConnection();
  }

  startGame() {
    this.client.get(`${environment.context}game/get/`.concat(MenuComponent.code)).subscribe(
      (succ: Game) => {
        this.game = succ;
      },
      (err) => {
        console.log('failed');
      }
    );
  }

  endGame() {
    MenuComponent.wes.sendToEnd(MenuComponent.code);
  }


  open(i) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.difficulty = this.game.map[i].difficulty;
    modalRef.componentInstance.subject = this.game.map[i].subject;
    modalRef.componentInstance.cellId = i;
    modalRef.componentInstance.answeringTeam = MenuComponent.team;
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
