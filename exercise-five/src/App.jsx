import { useState } from 'react'; // Importing the useState hook from React
import './index.css'; // Importing the CSS for styling

// Square component: Represents each square on the board
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value} {/* Displays the value of the square ('X', 'O', or null) */}
    </button>
  );
}

// Board component: Represents the Tic-Tac-Toe board
function Board({ xIsNext, squares, onPlay }) {
  // handleClick function: Handles square clicks and updates the game state
  function handleClick(i) {
    // If there's a winner or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice(); // Create a copy of the squares array
    if (xIsNext) {
      nextSquares[i] = 'X'; // If it's X's turn, set the square to 'X'
    } else {
      nextSquares[i] = 'O'; // If it's O's turn, set the square to 'O'
    }
    onPlay(nextSquares); // Pass the updated squares array to the parent component
  }

  // Calculate the winner using the helper function
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner; // If there's a winner, display the winner
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); // Display the next player
  }

  return (
    <>
      <div className="status">{status}</div> {/* Display game status */}
      {/* Render each row of squares using the Square component */}
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game component: Manages the overall game state and controls
export default function Game() {
  // State for the game history and the current move
  const [history, setHistory] = useState([Array(9).fill(null)]); // Initial game state
  const [currentMove, setCurrentMove] = useState(0); // Keeps track of the current move
  const xIsNext = currentMove % 2 === 0; // Determine if it's X's turn
  const currentSquares = history[currentMove]; // Get the squares for the current move

  // handlePlay function: Updates the game history when a move is made
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // Create a new history array with the new move
    setHistory(nextHistory); // Update the history state
    setCurrentMove(nextHistory.length - 1); // Set the current move to the latest move
  }

  // jumpTo function: Allows jumping to a specific move in the history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove); // Set the current move to the selected move
  }

  // Generate a list of buttons for navigating through the history of moves
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move; // Description for moves after the start
    } else {
      description = 'Go to game start'; // Description for the initial game state
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Render the Board component with the current state */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* Render the list of moves */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// calculateWinner function: Determines if there is a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // Horizontal lines
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Vertical lines
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonal lines
    [2, 4, 6],
  ];

  // Check each winning combination
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // If all three squares are the same, return the winner ('X' or 'O')
    }
  }

  return null; // If no winner, return null
}

