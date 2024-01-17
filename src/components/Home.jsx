import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tracks, setTracks] = useState([]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${searchTerm}&type=track`,
        {
          headers: {
            Authorization: `Bearer YOUR_SPOTIFY_ACCESS_TOKEN`,
          },
        }
      );

      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data from Spotify API:', error);
    }
  };

  return (
    <div>
      <h1>Music Recommendation App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a track"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} by {track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
