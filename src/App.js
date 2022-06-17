
import React, {useState} from 'react';
import Board from './components/Board';
import ResetButton from './components/ResetButton';
import ScoreBoard from './components/ScoreBoard';

function App() {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

 const [board, setBoard] =useState(Array(9).fill(null));
 const [xPlaying, setXPlaying] =useState(true); 
 const [scores, setScores] =useState({xScore: 0, oScore: 0 });
 const [gameOver, setGameOver] =useState(false);

  //create a function to update the board
  const handleBoxClick = (boxIdx) => {

    const updatedBoard = board.map((value, idx) => {
          if(idx === boxIdx) {
            return xPlaying === true ? "X"  : "O"
         } else {
          return value
        }
    })
    setBoard(updatedBoard);
    
    //change active player
    setXPlaying(!xPlaying);
    
    const winner = checkWinner(updatedBoard);
    //check if either playerhas won the game
      
    if(winner) {
      if(winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore})
      } else{
        let { xScore } =scores;
        xScore += 1;
        setScores({...scores, xScore})
      }
  
    } 
   
  }
  
  const checkWinner= (board) => {
     for (let i = 0; i < WIN_CONDITIONS.length; i++) {
       const [x, y, z] = WIN_CONDITIONS[i];

       //Iterate through win conditions and check if either player satisfies them

       if(board[x] && board[x] === board[y] && board[y] === board[z]) {
         setGameOver(true)
         return board[x];
       }
     }
  }

   const resetBoard = () => {
     setGameOver(false)
     setBoard(Array(9).fill(null));
   }

  return (
  <div className="app">
    <ScoreBoard scores={scores} xPlaying={xPlaying} />
     <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton  resetBoard={resetBoard} />
   </div>
  );
}

export default App;
