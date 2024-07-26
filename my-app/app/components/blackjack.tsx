
"use client"
import { useEffect, useState, useRef } from 'react';
import useStore from '../card/store';
import { getCardImage } from '../card/qard'; 
import classes from '../style/blackjack.module.css';

const Blackjack = () => {
  const {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    gameOver,
    playerChips,
    currentBet,
    dealInitialCards,
    playerHit,
    dealerPlay,
    resetGame,
    placeBet,
    handleWin,
    handleLoss,
    handleDraw,
  } = useStore();

  const [gamePhase, setGamePhase] = useState('betting'); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const audioRef = useRef(null);

  useEffect(() => {
    dealInitialCards();
  }, [dealInitialCards]);

  useEffect(() => {
    if (gameOver) {
      if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)) {
        handleLoss();
      } else if (dealerScore > 21 || playerScore > dealerScore) {
        handleWin();
      } else {
        handleDraw();
      }
    }
  }, [gameOver, playerScore, dealerScore, handleWin, handleLoss, handleDraw]);

  const handlePlaceBet = (amount) => {
    placeBet(amount);
    setGamePhase('playing');
  };

  const handlePlayerHit = () => {
    playerHit();
  };

  const handleStand = () => {
    dealerPlay();
  };

  const handleReset = () => {
    resetGame();
    setGamePhase('betting'); 
    dealInitialCards();
  };

  const handleToggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={classes["container"]}>
      <h1>Blackjack</h1>
      <div className={classes['music']}>
      <audio ref={audioRef} src="/sound/Glenn Miller - In The Mood.mp3" loop />
      <button onClick={handleToggleMusic} className={classes["musicButton"]}>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
      </div>
      
      <div className={classes["mainSection"]}>
        <div className={classes["section"]}>
          <h2>Player ({playerScore})</h2>
          <div className={classes["hand"]}>
            {playerHand.map((card, index) => (
              <div key={index} className={classes["card"]}>
                {gamePhase === 'playing' || gameOver ? (
                  <img src={getCardImage(card)} alt={`${card.value} ${card.suit}`} className={classes["cardImage"]} />
                ) : (
                  <img src="/images/6363.png" alt="Card Back" className={classes["cardjoker"]} />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={classes["section"]}>
          <h2>Dealer ({dealerScore})</h2>
          <div className={classes["hand"]}>
            {dealerHand.map((card, index) => (
              <div key={index} className={classes["card"]}>
                {gamePhase === 'playing' || gameOver ? (
                  <img src={getCardImage(card)} alt={`${card.value} ${card.suit}`} className={classes["cardImage"]} />
                ) : (
                  <img src="/images/6363.png" alt="Card Back" className={classes["cardjoker"]} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={classes["actions"]}>
        <div className={classes["chips"]}>
          <h3>Bank: {playerChips}</h3>
          <h3>Bet: {currentBet}</h3>
          {gamePhase === 'betting' && (
            <div className={classes["buttonContainer"]}>
              <button onClick={() => handlePlaceBet(10)} className={classes["chipButton"]} data-amount="10">10</button>
              <button onClick={() => handlePlaceBet(20)} className={classes["chipButton"]} data-amount="20">20</button>
              <button onClick={() => handlePlaceBet(50)} className={classes["chipButton"]} data-amount="50">50</button>
              <button onClick={() => handlePlaceBet(80)} className={classes["chipButton"]} data-amount="80">80</button>
              <button onClick={() => handlePlaceBet(100)} className={classes["chipButton"]} data-amount="100">100</button>
              <button onClick={() => handlePlaceBet(200)} className={classes["chipButton"]} data-amount="200">200</button>
            </div>
          )}
        </div>
        {gameOver ? (
          <div>
            <h2>
              {playerScore > 21
                ? 'You lose!'
                : dealerScore > 21 || playerScore > dealerScore
                ? 'You win!'
                : dealerScore === playerScore
                ? 'Push!'
                : 'Dealer wins!'}
            </h2>
            <button onClick={handleReset} className={classes["button"]}>
              Play Again
            </button>
          </div>
        ) : (
          <div className={classes["buttonContainer"]}>
            {gamePhase === 'playing' && (
              <>
                <button onClick={handlePlayerHit} className={classes["largeButton"]}>
                  Hit
                </button>
                <button onClick={handleStand} className={classes["largeButton"]}>
                  Stand
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blackjack;
