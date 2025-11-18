import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Focus() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [aiReply, setAiReply] = useState("");

  // TIMER
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
        `http://localhost:5000/ai/suggestion?focusMinutes=${Math.floor(
          (1500 - time) / 60
        )}`
      );
      setAiReply(res.data.reply);
    } catch (e) {
      setAiReply("⚠️ AI not responding. Backend may be off.");
    }
  };

  return (
    <div className="relative pt-28 px-6 min-h-screen bg-gradient-to-br from-[#F6F1FF] via-[#FBF9FF] to-[#EDE9F7]">

      {/* Floating background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-56 h-56 bg-[#EAD9FF] rounded-full blur-3xl opacity-40 animate-pulse top-10 left-[-20px]"></div>
        <div className="absolute w-72 h-72 bg-[#FFD7F5] rounded-full blur-3xl opacity-35 animate-ping right-[-60px] top-40"></div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center text-[#1A1A2E] drop-shadow-sm">
        Focus Mode 🎧
      </h1>
      <p className="text-center text-[#7A7A85] mt-2">
        Beat distractions with smart timing + science-backed focus tools.
      </p>

      {/* TIMER CARD */}
      <div className="mt-10 mx-auto max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-[#E3DAF7] text-center">
        <div className="text-7xl font-bold text-[#7F5AF0] tracking-wide">
          {m}:{s}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setRunning(!running)}
            className="px-8 py-3 rounded-xl bg-[#7F5AF0] text-white shadow hover:bg-[#6B47DD] transition"
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setTime(1500);
            }}
            className="px-8 py-3 rounded-xl border border-[#C9BDD9] text-[#1A1A2E] hover:bg-[#F6F1FF]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* VIDEO GRID */}
      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-[#1A1A2E] mb-5">Focus Boosters 🎥</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "LoFi Beats Radio",
              link: "https://youtu.be/5qap5aO4i9A",
            },
            {
              title: "Deep Work Music",
              link: "https://youtu.be/wDjeBNv6ip0",
            },
            {
              title: "Study Motivation Talk",
              link: "https://youtu.be/q6EoRBvdVPQ",
            },
          ].map((v) => (
            <a
              key={v.title}
              href={v.link}
              target="_blank"
              className="p-5 bg-white rounded-2xl shadow hover:shadow-xl border border-[#EADFFF] transition text-center"
            >
              <h3 className="text-lg font-semibold text-[#7F5AF0]">{v.title}</h3>
              <p className="text-xs text-[#7A7A85] mt-1">Tap to watch →</p>
            </a>
          ))}
        </div>
      </div>

      {/* EXPLAINER BOXES */}
      <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow border border-[#EADFFF]">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">🧠 Mental Sprint</h2>
          <ul className="text-[#7A7A85] mt-2 space-y-2 text-sm">
            <li>• Breathe 4-4-6 method</li>
            <li>• Look at a fixed point 20s</li>
            <li>• Relax forehead + shoulders</li>
            <li>• Slow blink to reset eyes</li>
          </ul>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow border border-[#EADFFF]">
          <h2 className="text-xl font-semibold text-[#1A1A2E]">💡 How to use Pomodoro?</h2>
          <ul className="text-[#7A7A85] mt-2 space-y-2 text-sm">
            <li>• 25 mins deep work</li>
            <li>• 5 mins break</li>
            <li>• After 4 cycles → 20 min long break</li>
            <li>• Track sessions → boost consistency</li>
          </ul>
        </div>
      </div>

      {/* AI SUGGESTION BOX */}
      <div className="mt-16 max-w-xl mx-auto text-center">
        <button
          onClick={askAI}
          className="px-8 py-4 bg-[#46C7E8] text-white rounded-xl shadow hover:bg-[#34b5d4] transition"
        >
          Ask AI: “How can I focus better today?”
        </button>

        {aiReply && (
          <div className="mt-6 p-5 bg-white/80 border border-[#D9EDFF] rounded-2xl shadow text-[#1A1A2E]">
            {aiReply}
          </div>
        )}
      </div>

      <div className="h-20" />
    </div>
  );
}
