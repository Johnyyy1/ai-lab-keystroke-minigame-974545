import React from 'react';
import '../styles/Badges.css';

const Badges = ({ badges, achievements }) => {
  const badgeTypes = {
    'first-word': { 
      name: 'First Word', 
      description: 'Complete your first word', 
      icon: '🎯' 
    },
    'speed-king': { 
      name: 'Speed King', 
      description: 'Complete a word in under 5 seconds', 
      icon: '👑' 
    },
    'accuracy-master': { 
      name: 'Accuracy Master', 
      description: 'Complete 10 words with 100% accuracy', 
      icon: '🏆' 
    },
    'quick-fingers': { 
      name: 'Quick Fingers', 
      description: 'Complete 5 words in under 10 seconds', 
      icon: '⚡' 
    },
    'word-ninja': { 
      name: 'Word Ninja', 
      description: 'Complete 20 words', 
      icon: '🥷' 
    },
    'perfect-score': { 
      name: 'Perfect Score', 
      description: 'Complete a word with no mistakes', 
      icon: '💯' 
    }
  };

  const achievementTypes = {
    'first-achievement': { 
      name: 'First Achievement', 
      description: 'Earn your first achievement', 
      icon: '⭐' 
    },
    'badge-collector': { 
      name: 'Badge Collector', 
      description: 'Earn 5 badges', 
      icon: '🏅' 
    },
    'speed-demon': { 
      name: 'Speed Demon', 
      description: 'Complete 10 words under 8 seconds', 
      icon: '🚀' 
    },
    'consistency': { 
      name: 'Consistency', 
      description: 'Play for 7 consecutive days', 
      icon: '📅' 
    },
    'word-master': { 
      name: 'Word Master', 
      description: 'Complete 50 words', 
      icon: '👑' 
    },
    'mistake-free': { 
      name: 'Mistake Free', 
      description: 'Complete 15 words without any mistakes', 
      icon: '✨' 
    }
  };

  const getBadgeInfo = (badgeKey) => {
    return badgeTypes[badgeKey] || { name: 'Unknown Badge', description: 'Unknown badge', icon: '❓' };
  };

  const getAchievementInfo = (achievementKey) => {
    return achievementTypes[achievementKey] || { name: 'Unknown Achievement', description: 'Unknown achievement', icon: '❓' };
  };

  return (
    <div className="badges-container">
      <h2 className="badges-title">Badges & Achievements</h2>
      
      <div className="badges-section">
        <h3 className="section-title">Badges</h3>
        {badges && badges.length > 0 ? (
          <div className="badges-grid">
            {badges.map((badge, index) => {
              const badgeInfo = getBadgeInfo(badge);
              return (
                <div key={index} className="badge-card">
                  <div className="badge-icon">{badgeInfo.icon}</div>
                  <div className="badge-name">{badgeInfo.name}</div>
                  <div className="badge-description">{badgeInfo.description}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-badges">No badges earned yet. Keep playing!</p>
        )}
      </div>

      <div className="achievements-section">
        <h3 className="section-title">Achievements</h3>
        {achievements && achievements.length > 0 ? (
          <div className="achievements-grid">
            {achievements.map((achievement, index) => {
              const achievementInfo = getAchievementInfo(achievement);
              return (
                <div key={index} className="achievement-card">
                  <div className="achievement-icon">{achievementInfo.icon}</div>
                  <div className="achievement-name">{achievementInfo.name}</div>
                  <div className="achievement-description">{achievementInfo.description}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="no-achievements">No achievements earned yet. Keep playing!</p>
        )}
      </div>
    </div>
  );
};

export default Badges;