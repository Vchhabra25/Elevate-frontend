import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Reflections() {
  const [note, setNote] = useState("");
  const [reflections, setReflections] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // Load saved reflections
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reflections")) || [];
    setReflections(saved);
  }, []);

  // Daily friendly message
  useEffect(() => {
    const lines = [
      "You are growing — slowly but strongly 🌿",
      "Your journey matters. Keep going 🚀",
      "Every small step today builds tomorrow ✨",
      "You showed up — and that’s everything 💛",
    ];
    setFeedback(lines[Math.floor(Math.random() * lines.length)]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;

    const entry = {
      text: note,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const updated = [entry, ...reflections];
    localStorage.setItem("reflections", JSON.stringify(updated));
    setReflections(updated);
    setNote("");
  };

  // -------------------------------
  // AI ANALYSIS
  // -------------------------------
  const analyzeAI = async () => {
    if (!note.trim()) return alert("Write reflection first");

    try {
      setLoadingAI(true);
      const res = await axios.post("https://elevate-backend.onrender.com/ai/reflection/analyze", {
        text: note,
      });
      setAiResult(res.data.reply);
    } catch (e) {
      setAiResult("❌ AI could not analyze right now.");
    }
    setLoadingAI(false);
  };

  return (
    <div className="relative pt-28 min-h-screen px-6 bg-gradient-to-br from-[#F6F1FF] via-[#FBF9FF] to-[#EDE9F7]">

      {/* Animated Blobs */}
      <div className="absolute inset-0 -z-10 opacity-60">
        <div className="absolute w-48 h-48 bg-[#E7D8FF] rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-[#FFD7F5] rounded-full blur-3xl right-20 top-48 animate-ping"></div>
        <div className="absolute w-52 h-52 bg-[#CBE7FF] rounded-full blur-3xl bottom-20 left-1/3 animate-pulse"></div>
      </div>

      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-[#1A1A2E] drop-shadow">
          Daily Reflection Diary 📖
        </h1>
        <p className="text-center text-[#7A7A85] mt-3">{feedback}</p>

        {/* DIARY FORM */}
        <div className="mt-10 bg-white/80 backdrop-blur-xl border border-[#E6DAFB] shadow-xl rounded-3xl p-6">

          <form onSubmit={handleSubmit} className="space-y-4">

            <textarea
              rows="4"
              placeholder="Write about your day... emotions, productivity, challenges..."
              className="w-full p-4 rounded-xl border border-[#D8C8F2] bg-white/70 outline-none focus:ring-2 focus:ring-[#7F5AF0]"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 py-3 bg-[#7F5AF0] text-white rounded-xl font-medium hover:bg-[#6b47e0]"
              >
                Save Reflection
              </button>

              <button
                type="button"
                onClick={analyzeAI}
                className="flex-1 py-3 bg-[#46C7E8] text-white rounded-xl font-medium hover:bg-[#34b1cf]"
              >
                {loadingAI ? "Analyzing..." : "AI Analyze ✨"}
              </button>
            </div>
          </form>

          {/* AI RESULT */}
          {aiResult && (
            <div className="mt-6 p-4 bg-[#F0F7FF] border border-[#CDE2FF] rounded-xl shadow text-[#1A1A2E]">
              <h3 className="font-semibold mb-1 text-[#7F5AF0]">AI Insights 🤖</h3>
              <p className="text-sm leading-relaxed">{aiResult}</p>
            </div>
          )}
        </div>

        {/* PAST REFLECTIONS */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#1A1A2E] mb-4">
            Past Entries ✍️
          </h2>

          {reflections.length === 0 ? (
            <p className="text-[#7F7F90]">No entries yet.</p>
          ) : (
            <div className="space-y-4">
              {reflections.map((r, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/80 shadow border border-[#E6DAFB]"
                >
                  <div className="text-xs text-[#7A7A85]">
                    {r.date} — {r.time}
                  </div>
                  <div className="text-[#1A1A2E] mt-1 leading-relaxed">
                    {r.text}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="h-10"></div>
    </div>
  );
}
