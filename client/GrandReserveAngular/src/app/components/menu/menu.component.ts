import { Component, OnInit, Input, OnDestroy,} from '@angular/core';
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
    console.log(this.cookie.get('user'));
    if (this.answeringTeam == 0 && this.cookie.get('user') == `"${MenuComponent.redLeader}"`) {
      MenuComponent.wes.sendToQuestionRed(this.cellId);
    } else if (this.answeringTeam == 1 && this.cookie.get('user') == `"${MenuComponent.blueLeader}"`) {
      MenuComponent.wes.sendToQuestionBlue(this.cellId);
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
  static redLeader;
  static blueLeader;
  team;
  player;
  game: Game = new Game;
  decoded = decodeURIComponent(document.cookie).split('; ');
  isPlayer;
  constructor(private modalService: NgbModal, private client: HttpClient, public ws: WebsocketService, private cookie: CookieService) { }

  ngOnInit() {
    console.log('MENU COOKIE' + this.cookie.get('user'));

    MenuComponent.code = this.cookie.get('game-code').replace(/"/g, '');

    if (this.cookie.get('team') === '"0"') {
      document.getElementsByClassName('sidebar2')[0].classList.add('red');
    } else {
      document.getElementsByClassName('sidebar2')[0].classList.add('blue');
    }



    this.decoded.forEach(() => {
      if (this.cookie.get('user')) {
        this.isPlayer = true;
      } else if (this.cookie.get('instructor')) {
        this.isPlayer = false;
      }
    });
    if (this.isPlayer) {
      this.team = this.cookie.get('team').replace(/"/g, '');

    }
    MenuComponent.wes = this.ws;
    if (this.team == 0) {
      MenuComponent.wes.initializeWebSocketConnection('question-red');
    } else if (this.team == 1) {
      MenuComponent.wes.initializeWebSocketConnection('question-blue');
    } else {
      MenuComponent.wes.initializeWebSocketConnection('question-instructor');
    }
    console.log(document.cookie);
    this.startGame();
    this.ws.subject.subscribe((data) => {
      this.startGame();
    });
    console.log(this.isPlayer);
  }

  ngOnDestroy() {
    MenuComponent.wes.endConnection();
  }

  startGame() {
    this.client.get(`${environment.context}game/get/`.concat(MenuComponent.code)).subscribe(
      (succ: Game) => {
        console.log(succ);
        this.game = succ;
        console.log(this.game.teams[0].teamLeader);
        MenuComponent.redLeader = this.game.teams[0].teamLeader;
        MenuComponent.blueLeader = this.game.teams[1].teamLeader;
        this.addClass();
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
    if (this.game.map[i].color === 'red' || this.game.map[i].color === 'blue') {
      return;
    } else if (this.team.teamLeader !== this.player) {
      return;
    }
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.difficulty = this.game.map[i].difficulty;
    modalRef.componentInstance.subject = this.game.map[i].subject;
    modalRef.componentInstance.cellId = i;
    modalRef.componentInstance.answeringTeam = this.team;
  }

  addClass() {
    for (let index = 0; index < this.game.map.length; index++) {
      if (this.game.map[index].color === 'red') {
        document.getElementsByClassName('col')[index].classList.add('red');
        document.getElementsByClassName('col')[index].classList.remove('white');
      } else if (this.game.map[index].color === 'blue') {
        document.getElementsByClassName('col')[index].classList.add('blue');
        document.getElementsByClassName('col')[index].classList.remove('white');
      }

    }
  }

}
