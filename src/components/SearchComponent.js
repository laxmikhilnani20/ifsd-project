import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchComponent = ({ playlists = [], onSongSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Close suggestions if clicking outside of search box
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract all songs from playlists
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
      setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (song) => {
    setSearchTerm(song.title);
    setIsOpen(false);
    onSongSelect(song); // Play the selected song
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

export default SearchComponent;
