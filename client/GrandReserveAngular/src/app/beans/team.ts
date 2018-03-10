import { Player } from './player';

export class Team {
    players: Array<Player>;
    teamLeader: String;
    points: number;
    currentlySelected: number;

    constructor() {
      this.players = [];
      this.teamLeader = '';
      this.points = 0;
      this.currentlySelected = -1;
    }
}
