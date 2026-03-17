import React from 'react';
import { createRoot } from 'react-dom/client';
import Game from './components/Game.jsx';
import Badges from './components/Badges.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import WordList from './components/WordList.jsx';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <div>
    <Game />
    <Badges />
    <Leaderboard />
    <WordList />
  </div>
);