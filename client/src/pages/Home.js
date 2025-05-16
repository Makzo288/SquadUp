import React, { useState } from 'react';

const initialGameDays = [
  { id: 1, day: 'Monday', date: 'May 19', confirmed: 8 },
  { id: 2, day: 'Wednesday', date: 'May 21', confirmed: 5 },
  { id: 3, day: 'Saturday', date: 'May 24', confirmed: 0 },
];

const Home = () => {
  const [gameDays, setGameDays] = useState(initialGameDays);
  const [availability, setAvailability] = useState({});

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

  return (
    <div className="homepage">
      <h1 className="title">Upcoming Games</h1>

      <div className="games-list">
        {gameDays.map(({ id, day, date, confirmed }) => (
          <div key={id} className="game-card">
            <div className="game-info">
              <h3 className="game-day">{day}, {date}</h3>
              <p className="confirmed">{confirmed} {confirmed === 1 ? 'player' : 'players'} confirmed</p>
              <p className="confirmed">{getStatusMessage(availability[id])}</p>
            </div>

            {availability[id] ? (
              <div className="change-section">
                <button className="btn change" onClick={() => handleChange(id)}>Change Availability</button>
              </div>
            ) : (
              <div className="availability-buttons">
                <button
                  className="btn available"
                  onClick={() => handleAvailability(id, 'in')}
                >
                  I'm In
                </button>
                <button
                  className="btn unavailable"
                  onClick={() => handleAvailability(id, 'out')}
                >
                  Can't Make It
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
