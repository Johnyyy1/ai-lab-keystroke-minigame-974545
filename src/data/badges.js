```javascript
export const BADGES = {
  FIRST_TIME: {
    id: 'FIRST_TIME',
    name: 'First Timer',
    description: 'Complete your first keystroke minigame',
    icon: '🎯',
    condition: (stats) => stats.totalGamesPlayed >= 1,
    category: 'completion'
  },
  QUICK_FINGERS: {
    id: 'QUICK_FINGERS',
    name: 'Quick Fingers',
    description: 'Complete a game in under 5 seconds',
    icon: '⚡',
    condition: (stats) => stats.bestTime < 5000,
    category: 'speed'
  },
  SPEED_DEMON: {
    id: 'SPEED_DEMON',
    name: 'Speed Demon',
    description: 'Complete a game in under 3 seconds',
    icon: '🚀',
    condition: (stats) => stats.bestTime < 3000,
    category: 'speed'
  },
  WORD_MASTER: {
    id: 'WORD_MASTER',
    name: 'Word Master',
    description: 'Complete 10 games successfully',
    icon: '🏆',
    condition: (stats) => stats.totalGamesPlayed >= 10,
    category: 'completion'
  },
  PERFECTIONIST: {
    id: 'PERFECTIONIST',
    name: 'Perfectionist',
    description: 'Complete a game with 0 mistakes',
    icon: '💎',
    condition: (stats) => stats.totalMistakes === 0,
    category: 'accuracy'
  },
  FAST_LEARNER: {
    id: 'FAST_LEARNER',
    name: 'Fast Learner',
    description: 'Improve your best time by 30% in 3 consecutive games',
    icon: '📈',
    condition: (stats) => stats.streak >= 3 && stats.timeImprovement >= 30,
    category: 'progress'
  },
  NIGHT_OWL: {
    id: 'NIGHT_OWL',
    name: 'Night Owl',
    description: 'Complete 5 games between 10 PM and 6 AM',
    icon: '🌙',
    condition: (stats) => stats.nightGames >= 5,
    category: 'time'
  },
  CONSISTENT: {
    id: 'CONSISTENT',
    name: 'Consistent',
    description: 'Play 7 days in a row',
    icon: '📅',
    condition: (stats) => stats.streak >= 7,
    category: 'consistency'
  },
  MULTITASKER: {
    id: 'MULTITASKER',
    name: 'Multitasker',
    description: 'Complete 5 games in a single session',
    icon: '🔄',
    condition: (stats) => stats.gamesInSession >= 5,
    category: 'completion'
  },
  SLOW_AND_STEADY: {
    id: 'SLOW_AND_STEADY',
    name: 'Slow and Steady',
    description: 'Complete a game in over 30 seconds',
    icon: '🐢',
    condition: (stats) => stats.bestTime > 30000,
    category: 'speed'
  }
};

export const ACHIEVEMENTS = {
  FIRST_WIN: {
    id: 'FIRST_WIN',
    name: 'First Win',
    description: 'Win your first game',
    icon: '🥇',
    condition: (stats) => stats.totalGamesWon >= 1,
    category: 'completion'
  },
  WINNER: {
    id: 'WINNER',
    name: 'Winner',
    description: 'Win 5 games',
    icon: '👑',
    condition: (stats) => stats.totalGamesWon >= 5,
    category: 'completion'
  },
  CHAMPION: {
    id: 'CHAMPION',
    name: 'Champion',
    description: 'Win 15 games',
    icon: '🏆',
    condition: (stats) => stats.totalGamesWon >= 15,
    category: 'completion'
  },
  SPEED_RUNNER: {
    id: 'SPEED_RUNNER',
    name: 'Speed Runner',
    description: 'Complete 10 games under 10 seconds',
    icon: '🏃',
    condition: (stats) => stats.fastGames >= 10,
    category: 'speed'
  },
  ACCURACY_ACE: {
    id: 'ACCURACY_ACE',
    name: 'Accuracy Ace',
    description: 'Complete 10 games with 95% accuracy or higher',
    icon: '🎯',
    condition: (stats) => stats.highAccuracyGames >= 10,
    category: 'accuracy'
  }
};

export const BADGE_CATEGORIES = {
  completion: {
    name: 'Completion',
    icon: '🏁',
    color: 'bg-blue-500'
  },
  speed: {
    name: 'Speed',
    icon: '⚡',
    color: 'bg-red-500'
  },
  accuracy: {
    name: 'Accuracy',
    icon: '🎯',
    color: 'bg-green-500'
  },
  consistency: {
    name: 'Consistency',
    icon: '🔁',
    color: 'bg-purple-500'
  },
  progress: {
    name: 'Progress',
    icon: '📈',
    color: 'bg-yellow-500'
  },
  time: {
    name: 'Time',
    icon: '⏰',
    color: 'bg-indigo-500'
  }
};

export const BADGE_UNLOCKED_EVENT = 'badge_unlocked';
export const ACHIEVEMENT_UNLOCKED_EVENT = 'achievement_unlocked';
```