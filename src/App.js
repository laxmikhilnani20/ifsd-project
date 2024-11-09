import React, { useState, useCallback, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BsPlayFill, BsPauseFill, BsSkipBackwardFill, BsSkipForwardFill,
  BsVolumeUp, BsShuffle, BsRepeat, BsHeart, BsHeartFill, BsSearch,
  BsHouseDoorFill, BsCollectionPlayFill, BsChevronLeft, BsChevronRight,
  BsPersonCircle, BsBellFill, BsGearFill, BsCameraVideoFill, BsPeopleFill,
  BsSortAlphaDown, BsSortAlphaUp
} from 'react-icons/bs';

const generateRandomImage = (seed) => `https://picsum.photos/seed/${seed}/300/300`;

const generateRandomSongs = (count) => {
  const titles = ["Eternal Dream", "Mystic River", "Golden Light", "Crimson Sky", "Whispering Moon", "Shadow Dance", "Rising Dawn", "Silver Serenade", "Velvet Symphony", "Autumn Blaze"];
  const artists = ["Aurora", "Echoes", "Celestial", "Midnight Pulse", "Neon Voyage", "Starry Nights", "Whispers", "Luna Echo", "Harmony", "Solar Waves"];

  let songs = [];
  for (let i = 0; i < count; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)];
    const artist = artists[Math.floor(Math.random() * artists.length)];
    const duration = `${Math.floor(Math.random() * 5) + 2}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`;
    const imageUrl = generateRandomImage(title + artist);
    songs.push({ id: i + 1, title, artist, duration, imageUrl });
  }
  return songs;
};

const generateRandomActivities = () => {
  const activities = [
    "liked a song",
    "started listening to a playlist",
    "shared a song",
    "joined a live event",
    "added a new favorite",
  ];
  const friends = ["Alice", "Bob", "Charlie", "Dana", "Eve", "Frank", "Grace"];
  return friends.map((friend, index) => ({
    id: index + 1,
    name: friend,
    activity: activities[Math.floor(Math.random() * activities.length)],
    avatarUrl: generateRandomImage(friend)
  }));
};

const generateRandomLiveEvents = (count) => {
  const events = ["Concert with Aurora", "DJ Set by Midnight Pulse", "Echoes Live Q&A", "Celestial Acoustic Night", "Neon Voyage Streaming Party", "Starry Nights DJ Set"];
  let liveEvents = [];
  for (let i = 0; i < count; i++) {
    const title = events[Math.floor(Math.random() * events.length)];
    const description = `Join ${title} for an unforgettable night of music and fun!`;
    const time = `${Math.floor(Math.random() * 12) + 1}:00 PM`;
    const imageUrl = generateRandomImage(title);
    liveEvents.push({ id: i + 1, title, description, time, imageUrl });
  }
  return liveEvents;
};

