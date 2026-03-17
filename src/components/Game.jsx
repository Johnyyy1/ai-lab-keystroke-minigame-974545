import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  const checkWinner = (squares) => {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      setScores(prev => ({
        ...prev,
        [newWinner]: prev[newWinner] + 1
      }));
    } else if (newBoard.every(square => square !== null)) {
      setWinner('draw');
      setScores(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, draws: 0 });
    resetGame();
  };

  const renderSquare = (index) => {
    return (
      <button
        className={`square ${board[index] ? 'filled' : ''}`}
        onClick={() => handleClick(index)}
        disabled={!!board[index] || !!winner}
      >
        {board[index]}
      </button>
    );
  };

  const getStatusMessage = () => {
    if (winner === 'draw') return "It's a draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">{getStatusMessage()}</div>
      <div className="board">
        {Array(3).fill(null).map((_, row) => (
          <div key={row} className="board-row">
            {Array(3).fill(null).map((_, col) => (
              <div key={col}>
                {renderSquare(row * 3 + col)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="controls">
        <button onClick={resetGame} className="reset-btn">
          New Game
        </button>
        <button onClick={resetScores} className="reset-scores-btn">
          Reset Scores
        </button>
      </div>
      <div className="scores">
        <div>X: {scores.X}</div>
        <div>O: {scores.O}</div>
        <div>Draws: {scores.draws}</div>
      </div>
    </div>
  );
};

export default Game;