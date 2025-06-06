import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  winner: string;
  isDraw: boolean;
  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame(){
    this.squares = new Array(9).fill(null);
    this.xIsNext = true;
    this.winner = null;
    this.isDraw = false;
  }

  get player(){
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx:number){
    if (this.squares[idx] || this.winner) {
      return;
    }
    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();

    if (!this.winner && this.squares.every(square => square !== null)) {
      this.isDraw = true;
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

}