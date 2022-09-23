import { Status } from './gamestatus';

export class Gamelogic {
  gamefield: Array<number> = [];

  currentTurn: number;

  gameStatus: Status;

  winSituationPlayerOne: Array<Array<number>> = [
    [1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 1, 0, 1, 0, 0],
  ];
  winSituationPlayerTwo: Array<Array<number>> = [
    [2, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 2],
    [2, 0, 0, 2, 0, 0, 2, 0, 0],
    [0, 2, 0, 0, 2, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 2],
    [2, 0, 0, 0, 2, 0, 0, 0, 2],
    [0, 0, 2, 0, 2, 0, 2, 0, 0],
  ];

  public constructor() {
    this.gameStatus = Status.STOP;
    this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = 1;
  }

  gameStart(): void {
    this.gamefield = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.currentTurn = this.randomPlayerStart();
    this.gameStatus = Status.START;
  }

  randomPlayerStart(): any {
    return Math.floor(Math.random() * 2) + 1;
  }

  setField(position: number, value: number): void {
    this.gamefield[position] = value;
  }

  getPlayerImage(): any {
    if (this.currentTurn === 1) return '../../assets/cross.svg';
    else return '../../assets/zero.svg';
  }

  changeCurrentTurn(): void {
    this.currentTurn = this.currentTurn === 1 ? 2 : 1;
  }

  arrayEquals(a: Array<any>, b: Array<any>): boolean {
    let isEqual = 0;
    if (a.length === b.length && Array.isArray(a) && Array.isArray(b)) {
      b.forEach((item, index) => {
        if (item === 0 && item !== a[index]) isEqual += 1;
      });
    }
    return isEqual > 0 ? false : true;
  }

  async checkGameWinner(): Promise<boolean> {
    let isWinner = false;
    const checkTheArray =
      this.currentTurn === 1
        ? this.winSituationPlayerOne
        : this.winSituationPlayerTwo;
    let currentArray: any[] = [];
    this.gamefield.forEach((el, index) => {
      if (el !== this.currentTurn) currentArray[index] = 0;
      else currentArray[index] = el;
    });

    checkTheArray.forEach((field) => {
      if (this.arrayEquals(field, currentArray)) {
        isWinner = true;
      }
    });

    if (isWinner) {
      this.gameEnd();
      return true;
    } else return false;
  }

  async checkGameIsOVer(): Promise<boolean> {
    let isFull = true;
    if (this.gamefield.includes(0)) isFull = false;

    if (isFull) {
      this.gameEnd();
      return true;
    } else return false;
  }

  gameEnd(): void {
    this.gameStatus = Status.STOP;
  }
}
