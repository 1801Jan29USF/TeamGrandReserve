import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Game } from '../../beans/game';
import { Instructor } from '../../beans/instructor';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {WebsocketService} from "../../services/websocket.service";

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
    <button type="button" class="btn btn-outline-success" (click)="activeModal.close('Close click'); sendQuestionToAll();" >Begin</button>
      <button type="button" class="btn btn-outline-danger" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContentComponent {
  @Input() difficulty;
  @Input() subject;
  constructor(public activeModal: NgbActiveModal) { }

  sendQuestionToAll(code) {
    MenuComponent.ws.sendQuestion('anything');
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  player;
  game: Game = new Game;
  static ws: WebsocketService;
  decoded = decodeURIComponent(document.cookie);
  code = this.decoded.substr('game-code='.length + 1, 4);
  isPlayer = !this.decoded.indexOf('instructor=');
  if(isPlayer) {
    this.player = decodeURIComponent(document.cookie).substr('game-code=\'xxxx\';user='.length);
  }
  constructor(private modalService: NgbModal, private client: HttpClient, public ws: WebsocketService) { }

  ngOnInit() {
    MenuComponent.ws = this.ws;

    MenuComponent.ws.initializeWebSocketConnection('question');
    console.log(document.cookie);
    this.startGame();
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


  open(i) {
    const modalRef = this.modalService.open(NgbdModalContentComponent);
    modalRef.componentInstance.difficulty = this.game.map[i].difficulty;
    modalRef.componentInstance.subject = this.game.map[i].subject;
  }

}
