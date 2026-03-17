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
  const [gameState, setGameState] = useState({
    score: 0,
    level: 1,
    timeLeft: 60,
    isPlaying: false
  });

  const [badges, setBadges] = useState([
    { id: 1, name: 'First Win', earned: false },
    { id: 2, name: 'Speed Demon', earned: false },
    { id: 3, name: 'Word Master', earned: false }
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { name: 'Player1', score: 1000 },
    { name: 'Player2', score: 900 },
    { name: 'Player3', score: 800 }
  ]);

  const [words, setWords] = useState([
    'react',
    'javascript',
    'component',
    'state',
    'props'
  ]);

  return (
    <div>
      <Game 
        gameState={gameState}
        setGameState={setGameState}
      />
      <Badges 
        badges={badges}
        setBadges={setBadges}
      />
      <Leaderboard 
        leaderboard={leaderboard}
      />
      <WordList 
        words={words}
      />
    </div>
  );
};

root.render(<App />);