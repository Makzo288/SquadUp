import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GameDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const game = location.state;

  if (!game) return <p>No game data available.</p>;

  return (
    <div className="game-details page-transition">
    <div className="game-details">
      <button className="btn back" onClick={() => navigate(-1)}>← Back</button>
      <h2>Game Details</h2>
      <p><strong>Day:</strong> {game.day}</p>
      <p><strong>Date:</strong> {game.date}</p>
      <p><strong>Confirmed Players:</strong> {game.confirmed}</p>
    </div>
    </div>
  );
};

export default GameDetails;
