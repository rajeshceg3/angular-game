import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { SquareComponent } from '../square/square.component'; // Assuming path to SquareComponent

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent, SquareComponent ] // Declare both components
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('newGame()', () => {
    it('should reset squares to an array of 9 nulls', () => {
      component.newGame();
      expect(component.squares.length).toBe(9);
      expect(component.squares.every(square => square === null)).toBeTrue();
    });

    it('should set xIsNext to true', () => {
      component.newGame();
      expect(component.xIsNext).toBeTrue();
    });

    it('should set winner to null', () => {
      component.newGame();
      expect(component.winner).toBeNull();
    });

    it('should set isDraw to false', () => {
      component.newGame();
      expect(component.isDraw).toBeFalse();
    });
  });

  describe('Draw Condition', () => {
    beforeEach(() => {
      component.newGame();
    });

    it('should set isDraw to true and winner to null if all squares are filled and no winner', () => {
      component.squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      // Simulate the sequence of moves that would lead to this state for calculateWinner and isDraw to be set in makeMove
      component.xIsNext = true; // To make the last move 'O' if needed, though not strictly necessary for this direct state set

      // Manually trigger the logic similar to makeMove's end
      component.winner = component.calculateWinner();
      if (!component.winner && component.squares.every(s => s !== null)) {
        component.isDraw = true;
      }

      expect(component.isDraw).toBeTrue();
      expect(component.winner).toBeNull();
    });

    it('should correctly identify a draw after a sequence of moves', () => {
      component.makeMove(0); // X
      component.makeMove(1); // O
      component.makeMove(2); // X
      component.makeMove(3); // O
      component.makeMove(5); // X
      component.makeMove(4); // O
      component.makeMove(6); // X
      component.makeMove(8); // O
      component.makeMove(7); // X - Board is full, should be a draw

      expect(component.winner).toBeNull();
      expect(component.isDraw).toBeTrue();
    });

    it('should not declare a draw if there is a winner', () => {
      // Setup a winning board
      component.squares = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      component.winner = component.calculateWinner(); // Winner is X
      // Check if isDraw would be set (it shouldn't)
      if (!component.winner && component.squares.every(s => s !== null)) {
        component.isDraw = true; // This line should ideally not be reached in makeMove
      } else if (!component.winner) {
         component.isDraw = false; // Or remains false
      }

      // In the actual makeMove, if a winner is found, isDraw check is conditional
      // Here we explicitly test the properties
      expect(component.winner).toBe('X');
      // If we called newGame, isDraw would be false.
      // If we then made moves to make X win on a full board (not possible in standard tic-tac-toe),
      // winner would be X and isDraw would be false.
      // Let's simulate a scenario where makeMove is called:
      component.newGame();
      component.makeMove(0); // X
      component.makeMove(3); // O
      component.makeMove(1); // X
      component.makeMove(4); // O
      component.makeMove(2); // X wins
      // isDraw should remain false because a winner was found
      expect(component.isDraw).toBeFalse();
      expect(component.winner).toBe('X');
    });
  });

  describe('calculateWinner() and Winning Condition', () => {
    beforeEach(() => {
      component.newGame();
    });

    const winningScenarios = [
      { squares: ['X', 'X', 'X', null, null, null, null, null, null], winner: 'X', description: 'X wins on top row' },
      { squares: [null, null, null, 'O', 'O', 'O', null, null, null], winner: 'O', description: 'O wins on middle row' },
      { squares: [null, null, null, null, null, null, 'X', 'X', 'X'], winner: 'X', description: 'X wins on bottom row' },
      { squares: ['O', null, null, 'O', null, null, 'O', null, null], winner: 'O', description: 'O wins on first column' },
      { squares: [null, 'X', null, null, 'X', null, null, 'X', null], winner: 'X', description: 'X wins on second column' },
      { squares: [null, null, 'O', null, null, 'O', null, null, 'O'], winner: 'O', description: 'O wins on third column' },
      { squares: ['X', null, null, null, 'X', null, null, null, 'X'], winner: 'X', description: 'X wins on diagonal (top-left to bottom-right)' },
      { squares: [null, null, 'O', null, 'O', null, 'O', null, null], winner: 'O', description: 'O wins on diagonal (top-right to bottom-left)' },
    ];

    winningScenarios.forEach(scenario => {
      it(`should declare ${scenario.winner} as winner for: ${scenario.description}`, () => {
        component.squares = scenario.squares;
        component.winner = component.calculateWinner(); // Explicitly call calculateWinner for this test
        expect(component.winner).toBe(scenario.winner);
      });
    });

    it('should set winner to null if no winning condition is met', () => {
      component.squares = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O']; // No winner, but not a draw yet for this specific test
      component.winner = component.calculateWinner();
      expect(component.winner).toBeNull();
    });

    it('should update the winner property after a winning move', () => {
      // X takes 0, 1
      component.makeMove(0); // X
      component.makeMove(3); // O
      component.makeMove(1); // X
      component.makeMove(4); // O
      // X makes winning move at 2
      component.makeMove(2); // X wins
      expect(component.winner).toBe('X');
    });
  });

  describe('makeMove()', () => {
    beforeEach(() => {
      component.newGame(); // Ensure a fresh game state for each test
    });

    it('should update squares and toggle xIsNext on a valid move', () => {
      component.makeMove(0);
      expect(component.squares[0]).toBe('X');
      expect(component.xIsNext).toBeFalse();

      component.makeMove(1);
      expect(component.squares[1]).toBe('O');
      expect(component.xIsNext).toBeTrue();
    });

    it('should not change squares or xIsNext if square is already filled', () => {
      component.squares[0] = 'X';
      component.xIsNext = false; // Pretend 'X' just moved

      component.makeMove(0); // Try to move on the same square

      expect(component.squares[0]).toBe('X'); // Should remain 'X'
      expect(component.xIsNext).toBeFalse(); // Should not toggle
    });

    it('should not change squares or xIsNext if there is a winner', () => {
      component.winner = 'X'; // Pretend 'X' has won
      const initialSquares = [...component.squares];
      const initialXIsNext = component.xIsNext;

      component.makeMove(0); // Try to make a move

      expect(component.squares).toEqual(initialSquares);
      expect(component.xIsNext).toBe(initialXIsNext);
    });
  });

  describe('Player Display (get player)', () => {
    it("should return 'X' when xIsNext is true", () => {
      component.xIsNext = true;
      expect(component.player).toBe('X');
    });

    it("should return 'O' when xIsNext is false", () => {
      component.xIsNext = false;
      expect(component.player).toBe('O');
    });
  });

});
