import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsHeartFill } from 'react-icons/bs';

const UserProfileComponent = ({ userName, email, favorites, onRemoveFavorite }) => {
  return (
    <div className="main-content p-4">
      <div className="profile-header mb-5">
        <div className="d-flex align-items-center">
          <img 
            src="https://picsum.photos/seed/useravatar/100/100"
            alt="User Avatar"
            className="rounded-circle border"
            style={{ width: "100px", height: "100px", marginRight: "20px" }}
          />
          <div>
            <h2 className="text-white">{userName}</h2>
            <p className="text-muted">{email}</p>
          </div>
        </div>
      </div>

      <h3 className="mb-4">Favorite Songs</h3>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((song) => (
            <div key={song.id} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100 bg-dark text-white">
                <img src={song.imageUrl} className="card-img-top" alt={song.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{song.title}</h5>
                  <p className="card-text text-muted">{song.artist}</p>
                  <small className="text-muted">{song.duration}</small>
                  <div className="mt-auto">
                    <button
                      className="btn btn-outline-danger btn-sm mt-2"
                      onClick={() => onRemoveFavorite(song, false)}
                    >
                      <BsHeartFill /> Remove Favorite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">You have no favorite songs yet. Start adding some!</p>
        )}
      </div>
    </div>
  );
};

export default UserProfileComponent;
