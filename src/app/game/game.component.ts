import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic],
})
export class GameComponent implements OnInit {
  constructor(public game: Gamelogic) {}

  ngOnInit(): void {}

  startGame(): void {
    this.game.gameStart();
    const currentPlayer = `Current turn: Player ${this.game.currentTurn}`;
    const turnInformation = document.querySelector('.current-turn');
    if (turnInformation !== null) turnInformation.innerHTML = currentPlayer;
  }

  async clickSubField(subfield: any): Promise<void> {
    if (this.game.gameStatus === 1) {
      const position = subfield.currentTarget.getAttribute('position');
      const turnInformation = document.querySelector('.current-turn');
      this.game.setField(position, this.game.currentTurn);
      const image = this.game.getPlayerImage();
      subfield.currentTarget.innerHTML = `<img src="${image}" class="item__img" alt=""  />`;
      this.game.changeCurrentTurn();

      await this.game.checkGameWinner().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          if (turnInformation !== null)
            turnInformation.innerHTML = `The winner is Player ${this.game.currentTurn}`;
        }
      });

      await this.game.checkGameIsOVer().then((end: boolean) => {
        if (this.game.gameStatus === 0 && end) {
          if (turnInformation !== null)
            turnInformation.innerHTML = 'No winner, draw';
        }
      });
      if (this.game.gameStatus === 1) {
        const currentPlayer = `Current turn: Player ${this.game.currentTurn}`;
        if (turnInformation !== null) turnInformation.innerHTML = currentPlayer;
      }
    }
  }
}
