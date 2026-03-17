import React, { useEffect, useRef } from 'react';
import { create } from 'zustand';
import './Game.css';

const useGameStore = create((set) => ({
  userInput: '',
  targetText: '',
  timeLeft: 60,
  isRunning: false,
  wpm: 0,
  accuracy: 100,
  testCompleted: false,
  startTime: null,
  errors: 0,
  currentCharIndex: 0,
  sampleTexts: [
    "The quick brown fox jumps over the lazy dog",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task",
    "React is a JavaScript library for building user interfaces",
    "Frontend development involves creating the user interface of web applications",
    "CSS is used to style and layout web pages"
  ],
  setUserInput: (userInput) => set({ userInput }),
  setTargetText: (targetText) => set({ targetText }),
  setTimeLeft: (timeLeft) => set({ timeLeft }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setWpm: (wpm) => set({ wpm }),
  setAccuracy: (accuracy) => set({ accuracy }),
  setTestCompleted: (testCompleted) => set({ testCompleted }),
  setStartTime: (startTime) => set({ startTime }),
  setErrors: (errors) => set({ errors }),
  setCurrentCharIndex: (currentCharIndex) => set({ currentCharIndex }),
  resetStore: () => set({
    userInput: '',
    targetText: '',
    timeLeft: 60,
    isRunning: false,
    wpm: 0,
    accuracy: 100,
    testCompleted: false,
    startTime: null,
    errors: 0,
    currentCharIndex: 0
  })
}));

const Badges = () => {
  const { wpm, accuracy, errors } = useGameStore();
  
  return (
    <div className="achievements">
      <h2>Achievements</h2>
      <div className="badge-grid">
        <div className={`badge ${wpm >= 60 ? 'earned' : ''}`}>
          <span className="badge-icon">🚀</span>
          <span className="badge-name">Speed Demon</span>
          <span className="badge-desc">60+ WPM</span>
        </div>
        <div className={`badge ${accuracy >= 95 ? 'earned' : ''}`}>
          <span className="badge-icon">🎯</span>
          <span className="badge-name">Precision</span>
          <span className="badge-desc">95%+ Accuracy</span>
        </div>
        <div className={`badge ${errors === 0 ? 'earned' : ''}`}>
          <span className="badge-icon">💯</span>
          <span className="badge-name">Perfectionist</span>
          <span className="badge-desc">No Errors</span>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const { wpm, accuracy, errors, testCompleted } = useGameStore();
  
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-item">
        <span className="rank">1</span>
        <span className="player-name">You</span>
        <span className="player-stats">{wpm} WPM</span>
        <span className="player-stats">{accuracy}% Acc</span>
        <span className="player-stats">{errors} Errors</span>
      </div>
      <div className="leaderboard-item">
        <span className="rank">2</span>
        <span className="player-name">Player2</span>
        <span className="player-stats">52 WPM</span>
        <span className="player-stats">92% Acc</span>
        <span className="player-stats">3 Errors</span>
      </div>
      <div className="leaderboard-item">
        <span className="rank">3</span>
        <span className="player-name">Player3</span>
        <span className="player-stats">48 WPM</span>
        <span className="player-stats">89% Acc</span>
        <span className="player-stats">5 Errors</span>
      </div>
    </div>
  );
};

const Game = () => {
  const {
    userInput,
    targetText,
    timeLeft,
    isRunning,
    wpm,
    accuracy,
    testCompleted,
    startTime,
    errors,
    currentCharIndex,
    setUserInput,
    setTargetText,
    setTimeLeft,
    setIsRunning,
    setWpm,
    setAccuracy,
    setTestCompleted,
    setStartTime,
    setErrors,
    setCurrentCharIndex,
    resetStore,
    sampleTexts
  } = useGameStore();

  const inputRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setTestCompleted(true);
    }
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (!testCompleted && userInput.length > 0) {
      const correctChars = userInput.split('').filter((char, index) => char === targetText[index]).length;
      const accuracy = Math.round((correctChars / userInput.length) * 100);
      setAccuracy(accuracy);
      
      const wordsTyped = userInput.trim().split(/\s+/).length;
      const minutes = (60 - timeLeft) / 60;
      const calculatedWpm = Math.round(wordsTyped / minutes) || 0;
      setWpm(calculatedWpm);
    }
  }, [userInput, timeLeft, testCompleted, targetText]);

  const startTest = () => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setTargetText(randomText);
    setUserInput('');
    setTimeLeft(60);
    setIsRunning(true);
    setTestCompleted(false);
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setCurrentCharIndex(0);
    setStartTime(Date.now());
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handleInputChange = (e) => {
    if (!isRunning && !testCompleted) return;
    
    const value = e.target.value;
    setUserInput(value);
    
    // Calculate errors
    let errorCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (i < targetText.length && value[i] !== targetText[i]) {
        errorCount++;
      }
    }
    setErrors(errorCount);
    
    // Update current character index
    setCurrentCharIndex(value.length);
    
    // Check if test is completed
    if (value.length === targetText.length && value === targetText) {
      setIsRunning(false);
      setTestCompleted(true);
    }
  };

  const resetTest = () => {
    resetStore();
  };

  const getCharacterClass = (index) => {
    if (index < userInput.length) {
      return userInput[index] === targetText[index] ? 'correct' : 'incorrect';
    } else if (index === currentCharIndex) {
      return 'cursor';
    }
    return '';
  };

  return (
    <div className="game">
      <h1>Typing Speed Test</h1>
      <div className="stats">
        <div className="stat">Time: <span className={timeLeft <= 10 ? 'warning' : ''}>{timeLeft}s</span></div>
        <div className="stat">WPM: {wpm}</div>
        <div className="stat">Accuracy: {accuracy}%</div>
        <div className="stat">Errors: {errors}</div>
      </div>
      
      <div className="text-display">
        {targetText.split('').map((char, index) => (
          <span 
            key={index} 
            className={getCharacterClass(index)}
          >
            {char}
          </span>
        ))}
      </div>
      
      <textarea
        ref={inputRef}
        className="input-area"
        value={userInput}
        onChange={handleInputChange}
        placeholder={testCompleted ? "Test completed! Click 'New Test' to start again." : "Start typing here..."}
        disabled={!isRunning && !testCompleted}
      />
      
      <div className="controls">
        {testCompleted ? (
          <button onClick={startTest} className="btn">
            New Test
          </button>
        ) : (
          <button onClick={startTest} className="btn">
            Start Test
          </button>
        )}
      </div>
      
      <Badges />
      <Leaderboard />
    </div>
  );
};

export default Game;