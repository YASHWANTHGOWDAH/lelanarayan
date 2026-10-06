import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Audio play error:', err);
      });
    }
  };

  return (
    <div className="audio-player-wrapper">
      {/* Royalty-free tranquil Indian tanpura ambient sound */}
      <audio
        ref={audioRef}
        loop
        preload="none"
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-tanpura-ambient-115383.mp3"
      />
      <button
        onClick={toggleAudio}
        className="audio-toggle-btn"
        title={isPlaying ? "Mute Tanpura Ambient" : "Play Ambient Tanpura Sound"}
        aria-label="Toggle Ambient Audio"
      >
        <Music size={14} className={isPlaying ? "animate-spin" : ""} />
        <span>{isPlaying ? "Swara Playing" : "Tanpura Sound"}</span>
        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  );
}
