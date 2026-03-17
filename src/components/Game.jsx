import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWords } from '../utils/wordList';
import { useAchievements } from '../hooks/useAchievements';
import { useBadges } from '../hooks/useBadges';

const Game = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameStatus, setGameStatus] = useState('waiting'); // waiting, playing, completed
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showBadge, setShowBadge] = useState(null);
  
  const inputRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { checkAchievements } = useAchievements();
  const { checkBadges } = useBadges();

  const words = getWords();

  useEffect(() => {
    if (gameStatus === 'playing' && isRunning) {
      timerRef.current = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          const minutes = Math.floor(newTime / 60);
          const seconds = newTime % 60;
          const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          
          // Calculate WPM (words per minute)
          const wordsTyped = userInput.trim().split(' ').length;
          const wpmValue = Math.round((wordsTyped / timeString.split(':')[0]) * 60);
          setWpm(wpmValue);
          
          // Calculate accuracy
          if (currentWord && userInput) {
            const correctChars = userInput.split('').filter((char, index) => 
              index < currentWord.length && char === currentWord[index]
            ).length;
            const accuracyValue = Math.round((correctChars / userInput.length) * 100);
            setAccuracy(accuracyValue);
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, gameStatus, userInput, currentWord]);

  useEffect(() => {
    if (gameStatus === 'playing' && userInput.length > 0) {
      if (userInput === currentWord) {
        handleWordComplete();
      } else if (userInput.length > currentWord.length) {
        // Prevent typing beyond word length
        setUserInput(currentWord);
      }
    }
  }, [userInput, currentWord, gameStatus]);

  useEffect(() => {
    if (gameStatus === 'waiting') {
      startNewGame();
    }
  }, [gameStatus]);

  useEffect(() => {
    if (inputRef.current && gameStatus === 'playing') {
      inputRef.current.focus();
    }
  }, [gameStatus, currentWord]);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setUserInput('');
    setTime(0);
    setGameStatus('playing');
    setIsRunning(true);
    setWpm(0);
    setAccuracy(100);
  };

  const handleWordComplete = () => {
    setIsRunning(false);
    setGameStatus('completed');
    
    // Update streak
    setStreak(prev => prev + 1);
    if (streak + 1 > bestStreak) {
      setBestStreak(streak + 1);
    }
    
    // Check achievements
    const newAchievements = checkAchievements(streak + 1, time);
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      setShowAchievement(newAchievements[0]);
      setTimeout(() => setShowAchievement(null), 3000);
    }
    
    // Check badges
    const newBadges = checkBadges(streak + 1, time);
    if (newBadges.length > 0) {
      setBadges(prev => [...prev, ...newBadges]);
      setShowBadge(newBadges[0]);
      setTimeout(() => setShowBadge(null), 3000);
    }
    
    // Auto-start next game after delay
    setTimeout(() => {
      startNewGame();
    }, 2000);
  };

  const handleInputChange = (e) => {
    if (gameStatus === 'playing') {
      setUserInput(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (gameStatus === 'waiting') {
        startNewGame();
      } else if (gameStatus === 'playing' && userInput === currentWord) {
        handleWordComplete();
      }
    }
  };

  const resetGame = () => {
    setGameStatus('waiting');
    setIsRunning(false);
    setUserInput('');
    setTime(0);
    setStreak(0);
    setBestStreak(0);
    setAchievements([]);
    setBadges([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Keystroke Minigame</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Time</span>
            <span className="stat-value">{formatTime(time)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">WPM</span>
            <span className="stat-value">{wpm}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Accuracy</span>
            <span className="stat-value">{accuracy}%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Streak</span>
            <span className="stat-value">{streak}</span>
          </div>
        </div>
      </div>

      <div className="game-content">
        {gameStatus === 'waiting' && (
          <div className="waiting-screen">
            <h2>Ready to play?</h2>
            <p>Press Enter or click Start to begin</p>
            <button onClick={startNewGame} className="start-button">
              Start Game
            </button>
          </div>
        )}

        {gameStatus === 'playing' && (
          <div className="playing-screen">
            <div className="word-display">
              <span className="target-word">{currentWord}</span>
              <span className="user-input">
                {userInput.split('').map((char, index) => (
                  <span 
                    key={index} 
                    className={index < userInput.length ? 
                      (char === currentWord[index] ? 'correct' : 'incorrect') : 
                      'current'
                    }
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="input-field"
              disabled={gameStatus !== 'playing'}
            />
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(userInput.length / currentWord.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {gameStatus === 'completed' && (
          <div className="completed-screen">
            <h2>Game Completed!</h2>
            <p>Final Score: {wpm} WPM</p>
            <p>Streak: {streak}</p>
          </div>
        )}
      </div>

      <div className="achievements-section">
        <h3>Achievements</h3>
        <div className="achievements-grid">
          {achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span className="achievement-icon">🏆</span>
                <span className="achievement-name">{achievement.name}</span>
              </div>
            ))
          ) : (
            <p>No achievements yet</p>
          )}
        </div>
      </div>

      <div className="badges-section">
        <h3>Badges</h3>
        <div className="badges-grid">
          {badges.length > 0 ? (
            badges.map((badge, index) => (
              <div key={index} className="badge-item">
                <span className="badge-icon">🏆</span>
                <span className="badge-name">{badge.name}</span>
              </div>
            ))
          ) : (
            <p>No badges yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;