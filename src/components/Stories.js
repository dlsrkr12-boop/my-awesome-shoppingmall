import React from 'react';

function Stories({ stories }) {
  return (
    <div className="stories-container">
      <div className="stories">
        {stories.map(story => (
          <div key={story.id} className="story">
            <div className={`story-ring ${story.isOwn ? 'own-story' : ''}`}>
              <img src={story.userImage} alt={story.username} />
              {story.isOwn && <div className="add-icon">+</div>}
            </div>
            <span className="story-username">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;

