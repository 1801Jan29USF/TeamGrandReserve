import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {

  question = {
    text: 'MY NAME IS GUY FIERI AND THIS IS DINERS, DRIVE-INS, AND DIVES',
    option1: 'pls leave me alone guy fieri',
    option2: 'praise be to the frosted tips',
    option3: 'nah',
    option4: 'this option is incredibly long in order to see exactly what having an incredibly long option in this incredibly long question is going to be like kthxbai',
    correct: '2',
  };

  selected;
  constructor(private ws: WebsocketService) { }

  ngOnInit() {
    this.ws.initializeWebSocketConnection('question');
    this.selected = '-1';
    // loadQuestion()
    if (this.question.text === null) {

    }
  }

  ngOnDestroy() {
    this.ws.endConnection();
  }

  submitAnswer() {
    if (this.selected === this.question.correct) {
      alert('CORRECT');
      this.ngOnInit();
    }else {
      alert('INCORRECT');
      this.ngOnInit();
    }
  }
}
