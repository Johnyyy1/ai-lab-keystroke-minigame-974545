export const saveGameProgress = (progress) => {
  try {
    localStorage.setItem('keystrokeMinigameProgress', JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save game progress:', error);
  }
};

export const loadGameProgress = () => {
  try {
    const progress = localStorage.getItem('keystrokeMinigameProgress');
    if (!progress) return null;
    return JSON.parse(progress);
  } catch (error) {
    console.error('Failed to load game progress:', error);
    return null;
  }
};

export const saveAchievements = (achievements) => {
  try {
    localStorage.setItem('keystrokeMinigameAchievements', JSON.stringify(achievements));
  } catch (error) {
    console.error('Failed to save achievements:', error);
  }
};

export const loadAchievements = () => {
  try {
    const achievements = localStorage.getItem('keystrokeMinigameAchievements');
    if (!achievements) return [];
    return JSON.parse(achievements);
  } catch (error) {
    console.error('Failed to load achievements:', error);
    return [];
  }
};

export const saveBestTime = (word, time) => {
  try {
    const bestTimes = loadBestTimes();
    bestTimes[word] = time;
    localStorage.setItem('keystrokeMinigameBestTimes', JSON.stringify(bestTimes));
  } catch (error) {
    console.error('Failed to save best time:', error);
  }
};

export const loadBestTimes = () => {
  try {
    const bestTimes = localStorage.getItem('keystrokeMinigameBestTimes');
    if (!bestTimes) return {};
    return JSON.parse(bestTimes);
  } catch (error) {
    console.error('Failed to load best times:', error);
    return {};
  }
};

export const saveSessionStats = (stats) => {
  try {
    localStorage.setItem('keystrokeMinigameSessionStats', JSON.stringify(stats));
  } catch (error) {
    console.error('Failed to save session stats:', error);
  }
};

export const loadSessionStats = () => {
  try {
    const stats = localStorage.getItem('keystrokeMinigameSessionStats');
    if (!stats) return { gamesPlayed: 0, totalTime: 0, bestTime: Infinity };
    return JSON.parse(stats);
  } catch (error) {
    console.error('Failed to load session stats:', error);
    return { gamesPlayed: 0, totalTime: 0, bestTime: Infinity };
  }
};