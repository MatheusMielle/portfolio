import React, { useEffect, useState } from "react";
import "../styles/TopTracksWidget.css"; // See CSS below

interface Track {
  album: string;
  artist: string;
  image: string;
  track: string;
  url: string;
}

const TopTracksWidget: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/recent-tracks")
      .then((res) => res.json())
      .then((data) => setTracks(data.slice(0, 10)))
      .catch((err) => console.error("Failed to load tracks:", err));
  }, []);

  const handlePlay = async (track: Track) => {
    setPlayingTrack(track);
    try {
      const query = encodeURIComponent(`${track.track} ${track.artist}`);
      const res = await fetch(`http://localhost:5000/api/search-youtube?query=${query}`);
      const data = await res.json();
      setYoutubeUrl(data.url);
    } catch (err) {
      console.error("Failed to fetch YouTube URL:", err);
    }
  };

  const handleBack = () => {
    setPlayingTrack(null);
    setYoutubeUrl("");
  };

  if (playingTrack && youtubeUrl) {
    return (
      <div className="top-tracks-widget video-mode">
        <button className="back-btn" onClick={handleBack}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
        <div className="youtube-embed">
          <iframe
            width="100%"
            height="100%"
            src={youtubeUrl.replace("watch?v=", "embed/")}
            title={playingTrack.track}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="top-tracks-widget">
      <h3>Currently Listening</h3>
      <ul className="track-list">
        {tracks.map((track, index) => (
          <li className="track-card" key={index} onClick={() => handlePlay(track)} style={{ cursor: "pointer" }}>
            <img src={track.image} alt={track.track} className="track-art" />
            <div className="track-meta">
              <strong>{track.track}</strong>
              <p>{track.artist}</p>
              <p className="album">{track.album}</p>
            </div>
            <button className="play-btn" onClick={() => handlePlay(track)}>
              <i className="bi bi-play-circle-fill"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracksWidget;
