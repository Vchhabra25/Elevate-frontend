import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { API } from "../config";

// Register chart modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Analytics() {
  const [taskCount, setTaskCount] = useState(0);
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Fetch tasks
    fetch(`${API}/tasks`)

      .then((res) => res.json())
      .then((data) => setTaskCount(data.length))
      .catch(() => console.log("Tasks fetch failed"));

    setFocusMinutes(parseInt(localStorage.getItem("focusMinutes") || "0"));
    setStreak(JSON.parse(localStorage.getItem("reflections") || "[]").length);

    // Quotes 💜
    const q = [
      "Your discipline today becomes your power tomorrow.",
      "Every minute of focus compounds into greatness.",
      "You’re doing better than you think — trust yourself.",
      "Small steps today become big achievements tomorrow.",
      "Your journey is yours — and you're elevating beautifully.",
    ];
    setQuote(q[Math.floor(Math.random() * q.length)]);
  }, []);

  // GRAPH DATA
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Focus Hours",
        data: [1, 2, 1.5, 2.8, 3.1, 2.6, focusMinutes / 60],
        borderColor: "#7F5AF0",
        backgroundColor: "rgba(127, 90, 240, 0.15)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#7F5AF0",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Weekly Focus Trend",
        color: "#1B1B2F",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#7F7F90" },
      },
      x: {
        ticks: { color: "#7F7F90" },
      },
    },
  };

  return (
    <div className="relative pt-28 px-6 min-h-screen overflow-hidden bg-gradient-to-br from-[#F3EDFF] via-white to-[#EDE9F7]">

      {/* 🌸 Animated Pastel Bubbles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-64 h-64 bg-[#E7D8FF] rounded-full blur-3xl opacity-40 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-52 h-52 bg-[#FBD9FF] rounded-full blur-3xl opacity-30 right-10 top-40 animate-ping"></div>
        <div className="absolute w-72 h-72 bg-[#CFE7FF] rounded-full blur-3xl opacity-40 bottom-10 left-1/3 animate-pulse"></div>
      </div>

      {/* HEADER */}
      <h1 className="text-4xl font-bold text-[#1A1A2E] text-center drop-shadow-sm">
        Weekly Analytics 📊
      </h1>
      <p className="text-center text-[#7A7A85] mt-2">
        Understand your patterns. Improve your journey.
      </p>

      {/* QUOTE */}
      <p className="text-center text-[#7F5AF0] font-semibold italic mt-6 text-lg">
        “{quote}”
      </p>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12">
        <div className="p-6 bg-white/80 border border-[#E7DFFF] rounded-3xl shadow-lg text-center">
          <div className="text-4xl font-bold text-[#7F5AF0]">{taskCount}</div>
          <p className="text-[#7A7A85] mt-1">Tasks Added</p>
        </div>

        <div className="p-6 bg-white/80 border border-[#E7DFFF] rounded-3xl shadow-lg text-center">
          <div className="text-4xl font-bold text-[#7F5AF0]">
            {(focusMinutes / 60).toFixed(1)}h
          </div>
          <p className="text-[#7A7A85] mt-1">Focus Logged</p>
        </div>

        <div className="p-6 bg-white/80 border border-[#E7DFFF] rounded-3xl shadow-lg text-center">
          <div className="text-4xl font-bold text-[#7F5AF0]">🔥 {streak}</div>
          <p className="text-[#7A7A85] mt-1">Reflection Streak</p>
        </div>
      </div>

      {/* LINE CHART */}
      <div className="max-w-5xl mx-auto h-80 bg-white/80 border border-[#E7DFFF] shadow-xl rounded-3xl p-6 mt-12">
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* RESET BUTTON */}
      <div className="text-center mt-10 mb-10">
        <button
          onClick={() => {
            if (window.confirm("Reset all analytics?")) {
              localStorage.removeItem("focusMinutes");
              localStorage.removeItem("reflections");
              alert("Analytics reset! Refresh page.");
              window.location.reload();
            }
          }}
          className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition shadow-sm"
        >
          Reset Analytics
        </button>
      </div>
    </div>
  );
}
