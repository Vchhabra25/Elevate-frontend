import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../config";

export default function Focus() {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);
  const [aiReply, setAiReply] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // --------------------------
  // SAVE SESSION TO BACKEND ✔
  // --------------------------
  const saveSessionToBackend = async (mins) => {
    try {
      await axios.post(`${API}/focus`, { duration: mins });
      console.log("Focus session saved to backend");
    } catch (err) {
      console.log("Backend unreachable");
    }
  };

  // --------------------------
  // UPDATE WEEKLY ANALYTICS ✔
  // --------------------------
  const logFocusSession = (mins) => {
    const STORAGE_KEY = "elevate_week_focus";
    const WEEK_START_KEY = "elevate_week_start";

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = dayNames[new Date().getDay()];

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

    data[today] += mins;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(WEEK_START_KEY, new Date().toISOString());

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  // --------------------------
  // TIMER LOGIC ✔
  // --------------------------
  useEffect(() => {
    let x;
    if (running && time > 0) {
      x = setInterval(() => setTime((t) => t - 1), 1000);
    }

    if (running && time === 0) {
      setRunning(false);

      // local + backend save
      logFocusSession(25);
      saveSessionToBackend(25);

      setTime(1500);
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

      {showSuccess && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg animate-fadeIn">
          ✔ Session added to analytics!
        </div>
      )}

      <h1 className="text-4xl font-extrabold text-center text-[#1A1A2E] drop-shadow-sm">
        Focus Mode 🎧
      </h1>
      <p className="text-center text-[#7A7A85] mt-2">
        Stay calm. Stay consistent. Stay focused.
      </p>

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

      {/* MUSIC + EXERCISES remain same */}
      {/* (No change required here) */}

      {/* AI Section */}
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
