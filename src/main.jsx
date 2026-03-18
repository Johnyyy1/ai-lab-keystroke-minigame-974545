import React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game.jsx';
import Badges from './components/Badges.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import WordList from './components/WordList.jsx';
import './styles/main.css';

const container = document.getElementById('root');
const root = createRoot(container);

const App = () => {
  return (
    <div>
      <Game />
      <Badges />
      <Leaderboard />
      <WordList />
    </div>
  );
};

root.render(<App />);