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
        rows="4"
      />
      
      <div className="controls">
        {!isRunning && !testCompleted && (
          <button onClick={startTest} className="start-btn">
            Start Test
          </button>
        )}
        {testCompleted && (
          <button onClick={startTest} className="new-test-btn">
            New Test
          </button>
        )}
        <button onClick={resetTest} className="reset-btn">
          Reset
        </button>
      </div>
      
      {testCompleted && (
        <div className="results">
          <h2>Test Results</h2>
          <p>Words Per Minute: {wpm}</p>
          <p>Accuracy: {accuracy}%</p>
          <p>Errors: {errors}</p>
        </div>
      )}
    </div>
  );
};

export default Game;