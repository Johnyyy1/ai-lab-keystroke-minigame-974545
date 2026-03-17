# Keystroke Minigame

A React-based typing speed challenge game where players must complete words as quickly as possible to earn badges and achievements.

## Features

- Real-time typing speed tracking
- Word completion time measurement
- Badge system for performance milestones
- Achievement unlocking based on gameplay
- Responsive design for all devices
- Performance statistics and history tracking
- Local storage persistence for game data

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/keystroke-minigame.git
cd keystroke-minigame
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser to `http://localhost:3000`

## How to Play

1. Click "Start Game" to begin
2. Type the displayed word as quickly as possible
3. Press Enter or Space to submit your answer
4. Try to complete words in the least time possible
5. Earn badges and achievements for your performance

## Game Mechanics

- **Speed Tracking**: Real-time WPM (words per minute) calculation
- **Accuracy**: Mistake counting and penalty system
- **Time Limits**: Each word has a time constraint
- **Progression**: Words increase in difficulty as you advance

## Badges & Achievements

### Badges
- **First Steps**: Complete your first word
- **Speed Demon**: Complete a word in under 2 seconds
- **Accuracy Master**: 95%+ accuracy for 10 consecutive words
- **Quick Reflexes**: Complete 50 words in under 5 minutes
- **Word Warrior**: Complete 100 words total

### Achievements
- **Typing Rookie**: First 10 words completed
- **Typing Expert**: 100 words completed
- **Perfect Score**: 100% accuracy for 50 words
- **Speed Runner**: Average under 3 seconds per word
- **Consistency King**: 90%+ accuracy over 100 words

## Technical Details

### Components
- `App.js`: Main game container and state management
- `GameBoard.js`: Core gameplay interface
- `WordDisplay.js`: Current word display and input handling
- `StatsPanel.js`: Performance statistics and progress tracking
- `BadgesPanel.js`: Badge display and achievement tracking
- `HistoryPanel.js`: Previous game sessions and performance history

### State Management
- Current word and user input
- Game timer and performance metrics
- Badge and achievement progress
- Game session history

### State Management Library
This application uses **Zustand** for efficient state management:
- Global game state (current word, input, timer)
- Performance metrics and history tracking
- Badge and achievement progress
- Session management

### Persistence Layer
Game data is persisted using:
- **Local Storage**: Stores user progress, achievements, and history
- **Session Management**: Maintains game state between sessions
- **Data Migration**: Handles updates to game data structure

### Styling
- Responsive CSS grid layout
- Animated transitions for feedback
- Color-coded performance indicators
- Mobile-first responsive design

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from Create React App

### Folder Structure
```
src/
├── components/
│   ├── App.js
│   ├── GameBoard.js
│   ├── WordDisplay.js
│   ├── StatsPanel.js
│   ├── BadgesPanel.js
│   └── HistoryPanel.js
├── store/
│   └── useGameStore.js
├── assets/
│   └── words.js
├── styles/
│   └── App.css
└── index.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Author

Your Name

## Support

For issues and feature requests, please open an issue on the GitHub repository.