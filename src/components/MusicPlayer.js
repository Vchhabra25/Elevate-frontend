import React, { useRef, useState } from "react";
import { Music, Play, Pause, X } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // WORKING LO-FI MP3 TRACK
  const defaultTrack =
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Ziklibrenbib/KieLoBot/Winter_Training/KieLoBot_-_01_-_The_Way_Out.mp3";

  const togglePlay = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Floating Music Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 cursor-pointer transition-all duration-300 z-50"
        title="Focus Music"
      >
        <Music size={22} />
      </div>

      {/* Mini Music Player */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-white/95 backdrop-blur-md shadow-xl border border-slate-200 rounded-2xl p-4 w-72 z-50 animate-fadeIn">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-slate-800 font-semibold text-sm">
              Focus Music 🎧
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          </div>

          {/* Audio controls */}
          <div className="flex flex-col items-center text-center space-y-3">
            <p className="text-xs text-slate-500">
              Lo-Fi Beats to Study & Focus
            </p>

            <button
              onClick={togglePlay}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium ${
                isPlaying
                  ? "bg-red-100 text-red-600 hover:bg-red-200"
                  : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause size={16} /> Pause
                </>
              ) : (
                <>
                  <Play size={16} /> Play
                </>
              )}
            </button>

            {/* Actual audio */}
            <audio ref={audioRef} src={defaultTrack} loop />
          </div>
        </div>
      )}
    </>
  );
}
