import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config";

export default function Focus() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [aiReply, setAiReply] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // --------------------------
  // 🔥 Helper to update weekly analytics
  // --------------------------
  const logFocusSession = (mins) => {
    const STORAGE_KEY = "elevate_week_focus";
    const WEEK_START_KEY = "elevate_week_start";

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = dayNames[new Date().getDay()];

    // Get existing or init
    let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (
      !data.Mon ||
      !data.Tue ||
      !data.Wed ||
      !data.Thu ||
      !data.Fri ||
      !data.Sat ||
      !data.Sun
    ) {
      data = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    }

    // Add today's minutes
    data[today] += mins;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(WEEK_START_KEY, new Date().toISOString());

    // Show small confirmation
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // --------------------------
  // TIMER LOGIC
  // --------------------------
  useEffect(() => {
    let x;
    if (running && time > 0) {
      x = setInterval(() => setTime((t) => t - 1), 1000);
    }

    // When timer finishes → update analytics
    if (running && time === 0) {
      setRunning(false);
      logFocusSession(25); // Log 25 minutes
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

      {/* SUCCESS TOAST */}
      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-fadeIn">
          ✔ Session added to analytics!
        </div>
      )}

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center text-[#1A1A2E] drop-shadow-sm">
        Focus Mode 🎧
      </h1>
      <p className="text-center text-[#7A7A85] mt-2">
        Stay calm. Stay consistent. Stay focused.
      </p>

      {/* TIMER CARD */}
      <div className="mt-10 mx-auto max-w-md bg-white/80 rounded-3xl shadow-2xl p-8 border border-[#E3DAF7] text-center">
        <div className="text-7xl font-bold text-[#7F5AF0] tracking-wide">
          {m}:{s}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setRunning(!running)}
            className="px-8 py-3 rounded-xl bg-[#7F5AF0] text-white shadow hover:bg-[#6B47DD]"
          >
            {running ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setRunning(false);
              setTime(1500);
            }}
            className="px-8 py-3 rounded-xl border border-[#C9BDD9] hover:bg-[#F6F1FF]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* MUSIC + EXERCISE GRID */}
      <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-8">

        {/* SOOTHING MUSIC */}
        <div className="bg-white/80 rounded-3xl border border-[#E7DFFF] shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#7F5AF0] mb-4">
            🎶 Soothing Music
          </h2>

          <div className="space-y-3">
            {[
              { title: "LoFi Beats Radio", link: "https://youtu.be/5qap5aO4i9A" },
              { title: "Deep Focus Music", link: "https://youtu.be/wDjeBNv6ip0" },
              { title: "Ambient Soft Piano", link: "https://youtu.be/Dx5qFachd3A" },
              { title: "Relaxing Nature Sounds", link: "https://youtu.be/odfF-p9K5O8" },
            ].map((music) => (
              <a
                key={music.title}
                href={music.link}
                target="_blank"
                className="block p-4 bg-[#F8F4FF] border border-[#EAD6FF] rounded-xl hover:shadow-md hover:bg-[#F3E9FF] transition"
              >
                <p className="font-semibold text-[#1A1A2E]">{music.title}</p>
                <p className="text-xs text-[#7A7A85]">Tap to listen →</p>
              </a>
            ))}
          </div>
        </div>

        {/* QUICK FOCUS EXERCISES */}
        <div className="bg-white/80 rounded-3xl border border-[#E7DFFF] shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#7F5AF0] mb-4">
            🧘 Quick Focus Exercises
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-[#F4EAFF] border border-[#E0CCFF] rounded-xl">
              <h3 className="font-semibold text-[#5B3FD6]">🔹 4-4-6 Breathing</h3>
              <p className="text-sm text-[#6A6A70] mt-1">
                Inhale 4s → Hold 4s → Exhale 6s. Repeat for 1 minute.
              </p>
            </div>

            <div className="p-4 bg-[#EAF2FF] border border-[#CFE4FF] rounded-xl">
              <h3 className="font-semibold text-[#3E6CE8]">🔹 20s Eye Reset</h3>
              <p className="text-sm text-[#6A6A70] mt-1">
                Look at a distant object for 20 seconds to relax your eyes.
              </p>
            </div>

            <div className="p-4 bg-[#FFEAF2] border border-[#FFD1E3] rounded-xl">
              <h3 className="font-semibold text-[#E86CA8]">🔹 Posture Fix</h3>
              <p className="text-sm text-[#6A6A70] mt-1">
                Sit straight, relax shoulders, unclench jaw, breathe slowly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestion Box */}
      <div className="mt-16 text-center max-w-xl mx-auto">
        <button
          onClick={askAI}
          className="px-8 py-4 bg-[#46C7E8] text-white rounded-xl shadow hover:bg-[#34b4d3] transition"
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
