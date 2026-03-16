```javascript
import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

const WORDS = [
  'hello', 'world', 'react', 'javascript', 'computer', 'keyboard',
  'programming', 'development', 'application', 'interface', 'component',
  'function', 'variable', 'array', 'object', 'string', 'number',
  'boolean', 'null', 'undefined', 'loop', 'condition', 'algorithm'
];

const ACHIEVEMENTS = {
  FIRST_TRY: { id: 'first_try', name: 'First Try', description: 'Complete a word on first attempt', unlocked: false },
  QUICK_FINGERS: { id: 'quick_fingers', name: 'Quick Fingers', description: 'Complete a word in under 3 seconds', unlocked: false },
  SPEED_RUNNER: { id: 'speed_runner', name: 'Speed Runner', description: 'Complete 5 words in under 5 seconds', unlocked: false },
  PERFECTIONIST: { id: 'perfectionist', name: 'Perfectionist', description: 'Complete 3 words without any mistakes', unlocked: false }
};

const BADGES = {
  BEGINNER: { id: 'beginner', name: 'Beginner', description: 'Complete 10 words', unlocked: false },
  INTERMEDIATE: { id: 'intermediate', name: 'Intermediate', description: 'Complete 50 words', unlocked: false },
  EXPERT: { id: 'expert', name: 'Expert', description: 'Complete 100 words', unlocked: false },
  MASTER: { id: 'master', name: 'Master', description: 'Complete 200 words', unlocked: false }
};

const App = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [achievements, setAchievements] = useState(ACHIEVEMENTS);
  const [badges, setBadges] = useState(BADGES);
  const [showAchievement, setShowAchievement] = useState(null);
  const [showBadge, setShowBadge] = useState(null);

  const generateRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }, []);

  const startGame = useCallback(() => {
    const word = generateRandomWord();
    setCurrentWord(word);
    setUserInput('');
    setStartTime(Date.now());
    setIsGameActive(true);
    setIsCompleted(false);
    setGameTime(0);
  }, [generateRandomWord]);

  const handleInputChange = (e) => {
    if (!isGameActive) return;
    
    const value = e.target.value;
    setUserInput(value);
    
    if (value === currentWord) {
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000;
      
      setGameTime(timeTaken);
      setIsGameActive(false);
      setIsCompleted(true);
      
      // Update score and stats
      const newScore = score + Math.max(0, 1000 - Math.floor(timeTaken * 100));
      const newWordsCompleted = wordsCompleted + 1;
      setScore(newScore);
      setWordsCompleted(newWordsCompleted);
      
      // Check achievements
      checkAchievements(timeTaken);
      
      // Check badges
      checkBadges(newWordsCompleted);
    }
  };

  const checkAchievements = (timeTaken) => {
    const newAchievements = { ...achievements };
    let unlocked = false;
    
    if (!newAchievements.FIRST_TRY.unlocked) {
      newAchievements.FIRST_TRY.unlocked = true;
      unlocked = true;
    }
    
    if (timeTaken < 3 && !newAchievements.QUICK_FINGERS.unlocked) {
      newAchievements.QUICK_FINGERS.unlocked = true;
      unlocked = true;
    }
    
    if (newAchievements.SPEED_RUNNER.unlocked) {
      // This would be tracked in a more complex system
    }
    
    if (newAchievements.PERFECTIONIST.unlocked) {
      // This would be tracked in a more complex system
    }
    
    if (unlocked) {
      setAchievements(newAchievements);
      setShowAchievement(Object.values(newAchievements).find(a => a.unlocked && !a.displayed));
    }
  };

  const checkBadges = (newWordsCompleted) => {
    const newBadges = { ...badges };
    let unlocked = false;
    
    if (newWordsCompleted >= 10 && !newBadges.BEGINNER.unlocked) {
      newBadges.BEGINNER.unlocked = true;
      unlocked = true;
    }
    
    if (newWordsCompleted >= 50 && !newBadges.INTERMEDIATE.unlocked) {
      newBadges.INTERMEDIATE.unlocked = true;
      unlocked = true;
    }
    
    if (newWordsCompleted >= 100 && !newBadges.EXPERT.unlocked) {
      newBadges.EXPERT.unlocked = true;
      unlocked = true;
    }
    
    if (newWordsCompleted >= 200 && !newBadges.MASTER.unlocked) {
      newBadges.MASTER.unlocked = true;
      unlocked = true;
    }
    
    if (unlocked) {
      setBadges(newBadges);
      setShowBadge(Object.values(newBadges).find(b => b.unlocked && !b.displayed));
    }
  };

  const resetGame = () => {
    startGame();
  };

  useEffect(() => {
    let interval;
    if (isGameActive) {
      interval = setInterval(() => {
        setGameTime(prev => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isGameActive]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  const formatTime = (time) => {
    return time.toFixed(1);
  };

  return (
    <div className="app">
      <div className="game-container">
        <h1>Keystroke Minigame</h1>
        
        <div className="stats">
          <div className="stat">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Score</span>
          </div>
          <div className="stat">
            <span className="stat-value">{wordsCompleted}</span>
            <span className="stat-label">Words</span>
          </div>
          <div className="stat">
            <span className="stat-value">{formatTime(gameTime)}s</span>
            <span className="stat-label">Time</span>
          </div>
        </div>

        <div className="word-display">
          <div className="word">
            {currentWord.split('').map((char, index) => (
              <span 
                key={index} 
                className={index < userInput.length ? 
                  (userInput[index] === char ? 'correct' : 'incorrect') : 
                  'untyped'
                }
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        <div className="input-container">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={!isGameActive}
            placeholder="Type the word..."
            className="word-input"
          />
        </div>

        {isCompleted && (
          <div className="completion-screen">
            <h2>Completed!</h2>
            <p>Time: {formatTime(gameTime)} seconds</p>
            <p>Score: {Math.max(0, 1000 - Math.floor(gameTime * 100))}</p>
            <button onClick={resetGame} className="reset-button">
              Next Word
            </button>
          </div>
        )}

        <div className="achievements-section">
          <h3>Achievements</h3>
          <div className="achievements-grid">
            {Object.values(achievements).map(achievement => (
              <div 
                key={achievement.id} 
                className={`achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {achievement.unlocked ? '🏆' : '🔒'}
                </div>
                <div className="achievement-info">
                  <h4>{achievement.name}</h4>
                  <p>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="badges-section">
          <h3>Badges</h3>
          <div className="badges-grid">
            {Object.values(badges).map(badge => (
              <div 
                key={badge.id} 
                className={`badge ${badge.unlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="badge-icon">
                  {badge.unlocked ? '⭐' : '🔒'}
                </div>
                <div className="badge-info">
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showAchievement && (
          <div className="achievement-popup">
            <div className="achievement-popup-content">
              <h3>Achievement Unlocked!</h3>
              <p>{showAchievement.name}</p>
              <p>{showAchievement.description}</p>
              <button onClick={() => setShowAchievement(null)}>Close</button>
            </div>
          </div>
        )}

        {showBadge && (
          <div className="badge-popup">
            <div className="badge-popup-content">
              <h3>Badge Unlocked!</h3>
              <p>{showBadge.name}</p>
              <p>{showBadge.description}</p>
              <button onClick={() => setShowBadge(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
```