import React from 'react';

const RightHandSidebarComponent = ({ title, artist, imageUrl, upNext }) => {
  return (
    <div className="right-hand-sidebar bg-dark text-white p-4 fixed-sidebar">
      <h4>Now Playing</h4>
      <img src={imageUrl} alt={title} className="img-fluid rounded mb-3" />
      <h5>{title}</h5>
      <p className="text-muted">{artist}</p>

      {upNext.length > 0 && (
        <div className="up-next mt-4">
          <h6>Up Next</h6>
          <ul className="list-unstyled">
            {upNext.map((song, index) => (
              <li key={index} className="my-2">
                <strong>{song.title}</strong> by {song.artist}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RightHandSidebarComponent;
