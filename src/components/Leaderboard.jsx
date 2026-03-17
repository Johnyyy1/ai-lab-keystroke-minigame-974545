import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching scores from localStorage or API
    const fetchScores = () => {
      try {
        const storedScores = localStorage.getItem('keystrokeScores');
        if (storedScores) {
          const parsedScores = JSON.parse(storedScores);
          setScores(parsedScores);
        } else {
          // Fetch from API or other data source instead of hardcoded mock data
          // This is a placeholder for actual data fetching logic
          fetch('/api/scores')
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(data => {
              setScores(data);
              localStorage.setItem('keystrokeScores', JSON.stringify(data));
            })
            .catch(error => {
              console.error('Failed to fetch scores:', error);
              // Fallback to mock data if API fails
              const mockScores = [
                { id: 1, name: 'Alex Johnson', time: 12.4, date: '2023-05-15', word: 'javascript' },
                { id: 2, name: 'Sam Smith', time: 14.2, date: '2023-05-14', word: 'react' },
                { id: 3, name: 'Taylor Brown', time: 15.7, date: '2023-05-13', word: 'component' },
                { id: 4, name: 'Jordan Lee', time: 16.3, date: '2023-05-12', word: 'function' },
                { id: 5, name: 'Casey Davis', time: 17.8, date: '2023-05-11', word: 'state' },
              ];
              setScores(mockScores);
              localStorage.setItem('keystrokeScores', JSON.stringify(mockScores));
            })
            .finally(() => setLoading(false));
          return;
        }
        setLoading(false);
      } catch (err) {
        console.error('Error parsing scores from localStorage:', err);
        setError('Failed to load scores. Please try again later.');
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  useEffect(() => {
    // Calculate user rank based on their best score
    try {
      const userScores = scores.filter(score => score.name === 'You');
      if (userScores.length > 0) {
        const bestScore = Math.min(...userScores.map(s => s.time));
        const rank = scores.filter(s => s.time < bestScore).length + 1;
        setUserRank(rank);
      }
    } catch (err) {
      console.error('Error calculating user rank:', err);
      setUserRank(null);
    }
  }, [scores]);

  const formatTime = (time) => {
    return time.toFixed(1) + 's';
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getAchievementBadge = (score) => {
    if (score.time <= 10) return '⚡';
    if (score.time <= 15) return '🎯';
    if (score.time <= 20) return '🔥';
    return '';
  };

  if (loading) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="loading">Loading scores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="leaderboard-content">
        {scores.length === 0 ? (
          <p className="no-scores">No scores yet. Be the first to play!</p>
        ) : (
          <div className="scores-list">
            {scores
              .sort((a, b) => a.time - b.time)
              .map((score, index) => (
                <div 
                  key={score.id} 
                  className={`score-item ${score.name === 'You' ? 'user-score' : ''}`}
                >
                  <div className="rank">
                    {getRankBadge(index + 1)}
                  </div>
                  <div className="score-details">
                    <div className="player-name">
                      {score.name}
                      {score.name === 'You' && <span className="you-badge">You</span>}
                    </div>
                    <div className="score-info">
                      <span className="time">{formatTime(score.time)}</span>
                      <span className="word">"{score.word}"</span>
                      <span className="achievement">{getAchievementBadge(score)}</span>
                    </div>
                    <div className="date">{new Date(score.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {userRank && (
          <div className="user-ranking">
            <p>Your rank: <strong>{userRank}</strong> out of {scores.length} players</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;