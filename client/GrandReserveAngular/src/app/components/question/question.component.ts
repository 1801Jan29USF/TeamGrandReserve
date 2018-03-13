import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  question = {
    text: 'MY NAME IS GUY FIERI AND THIS IS DINERS, DRIVE-INS, AND DIVES',
    option1: 'pls leave me alone guy fieri',
    option2: 'praise be to the frosted tips',
    option3: 'nah',
    option4: 'this option is incredibly long in order to see exactly what having an incredibly long option in this incredibly long question is going to be like kthxbai',
    correct: '2',
  };

  selected;
  constructor() { }

  ngOnInit() {
    this.selected = '-1';
    // loadQuestion()
    if (this.question.text === null) {

    }
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