const SongCard = React.memo(({ song, onSelectSong, onToggleFavorite, isFavorite, showFavoriteButton }) => {
  return (
    <div className="col-md-4 col-lg-2 mb-4">
      <div className="card h-100 bg-dark text-white" onClick={() => onSelectSong(song)}>
        <img src={song.imageUrl} className="card-img-top" alt={song.title} />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{song.title}</h5>
          <p className="card-text text-muted">{song.artist}</p>
          <small className="text-muted">{song.duration}</small>
          <div className="mt-auto">
            {showFavoriteButton && (!isFavorite ? (
              <button
                className="btn btn-outline-light btn-sm mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(song, true);
                }}
              >
                <BsHeart /> Add to Favorite
              </button>
            ) : (
              <button
                className="btn btn-outline-danger btn-sm mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(song, false);
                }}
              >
                <BsHeartFill /> Remove Favorite
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

const FriendsActivityComponent = () => {
  const activities = [
    { friend: 'Alice', action: 'liked', type: 'song', value: 'Eternal Dream', time: '2h ago' },
    { friend: 'Bob', action: 'started following', type: 'person', value: 'John Doe', time: '5h ago' },
    { friend: 'Charlie', action: 'shared', type: 'playlist', value: 'Rock Classics', time: '1d ago' },
  ];

  return (
    <div className="container-fluid p-4">
      <h2 className="text-white mb-4">Friends Activity</h2>
      <div className="row">
        {activities.map((activity, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="card friend-card bg-dark text-white p-3 h-100 shadow-lg d-flex align-items-center">
              <img
                src={generateRandomImage(activity.friend)}
                alt={`${activity.friend}'s avatar`}
                className="rounded-circle mb-3"
                style={{ width: '60px', height: '60px' }}
              />
              <p className="m-0 text-center">
                <strong>{activity.friend}</strong> {activity.action} a {activity.type}:{' '}
                <em>{activity.value}</em>
                <span className="text-muted ml-2 d-block">{activity.time}</span>
              </p>
              <button className="btn btn-outline-light btn-sm mt-3">Send Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
                <p>{event.time}</p>
                <p>{event.description}</p>
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

const SearchComponent = ({ playlists = [], onSongSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allSongs = playlists.reduce((acc, playlist) => [...acc, ...playlist.songs], []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsOpen(true);

    if (value.trim()) {
      const filtered = allSongs.filter(song =>
        song.title.toLowerCase().includes(value.toLowerCase()) ||
        song.artist.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (song) => {
    setSearchTerm(song.title);
    setIsOpen(false);
    onSongSelect(song);
  };

  return (
    <div className="p-4" ref={wrapperRef}>
      <div className="position-relative">
        <input
          type="text"
          className="form-control p-3"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={handleChange}
        />
        {isOpen && suggestions.length > 0 && (
          <div className="position-absolute w-100 mt-1 bg-dark rounded shadow overflow-hidden">
            {suggestions.map((song, index) => (
              <div
                key={index}
                className="p-3 hover:bg-secondary cursor-pointer border-bottom border-secondary"
                onClick={() => handleSuggestionClick(song)}
              >
                <div className="font-weight-bold text-white">{song.title}</div>
                <div className="text-muted">{song.artist}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [userName, setUserName] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([
    {
      id: 1,
      name: 'My Favorite Songs',
      songs: generateRandomSongs(5)
    },
    {
      id: 2,
      name: 'Top 2020 Hits',
      songs: generateRandomSongs(5)
    },
    {
      id: 3,
      name: 'New Releases',
      songs: generateRandomSongs(5)
    }
  ]);
  const [friendsActivities] = useState(generateRandomActivities());
  const [recentlySearched, setRecentlySearched] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [liveEvents] = useState(generateRandomLiveEvents(5));
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = () => {
    if (userName.trim() !== '') {
      setIsLoggedIn(true);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSort = () => {
    setSortAsc(prevSortAsc => !prevSortAsc);
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist => ({
        ...playlist,
        songs: [...playlist.songs].sort((a, b) =>
          sortAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        ),
      }))
    );
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const allSongs = playlists.reduce((acc, playlist) => [...acc, ...playlist.songs], []);
      const filteredSongs = allSongs.filter(song =>
        song.title.toLowerCase().includes(value.toLowerCase()) ||
        song.artist.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filteredSongs);

      if (value.length > 2 && !recentlySearched.some(search => search.toLowerCase() === value.toLowerCase())) {
        setRecentlySearched((prev) => {
          const updatedSearches = [value, ...prev];
          return updatedSearches.slice(0, 5);
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSongSelect = useCallback((song) => {
    setCurrentSong(song);
    setIsPlaying(true);

    setRecentlyPlayed((prev) => {
      const updatedList = [song, ...prev.filter(s => s.id !== song.id)];
      return updatedList.slice(0, 25);
    });
  }, []);

  const handleToggleFavorite = useCallback((song, addToFavorites) => {
    if (addToFavorites) {
      if (!favorites.find(fav => fav.id === song.id)) {
        setFavorites(prevFavorites => [...prevFavorites, song]);
      }
    } else {
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== song.id));
    }
  }, [favorites]);

  const MainContent = () => {
    if (activeView === 'home') {
      return (
        <div className="main-content p-4">
          <h2 className="mb-4">Recently Played</h2>
          <div className="row mb-4">
            {recentlyPlayed.length > 0 ? (
              recentlyPlayed.slice(0, 10).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onSelectSong={handleSongSelect}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.some(fav => fav.id === song.id)}
                  showFavoriteButton={true}
                />
              ))
            ) : (
              generateRandomSongs(10).map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onSelectSong={handleSongSelect}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.some(fav => fav.id === song.id)}
                  showFavoriteButton={true}
                />
              ))
            )}
          </div>

          <h2 className="mb-4">Trending Now</h2>
          <div className="row mb-4">
            {generateRandomSongs(10).map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onSelectSong={handleSongSelect}
                isFavorite={favorites.some(fav => fav.id === song.id)}
                showFavoriteButton={false}
              />
            ))}
          </div>
        </div>
      );
    } else if (activeView === 'playlists') {
      return (
        <div className="main-content p-4">
          <h2 className="mb-4">Playlists</h2>
          <button className="btn btn-dark mb-3" onClick={handleSort}>
            {sortAsc ? <BsSortAlphaDown /> : <BsSortAlphaUp />} Sort Playlists
          </button>
          <div className="row">
            {playlists.map((playlist) => (
              <div key={playlist.id} className="col-md-6 col-lg-4 mb-4">
                <div className="playlist-card card bg-dark text-white p-3">
                  <h4 className="card-title">{playlist.name}</h4>
                  <ul className="list-group list-group-flush">
                    {playlist.songs.slice(0, 6).map(song => (
                      <li key={song.id} className="list-group-item bg-dark text-white">
                        {song.title} - {song.artist}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeView === 'search') {
      return <SearchComponent playlists={playlists} onSongSelect={handleSongSelect} />;
    } else if (activeView === 'friends') {
      return <FriendsActivityComponent />;
    } else if (activeView === 'live') {
      return <LiveEventComponent />;
    } else if (activeView === 'profile') {
      return (
        <UserProfileComponent
          favorites={favorites}
          email="student@example.com"
          userName={userName}
          playlists={playlists}
          onRemoveFavorite={handleToggleFavorite}
        />
      );
    }
    return null;
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container text-center">
        <div className="login-card bg-dark text-white p-5 rounded">
          <h2>Welcome to BeatFusion!</h2>
          <div className="form-group mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <button className="btn btn-primary mt-3" onClick={handleLogin}>
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`spotify-app ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      <button className="toggle-sidebar-button" onClick={toggleSidebar}>
        ☰
      </button>

      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="mb-4">BeatFusion</h1>
          <nav className="nav flex-column">
            <button className={`nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => setActiveView('home')}>
              <BsHouseDoorFill /> Home
            </button>
            <button className={`nav-link ${activeView === 'playlists' ? 'active' : ''}`} onClick={() => setActiveView('playlists')}>
              <BsCollectionPlayFill /> Playlists
            </button>
            <button className={`nav-link ${activeView === 'search' ? 'active' : ''}`} onClick={() => setActiveView('search')}>
              <BsSearch /> Search
            </button>
            <button className={`nav-link ${activeView === 'live' ? 'active' : ''}`} onClick={() => setActiveView('live')}>
              <BsCameraVideoFill /> Live Events
            </button>
            <button className={`nav-link ${activeView === 'friends' ? 'active' : ''}`} onClick={() => setActiveView('friends')}>
              <BsPeopleFill /> Friends
            </button>
            <button className={`nav-link ${activeView === 'profile' ? 'active' : ''}`} onClick={() => setActiveView('profile')}>
              <BsPersonCircle /> Profile
            </button>
          </nav>
        </div>
        <button className="btn btn-warning" onClick={() => setIsLoggedIn(false)}>Log Out</button>
      </div>

      <div className="main-container">
        <div className="top-bar d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2">
            <button className="btn btn-dark"><BsChevronLeft /></button>
            <button className="btn btn-dark"><BsChevronRight /></button>
          </div>
          <button className="btn btn-dark" onClick={() => setShowNotifications(!showNotifications)}>
            <BsBellFill />
          </button>
          {showNotifications && (
            <div className="dropdown-content bg-dark text-white p-2 rounded">
              <div>No new notifications</div>
            </div>
          )}
          <button className="btn btn-dark" onClick={() => setShowSettings(!showSettings)}>
            <BsGearFill />
          </button>
          {showSettings && (
            <div className="dropdown-content bg-dark text-white p-2 rounded">
              <div>Settings</div>
              <div>Account</div>
            </div>
          )}
          <button className="btn btn-dark" onClick={() => setShowProfileOptions(!showProfileOptions)}>
            <BsPersonCircle />
          </button>
          {showProfileOptions && (
            <div className="dropdown-content bg-dark text-white p-2 rounded">
              <div onClick={() => setActiveView('profile')}>Profile</div>
              <div onClick={() => setIsLoggedIn(false)}>Log Out</div>
            </div>
          )}
        </div>
        <MainContent />
      </div>

      <div className="player">
        <div className="now-playing">
          {currentSong ? (
            <>
              <img src={currentSong.imageUrl} alt="Current track" />
              <div className="song-info">
                <div>{currentSong.title}</div>
                <small className="text-muted">{currentSong.artist}</small>
              </div>
            </>
          ) : (
            <p className="text-muted">No song is currently playing.</p>
          )}
        </div>

        <div className="player-controls d-flex align-items-center gap-3">
          <button className="btn btn-link text-muted"><BsShuffle /></button>
          <button className="btn btn-link text-muted"><BsSkipBackwardFill /></button>
          <button className="btn btn-link text-white" onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <BsPauseFill size={30} /> : <BsPlayFill size={30} />}
          </button>
          <button className="btn btn-link text-muted"><BsSkipForwardFill /></button>
          <button className="btn btn-link text-muted"><BsRepeat /></button>
        </div>

        <div className="volume-controls d-flex align-items-center gap-2">
          <BsVolumeUp className="text-muted" />
          <input type="range" className="form-range" min="0" max="100" />
        </div>
      </div>

      {!isSmallScreen && currentSong && (
        <div className="right-hand-sidebar bg-dark text-white p-4 fixed-sidebar">
          <h4>Now Playing</h4>
          <img src={currentSong.imageUrl} alt={currentSong.title} className="img-fluid rounded mb-3" />
          <h5>{currentSong.title}</h5>
          <p className="text-muted">{currentSong.artist}</p>

          {recentlyPlayed.length > 1 && (
            <div className="up-next mt-4">
              <h6>Up Next</h6>
              <ul className="list-unstyled">
                {recentlyPlayed.slice(1, 6).map((song, index) => (
                  <li key={index} className="my-2">
                    <strong>{song.title}</strong> by {song.artist}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
