import React, {useEffect, useState} from 'react';
import {Board} from './Board'
import './App.css';
import {calculateWinner,getWinningLines} from './calulateWinner'
function App() {
  const [width, updateWidth] = useState(3);
  const [height, updateHeight] = useState(3);
  const [winningStreak, updateStreak] = useState(3);
  let [boardState, updateBoardState] = useState<(null | string)[]>([]);
  let [winningLines,updateWinningLines] = useState<number[][]>([]);
  let [clickCounter,incrementCounter] = useState(0);
  const [xIsNext, playerTurn] = useState(true);

  function handleSettingsChange() {
    updateBoardState(Array(height*width).fill(null))
    if(height > 0 && width >0){
      const array = [];
      for(let i=0; i < (height * width); i++){
        array.push(i);
      }
      const winningLines = getWinningLines({
        width,
        height,
        winningStreak
      });
     updateWinningLines(winningLines);
    }
  }

  function widthChange(e : React.ChangeEvent<HTMLInputElement>) {
    const width = Number.parseInt(e.target.value);
    updateWidth(width);
   handleSettingsChange();
  }

  function heightChange(e : React.ChangeEvent<HTMLInputElement>) {
    const height = Number.parseInt(e.target.value);
    updateHeight(height);
    handleSettingsChange();
  }

  function streakChange(e : React.ChangeEvent<HTMLInputElement>) {
    const streak = Number.parseInt(e.target.value);
    updateStreak(streak);
    handleSettingsChange();
  }

  function handleCellClick(i :number) {
    if (boardState[i]) return;
    const newBoardState = boardState.slice();
    newBoardState[i] = xIsNext ? 'X' : 'O';
       updateBoardState(newBoardState);
       playerTurn(!xIsNext);
       incrementCounter(clickCounter+1)
  }

  let winner =null;
  let inputWon :number[] = [];
  const boardLength  = width * height;
  winner = calculateWinner({ width, height, winningStreak, boardState });
  let status = winner ? 'Winner: ' + winner.winner : 'Next player: ' + (xIsNext ? 'X' : 'O') ;
  inputWon = winner ?  winner.winningLines : [];

  return (
      <div className="game">
        <input type={'text'} placeholder={'Height'} className={'inputProp'} onChange={heightChange} />
        <br/> <br/>
        <input type={'text'} placeholder={'Width'} className={'inputProp'} onChange={widthChange} />
        <br/> <br/>
        <input type={'text'} placeholder={'num'} className={'inputProp'} onChange={streakChange} />
        <div className="game-board">
          <Board
              squares={boardState}
              onClick={handleCellClick}
              width={width}
              height={height}
              userLines={inputWon}
          />
          {(winner || (boardLength <= clickCounter)) &&  (
              <button onClick={refreshPage}>Play Again</button>
          )}
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
  );
}
function refreshPage() {
  window.location.reload(false);
}
export default App;
