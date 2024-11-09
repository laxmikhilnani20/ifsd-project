import React, { useState } from 'react';

const generateRandomImage = (seed) => `https://picsum.photos/seed/${seed}/300/300`;

const generateRandomPodcasts = (count) => {
  const titles = ["Tech Talk Daily", "Health Matters", "History Unlocked", "Startup Stories", "Mindful Moments", "Space Odyssey", "Mystery Hour", "Book Lover's Paradise"];
  const hosts = ["John Doe", "Jane Smith", "David Johnson", "Alice Brown", "Emily White", "Michael Scott", "Rachel Green"];

  let podcasts = [];
  for (let i = 0; i < count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const host = hosts[Math.floor(Math.random() * hosts.length)];
    const duration = `${Math.floor(Math.random() * 30) + 15}:00`;
    const imageUrl = generateRandomImage(title + host);
    const description = `${title} by ${host} provides in-depth insights and valuable information.`;
    podcasts.push({ id: i + 1, title, host, duration, imageUrl, description });
  }
  return podcasts;
};

const PodcastComponent = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const podcasts = generateRandomPodcasts(8);

  const handlePlayPodcast = (podcast) => {
    setCurrentlyPlaying(currentlyPlaying?.id === podcast.id ? null : podcast);
  };

  return (
    <div className="p-6">
      <h2 className="text-white mb-6">Podcasts</h2>
      <div className="row">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card bg-dark text-white shadow-sm h-100">
              <img src={podcast.imageUrl} alt={podcast.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{podcast.title}</h5>
                <p>Hosted by: {podcast.host}</p>
                <p>{podcast.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">{podcast.duration}</span>
                  <button
                    onClick={() => handlePlayPodcast(podcast)}
                    className={`btn ${currentlyPlaying?.id === podcast.id ? 'btn-success' : 'btn-outline-success'}`}
                  >
                    {currentlyPlaying?.id === podcast.id ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastComponent;
