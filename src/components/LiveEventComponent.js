import React, { useState } from 'react';

const generateRandomImage = (seed) => `https://picsum.photos/seed/${seed}/400/400`;

const generateRandomLiveEvents = (count) => {
  const titles = ["Rock Night", "Indie Live Session", "Jazz Evening", "Pop Hits Concert", "Country Stars", "Hip-Hop Jam", "Classical Gala"];
  const venues = ["The Music Hall", "Underground Studio", "Open Air Arena", "Downtown Club", "Main Street Stage"];

  let events = [];
  for (let i = 0; i < count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const date = `July ${Math.floor(Math.random() * 30) + 1}`;
    const time = `${Math.floor(Math.random() * 12) + 1}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`;
    const venue = venues[Math.floor(Math.random() * venues.length)];
    const price = `$${Math.floor(Math.random() * 50) + 15}`;
    const imageUrl = generateRandomImage(title + date);
    events.push({ id: i + 1, title, date, time, imageUrl, venue, price });
  }
  return events;
};

const LiveEventComponent = ({ setConfirmationMessage }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const events = generateRandomLiveEvents(8);

  const handleRSVP = async (event) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (!reminders.includes(event.id)) {
        setReminders(prev => [...prev, event.id]);
        setConfirmationMessage(`Successfully RSVP'd for ${event.title}`);
      } else {
        setReminders(prev => prev.filter(id => id !== event.id));
        setConfirmationMessage(`Removed RSVP for ${event.title}`);
      }
    } catch (error) {
      setConfirmationMessage('Error updating RSVP. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setConfirmationMessage(''), 3000);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-white mb-6">Live Events</h2>
      <div className="row">
        {events.map((event) => (
          <div key={event.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card bg-dark text-white shadow-sm h-100">
              <img src={event.imageUrl} alt={event.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p>{event.date} at {event.time}</p>
                <p>{event.venue}</p>
                <p>{event.price}</p>
                <button
                  onClick={() => handleRSVP(event)}
                  disabled={loading}
                  className={`btn w-100 mt-3 ${reminders.includes(event.id) ? 'btn-secondary' : 'btn-primary'}`}
                >
                  {loading ? 'Processing...' : reminders.includes(event.id) ? 'Cancel RSVP' : 'RSVP'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveEventComponent;
