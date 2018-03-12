// import { Injectable } from '@angular/core';
// import { Player } from '../beans/player';
// import { Subject } from 'rxjs/Rx';
// import { WebsocketService } from './websocket.service';
// import { environment } from '../../environments/environment';

// @Injectable()
// export class PlayerSocketService {

//   public messages: Subject<Player>;

//   constructor(wsService: WebsocketService) {
//     this.messages = <Subject<Player>>wsService
//       .connect(`${environment.ws}websocket/player`)
//       .map((response: MessageEvent): Player => {
//         return JSON.parse(response.data);

//       });
//   }
// }
