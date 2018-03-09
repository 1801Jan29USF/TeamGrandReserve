import { Question } from './question';

export class Cell {

    cid: number;
    value: number;
    color: string;
    difficulty: number;
    subject: string;
    questionSet: Array<Question>;

    constructor() {

    }
}
