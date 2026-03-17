import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game.jsx';
import Badges from './components/Badges.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import WordList from './components/WordList.jsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState('');
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  return (
    <div>
      <Game 
        words={words}
        setWords={setWords}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        score={score}
        setScore={setScore}
        gameActive={gameActive}
        setGameActive={setGameActive}
      />
      <Badges />
      <Leaderboard />
      <WordList 
        words={words}
        selectedWord={selectedWord}
        setSelectedWord={setSelectedWord}
        gameActive={gameActive}
      />
    </div>
  );
};

root.render(<App />);