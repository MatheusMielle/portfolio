import React, { useEffect, useState, useCallback } from "react";
import "../styles/TopTracksWidget.css";
import { useTranslationSync } from "../hooks/useTranslationSync";

interface Track {
  album: string;
  artist: string;
  image: string;
  track: string;
  url: string;
}

const TopTracksWidget: React.FC = () => {
  const { t } = useTranslationSync("home");

  const [tracks, setTracks] = useState<Track[]>([]);
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTracks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/recent-tracks");
      if (!res.ok) throw new Error(res.statusText || "Request failed");
      const data = await res.json();
      setTracks(Array.isArray(data) ? data.slice(0, 10) : []);
    } catch (err: any) {
      setError(err.message || "Failed to load tracks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks]);

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
          <i className="bi bi-arrow-left"></i> {t("track-widget.back")}
        </button>
        <div className="youtube-embed">
          <iframe
            width="100%"
            height="100%"
            src={youtubeUrl.replace("watch?v=", "embed/")}
            title={playingTrack.track}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  return (
    <div className="top-tracks-widget">
      <h3>{t("track-widget.title")}</h3>

      {loading && (
        <div className="tracks-loader" aria-live="polite">
          <div className="spinner" />
          <span className="loading-text">{t("track-widget.loading")}</span>
        </div>
      )}

      {!loading && error && (
        <div className="tracks-error" role="alert">
          <i className="bi bi-exclamation-triangle-fill" /> {t("track-widget.error")}
          <button className="retry-btn" onClick={fetchTracks}>
            {t("track-widget.retry")}
          </button>
        </div>
      )}

      {!loading && !error && (
        <ul className="track-list">
          {tracks.map((track, index) => (
            <li
              className="track-card"
              key={index}
              onClick={() => handlePlay(track)}
              style={{ cursor: "pointer" }}
            >
              <img src={track.image} alt={track.track} className="track-art" />
              <div className="track-meta">
                <strong>{track.track}</strong>
                <p>{track.artist}</p>
                <p className="album">{track.album}</p>
              </div>
              <button
                className="play-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlay(track);
                }}
              >
                <i className="bi bi-play-circle-fill"></i>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TopTracksWidget;
