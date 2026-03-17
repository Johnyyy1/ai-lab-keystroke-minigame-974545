export const ACHIEVEMENTS = [
  {
    id: 'first-word',
    title: 'First Word',
    description: 'Complete your first word',
    icon: '🎯',
    unlockCondition: {
      type: 'wordCount',
      value: 1
    },
    category: 'progress'
  },
  {
    id: 'speed-learner',
    title: 'Speed Learner',
    description: 'Complete 10 words under 5 seconds',
    icon: '⚡',
    unlockCondition: {
      type: 'time',
      value: 5,
      count: 10
    },
    category: 'speed'
  },
  {
    id: 'word-master',
    title: 'Word Master',
    description: 'Complete 50 words',
    icon: '🏆',
    unlockCondition: {
      type: 'wordCount',
      value: 50
    },
    category: 'progress'
  },
  {
    id: 'quick-fingers',
    title: 'Quick Fingers',
    description: 'Complete 20 words under 3 seconds',
    icon: '💨',
    unlockCondition: {
      type: 'time',
      value: 3,
      count: 20
    },
    category: 'speed'
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Complete 5 words with 0 mistakes',
    icon: '💯',
    unlockCondition: {
      type: 'accuracy',
      value: 100,
      count: 5
    },
    category: 'accuracy'
  },
  {
    id: 'consistent-player',
    title: 'Consistent Player',
    description: 'Play for 7 consecutive days',
    icon: '📅',
    unlockCondition: {
      type: 'streak',
      value: 7
    },
    category: 'consistency'
  },
  {
    id: 'fast-typist',
    title: 'Fast Typist',
    description: 'Average word completion time under 4 seconds',
    icon: '🚀',
    unlockCondition: {
      type: 'averageTime',
      value: 4
    },
    category: 'speed'
  },
  {
    id: 'accuracy-king',
    title: 'Accuracy King',
    description: 'Achieve 95% accuracy across 20 words',
    icon: '👑',
    unlockCondition: {
      type: 'accuracy',
      value: 95,
      count: 20
    },
    category: 'accuracy'
  },
  {
    id: 'multiplier-master',
    title: 'Multiplier Master',
    description: 'Reach a 5x streak multiplier',
    icon: '🔥',
    unlockCondition: {
      type: 'streakMultiplier',
      value: 5
    },
    category: 'progress'
  },
  {
    id: 'word-geek',
    title: 'Word Geek',
    description: 'Complete 100 words',
    icon: '📚',
    unlockCondition: {
      type: 'wordCount',
      value: 100
    },
    category: 'progress'
  }
];

export const ACHIEVEMENT_CATEGORIES = [
  { id: 'progress', name: 'Progress', icon: '📈' },
  { id: 'speed', name: 'Speed', icon: '⚡' },
  { id: 'accuracy', name: 'Accuracy', icon: '🎯' },
  { id: 'consistency', name: 'Consistency', icon: '📅' }
];