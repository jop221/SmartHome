import React, { useState, useEffect } from "react";
import "./MusicPlayer.css";

const MusicPlayer = () => {
  const [state, setState] = useState("off");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const tracks = [
    { title: "Track 1 - Rock", artist: "Artist 1" },
    { title: "Track 2 - Pop", artist: "Artist 2" },
    { title: "Track 3 - Jazz", artist: "Artist 3" },
    { title: "Track 4 - Classical", artist: "Artist 4" },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            nextTrack();
            return 0;
          }
          return prevProgress + 1; 
        });
      }, 100); 
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); 
  }, [isPlaying]);

  const toggle = () => {
    if (state === "off") {
      setState("idle");
    } else if (state === "idle") {
      setState("playing");
      setIsPlaying(true);
    } else if (state === "playing") {
      setState("paused");
      setIsPlaying(false);
    } else {
      setState("off");
      setIsPlaying(false);
    }
  };

  const playPause = () => {
    if (state === "idle") {
      setState("playing");
      setIsPlaying(true);
    } else if (state === "playing") {
      setState("paused");
      setIsPlaying(false);
    } else if (state === "paused") {
      setState("playing");
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    setProgress(0); 
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    setProgress(0); 
    setCurrentTrackIndex(
      (prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length
    );
  };

  return (
    <div>
      <h2>Музыкальный проигрыватель</h2>
      <p>Текущее состояние: {state}</p>
      <button onClick={toggle}>
        {state === "off" ? "Включить" : "Выключить"}
      </button>
      <button onClick={playPause}>
        {state === "playing" ? "Пауза" : "Играть"}
      </button>
      {state !== "off" && (
        <>
          <button onClick={prevTrack}>Предыдущий трек</button>
          <button onClick={nextTrack}>Следующий трек</button>
          <div>
            <h3>Текущий трек:</h3>
            <p>{`${tracks[currentTrackIndex].title} - ${tracks[currentTrackIndex].artist}`}</p>
          </div>
          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
