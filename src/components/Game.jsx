import React, { useState, useEffect } from 'react';
import './Game.css';

const Game = () => {
  const [userInput, setUserInput] = useState('');
  const [targetText, setTargetText] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [testCompleted, setTestCompleted] = useState(false);

  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog",
    "Programming is the process of creating a set of instructions that tell a computer how to perform a task",
    "React is a JavaScript library for building user interfaces",
    "Frontend development involves creating the user interface of web applications",
    "CSS is used to style and layout web pages"
  ];

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
  };

  const handleInputChange = (e) => {
    if (!isRunning && !testCompleted) return;
    setUserInput(e.target.value);
  };

  const resetTest = () => {
    setUserInput('');
    setTimeLeft(60);
    setIsRunning(false);
    setTestCompleted(false);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="game">
      <h1>Typing Speed Test</h1>
      <div className="stats">
        <div className="stat">Time: <span className={timeLeft <= 10 ? 'warning' : ''}>{timeLeft}s</span></div>
        <div className="stat">WPM: {wpm}</div>
        <div className="stat">Accuracy: {accuracy}%</div>
      </div>
      
      <div className="text-display">
        <p>{targetText}</p>
      </div>
      
      <textarea
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
        </div>
      )}
    </div>
  );
};

export default Game;