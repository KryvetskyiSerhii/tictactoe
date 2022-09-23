import { Status } from './gamestatus';

export class Gamelogic {
  gamefield: Array<number> = [];

  currentTurn: number;

  gameStatus: Status;

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = 1;
  }

  gameStart(): void {
    this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    console.log(this.currentTurn);

    this.gameStatus = Status.START;
  }

  randomPlayerStart(): any {
    return Math.floor(Math.random() * 2) + 1;
  }
}
