import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config";

export default function Focus() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [aiReply, setAiReply] = useState("");

  useEffect(() => {
    let x;
    if (running && time > 0) {
      x = setInterval(() => setTime((t) => t - 1), 1000);
    }
    return () => clearInterval(x);
  }, [running, time]);

  const m = String(Math.floor(time / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");

  const askAI = async () => {
    try {
      const res = await axios.get(
        `${API}/ai/suggestion?focusMinutes=${Math.floor((1500 - time) / 60)}`
      );
      setAiReply(res.data.reply);
    } catch (e) {
      setAiReply("⚠️ AI not responding. Backend may be off.");
    }
  };

  return (
    <div className="relative pt-28 px-6 min-h-screen bg-gradient-to-br from-[#F6F1FF] via-[#FBF9FF] to-[#EDE9F7]">
      <h1 className="text-4xl font-extrabold text-center text-[#1A1A2E] drop-shadow-sm">
        Focus Mode 🎧
      </h1>

      <div className="mt-10 mx-auto max-w-md bg-white/80 rounded-3xl shadow-2xl p-8">
        <div className="text-7xl font-bold text-[#7F5AF0]">
          {m}:{s}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setRunning(!running)}
            className="px-8 py-3 bg-[#7F5AF0] text-white rounded-xl"
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setTime(1500);
            }}
            className="px-8 py-3 border border-[#C9BDD9]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="mt-10 text-center">
        <button
          onClick={askAI}
          className="px-8 py-4 bg-[#46C7E8] text-white rounded-xl shadow"
        >
          Ask AI: “How can I focus better today?”
        </button>

        {aiReply && (
          <div className="mt-6 p-4 bg-white/80 rounded-xl shadow-lg">
            {aiReply}
          </div>
        )}
      </div>
    </div>
  );
}
