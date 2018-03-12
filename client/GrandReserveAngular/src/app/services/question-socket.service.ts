// import { Injectable } from '@angular/core';
// import { Player } from '../beans/player';
// import { Subject } from 'rxjs/Rx';
// import { WebsocketService } from './websocket.service';
// import { environment } from '../../environments/environment';
// import { Question } from '../beans/question';

// @Injectable()
// export class QuestionSocketService {

//   public messages: Subject<Question>;

//   constructor(wsService: WebsocketService) {
//     this.messages = <Subject<Question>>wsService
//       .connect(`${environment.ws}topic`)
//       .map((response: MessageEvent): Question => {
//         return JSON.parse(response.data);

//       });
//   }
// }
