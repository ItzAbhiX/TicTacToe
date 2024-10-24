import React, { useState, useRef } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/cross.png';

const Tictactoe = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleref = useRef(null);

  const toggle = (index) => {
    if (lock || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? "x" : "o";
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (currentBoard) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        won(currentBoard[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleref.current.innerHTML = `Congratulations: <img src=${winner === "x" ? cross_icon : circle_icon} /> wins`;
  };

  const reset = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setCount(0);
    setLock(false);
    titleref.current.innerHTML = 'Tic Tac Toe In <span>React</span>';
  };

  return (
    <div>
      <div className="container">
        <h1 className="title" ref={titleref}>Tic Tac Toe Game in <span>React</span></h1>
        <div className="board">
          {board.map((value, index) => (
            <div
              key={index}
              className="boxes"
              onClick={() => toggle(index)}
            >
              {value === "x" ? <img src={cross_icon} alt="cross" /> : value === "o" ? <img src={circle_icon} alt="circle" /> : null}
            </div>
          ))}
        </div>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default Tictactoe;
