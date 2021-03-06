import { Cell } from './cell';
import { Instructor } from './instructor';
import { Team } from './team';

export class Game {
    map: Array<Cell>;
    instructor: Instructor;
    teams: Array<Team>;
    code: string;

    constructor() {
      this.map = [];
      this.instructor = new Instructor();
      this.teams = [];
      this.code = '';
    }
}
