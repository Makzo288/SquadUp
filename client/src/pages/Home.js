import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Game from './Game';

const initialGameDays = [
  { id: 1, day: 'Monday', date: 'May 19', confirmed: 8 },
  { id: 2, day: 'Wednesday', date: 'May 21', confirmed: 5 },
  { id: 3, day: 'Saturday', date: 'May 24', confirmed: 0 },
];

const Home = () => {
  const [gameDays, setGameDays] = useState(initialGameDays);
  const [availability, setAvailability] = useState({});
  const navigate = useNavigate();

  const handleAvailability = (id, status) => {
    setGameDays(prev =>
      prev.map(day => {
        if (day.id !== id) return day;

        const prevStatus = availability[id];
        let newConfirmed = day.confirmed;

        if (status === 'in' && prevStatus !== 'in') {
          newConfirmed += 1;
        } else if (status === 'out' && prevStatus === 'in') {
          newConfirmed = Math.max(0, newConfirmed - 1);
        }

        return { ...day, confirmed: newConfirmed };
      })
    );

    setAvailability(prev => ({ ...prev, [id]: status }));
  };

  const handleChange = (id) => {
    setGameDays(prev =>
      prev.map(day => {
        if (day.id !== id) return day;

        const prevStatus = availability[id];
        let newConfirmed = day.confirmed;

        if (prevStatus === 'in') {
          newConfirmed = Math.max(0, newConfirmed - 1);
        }

        return { ...day, confirmed: newConfirmed };
      })
    );

    setAvailability(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const getStatusMessage = (status) => {
    if (status === 'in') return "You're in!";
    if (status === 'out') return "You're unavailable.";
    return 'Awaiting your response...';
  };

  const handleCardClick = (gameData) => {
    document.body.classList.add('page-exit');

    setTimeout(() => {
      navigate(`/game/${gameData.id}`, { state: gameData });
      document.body.classList.remove('page-exit');
    }, 400);
  };

  return (
    <div className="homepage page-transition">
      <div className="homepage">
      <h1 className="title">Upcoming Games</h1>

      <div className="games-list">
        {gameDays.map(game => (
          <Game
            key={game.id}
            game={game}
            availability={availability[game.id]}
            onAvailable={() => handleAvailability(game.id, 'in')}
            onUnavailable={() => handleAvailability(game.id, 'out')}
            onChange={() => handleChange(game.id)}
            getStatusMessage={getStatusMessage}
            onCardClick={() => handleCardClick(game)}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
