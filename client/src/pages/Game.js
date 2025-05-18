import React from 'react';

const Game = ({ game, availability, onAvailable, onUnavailable, onChange, getStatusMessage, onCardClick }) => {
  const { day, date, confirmed } = game;

  return (
    <div className="game-card" onClick={onCardClick} style={{ cursor: 'pointer' }}>
      <div className="game-info">
        <h3 className="game-day">{day}, {date}</h3>
        <p className="confirmed">{confirmed} {confirmed === 1 ? 'player' : 'players'} confirmed</p>
        <p className="confirmed">{getStatusMessage(availability)}</p>
      </div>

      {availability ? (
        <div className="change-section" onClick={e => e.stopPropagation()}>
          <button className="btn change" onClick={onChange}>Change Availability</button>
        </div>
      ) : (
        <div className="availability-buttons" onClick={e => e.stopPropagation()}>
          <button className="btn available" onClick={onAvailable}>I'm In</button>
          <button className="btn unavailable" onClick={onUnavailable}>Can't Make It</button>
        </div>
      )}
    </div>
  );
};

export default Game;
