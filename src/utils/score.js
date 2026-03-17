export const calculateTime = (startTime, endTime) => {
  return Math.round((endTime - startTime) / 1000);
};

export const calculateAccuracy = (typedText, originalText) => {
  if (originalText.length === 0) return 100;
  
  let correctChars = 0;
  const minLength = Math.min(typedText.length, originalText.length);
  
  for (let i = 0; i < minLength; i++) {
    if (typedText[i] === originalText[i]) {
      correctChars++;
    }
  }
  
  return Math.round((correctChars / originalText.length) * 100);
};

export const calculateScore = (time, accuracy, wordLength) => {
  // Base score is based on word length
  let baseScore = wordLength * 100;
  
  // Time bonus: faster completion = higher score
  const timeBonus = Math.max(0, 1000 - time * 10);
  
  // Accuracy bonus: higher accuracy = higher score
  const accuracyBonus = accuracy * 10;
  
  // Total score
  const totalScore = baseScore + timeBonus + accuracyBonus;
  
  return Math.round(totalScore);
};

export const getAchievement = (time, accuracy, wordLength, completedWords) => {
  const achievements = [];
  
  // Time-based achievements
  if (time <= 5) achievements.push('Lightning Fast');
  if (time <= 10) achievements.push('Quick Typist');
  if (time <= 20) achievements.push('Speed Demon');
  
  // Accuracy achievements
  if (accuracy >= 95) achievements.push('Perfectionist');
  if (accuracy >= 90) achievements.push('Precision');
  if (accuracy >= 80) achievements.push('Accurate');
  
  // Word length achievements
  if (wordLength >= 10) achievements.push('Long Word Master');
  if (wordLength >= 15) achievements.push('Word Warrior');
  
  // Completion achievements
  if (completedWords >= 10) achievements.push('Streak Master');
  if (completedWords >= 50) achievements.push('Typing Pro');
  if (completedWords >= 100) achievements.push('Keyboard King');
  
  // Bonus achievements
  if (time <= 3 && accuracy >= 95) achievements.push('Godlike Typist');
  if (completedWords >= 100 && accuracy >= 90) achievements.push('Typing Legend');
  
  return achievements;
};

export const getBadge = (time, accuracy, wordLength, completedWords) => {
  if (time <= 3 && accuracy >= 95) return '🏆 Master';
  if (time <= 10 && accuracy >= 90) return '⚡ Fast';
  if (accuracy >= 95) return '🎯 Perfect';
  if (completedWords >= 100) return '👑 Legend';
  if (completedWords >= 50) return '🏆 Pro';
  if (time <= 15) return '⏱️ Quick';
  if (accuracy >= 85) return '✅ Accurate';
  
  return '🏁 Beginner';
};

export const calculateStreak = (currentStreak, completedWords) => {
  if (completedWords > 0 && completedWords % 10 === 0) {
    return currentStreak + 1;
  }
  return currentStreak;
};

export const getDifficultyLevel = (time, accuracy) => {
  if (time <= 5 && accuracy >= 95) return 'Expert';
  if (time <= 10 && accuracy >= 90) return 'Advanced';
  if (time <= 15 && accuracy >= 85) return 'Intermediate';
  if (time <= 20 && accuracy >= 80) return 'Beginner';
  return 'Novice';
};