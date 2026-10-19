'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

export const RomanticAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play romantic chords using Web Audio API synthesis
  const playRomanticChordProgression = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Romantic Pentatonic notes (C Major / A Minor love chords)
      // C4 (261.63), E4 (329.63), G4 (392.00), B4 (493.88), C5 (523.25), E5 (659.25)
      const chordNotes = [
        [261.63, 329.63, 392.0, 523.25], // Cmaj
        [220.0, 261.63, 329.63, 440.0],  // Am
        [174.61, 220.0, 261.63, 349.23], // Fmaj
        [196.0, 246.94, 293.66, 392.0],  // Gmaj
      ];

      let chordIndex = 0;

      const playChord = () => {
        if (!audioCtxRef.current) return;
        const currentChord = chordNotes[chordIndex % chordNotes.length];
        const now = ctx.currentTime;

        currentChord.forEach((freq, noteIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + noteIdx * 0.15);

          // Gentle romantic music-box envelope
          gain.gain.setValueAtTime(0, now + noteIdx * 0.15);
          gain.gain.linearRampToValueAtTime(0.04, now + noteIdx * 0.15 + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + noteIdx * 0.15 + 2.5);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now + noteIdx * 0.15);
          osc.stop(now + noteIdx * 0.15 + 2.6);
        });

        chordIndex++;
      };

      playChord();
      timerRef.current = setInterval(playChord, 2600);
    } catch {
      // Audio not supported
    }
  };

  const stopMusic = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.suspend();
    }
  };

  const toggleSound = () => {
    if (!isPlaying) {
      playRomanticChordProgression();
      setIsPlaying(true);
    } else {
      stopMusic();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 backdrop-blur-xl border border-rose-200/90 shadow-xl shadow-rose-400/25 hover:shadow-rose-400/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer text-xs font-bold text-rose-900"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
              <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
              <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
              <span className="equalizer-bar w-0.5 bg-rose-500 rounded-full" />
            </div>
            <span className="text-rose-600">Đang phát nhạc lãng mạn</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
            <span>Bật giai điệu lãng mạn</span>
          </>
        )}
      </button>
    </div>
  );
};
