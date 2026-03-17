export const BADGES = {
  FIRST_TIME: {
    id: 'FIRST_TIME',
    name: 'First Timer',
    description: 'Complete your first keystroke minigame',
    icon: '🎯',
    condition: (stats) => stats.totalGames > 0
  },
  QUICK_FINGERS: {
    id: 'QUICK_FINGERS',
    name: 'Quick Fingers',
    description: 'Complete a game in under 5 seconds',
    icon: '⚡',
    condition: (stats) => stats.bestTime < 5000
  },
  SPEED_DEMON: {
    id: 'SPEED_DEMON',
    name: 'Speed Demon',
    description: 'Complete 10 games under 10 seconds',
    icon: '🚀',
    condition: (stats) => stats.gamesUnder10s >= 10
  },
  PERFECTIONIST: {
    id: 'PERFECTIONIST',
    name: 'Perfectionist',
    description: 'Complete 5 games with 100% accuracy',
    icon: '💎',
    condition: (stats) => stats.gamesPerfect >= 5
  },
  NIGHT_OWL: {
    id: 'NIGHT_OWL',
    name: 'Night Owl',
    description: 'Complete 3 games between 10 PM and 6 AM',
    icon: '🌙',
    condition: (stats) => stats.nightGames >= 3
  },
  STREAK_MASTER: {
    id: 'STREAK_MASTER',
    name: 'Streak Master',
    description: 'Complete 7 consecutive games',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 7
  },
  WORD_HOARDER: {
    id: 'WORD_HOARDER',
    name: 'Word Hoarder',
    description: 'Complete 50 games',
    icon: '📚',
    condition: (stats) => stats.totalGames >= 50
  },
  MASTER_TYPER: {
    id: 'MASTER_TYPER',
    name: 'Master Typer',
    description: 'Achieve an average typing speed of 60 WPM or higher',
    icon: '🏆',
    condition: (stats) => stats.averageWPM >= 60
  }
};

export const ACHIEVEMENTS = {
  FAST_START: {
    id: 'FAST_START',
    name: 'Fast Start',
    description: 'Complete your first game in under 10 seconds',
    icon: '⏱️',
    condition: (game) => game.time < 10000 && game.isFirstGame
  },
  ACCURACY_ACE: {
    id: 'ACCURACY_ACE',
    name: 'Accuracy Ace',
    description: 'Complete a game with 100% accuracy',
    icon: '💯',
    condition: (game) => game.accuracy === 100
  },
  QUICK_WIN: {
    id: 'QUICK_WIN',
    name: 'Quick Win',
    description: 'Complete a game in under 3 seconds',
    icon: '💨',
    condition: (game) => game.time < 3000
  },
  SLOW_POKE: {
    id: 'SLOW_POKE',
    name: 'Slow Poke',
    description: 'Complete a game in over 30 seconds',
    icon: '🐢',
    condition: (game) => game.time > 30000
  },
  PERFECT_STREAK: {
    id: 'PERFECT_STREAK',
    name: 'Perfect Streak',
    description: 'Complete 3 games with 100% accuracy in a row',
    icon: '⭐',
    condition: (games) => {
      if (games.length < 3) return false;
      return games.slice(-3).every(game => game.accuracy === 100);
    }
  }
};

export const checkBadges = (stats) => {
  const unlockedBadges = [];
  
  Object.values(BADGES).forEach(badge => {
    if (badge.condition(stats) && !stats.unlockedBadges?.includes(badge.id)) {
      unlockedBadges.push(badge);
    }
  });
  
  return unlockedBadges;
};

export const checkAchievements = (game, games) => {
  const unlockedAchievements = [];
  
  Object.values(ACHIEVEMENTS).forEach(achievement => {
    if (achievement.condition(game, games) && !games.find(g => g.achievements?.includes(achievement.id))) {
      unlockedAchievements.push(achievement);
    }
  });
  
  return unlockedAchievements;
};

export const calculateStats = (games) => {
  if (!games || games.length === 0) {
    return {
      totalGames: 0,
      bestTime: Infinity,
      averageTime: 0,
      averageWPM: 0,
      gamesUnder10s: 0,
      gamesPerfect: 0,
      nightGames: 0,
      currentStreak: 0,
      bestStreak: 0,
      unlockedBadges: []
    };
  }

  const totalGames = games.length;
  const bestTime = Math.min(...games.map(g => g.time));
  const averageTime = games.reduce((sum, g) => sum + g.time, 0) / totalGames;
  const averageWPM = games.reduce((sum, g) => sum + g.wpm, 0) / totalGames;
  const gamesUnder10s = games.filter(g => g.time < 10000).length;
  const gamesPerfect = games.filter(g => g.accuracy === 100).length;
  
  const nightGames = games.filter(g => {
    const date = new Date(g.timestamp);
    const hour = date.getHours();
    return hour >= 22 || hour <= 6;
  }).length;

  // Calculate streaks
  let currentStreak = 0;
  let bestStreak = 0;
  let lastDate = null;
  
  games.forEach(g => {
    const date = new Date(g.timestamp);
    const day = date.toDateString();
    
    if (!lastDate || lastDate !== day) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
    lastDate = day;
  });

  return {
    totalGames,
    bestTime,
    averageTime,
    averageWPM,
    gamesUnder10s,
    gamesPerfect,
    nightGames,
    currentStreak,
    bestStreak,
    unlockedBadges: games.flatMap(g => g.unlockedBadges || [])
  };
};

export const formatTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes > 0) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${remainingSeconds}s`;
};

export const getBadgeIcon = (badgeId) => {
  const badge = Object.values(BADGES).find(b => b.id === badgeId);
  return badge ? badge.icon : '🏆';
};