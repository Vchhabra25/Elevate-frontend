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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const STORAGE_KEY = "elevate_week_focus";
const WEEK_START_KEY = "elevate_week_start";

function getWeekDataOrInit() {
  const currentWeekStart = (() => {
    const d = new Date();
    const day = d.getDay();
    const diff = (day + 6) % 7;
    const monday = new Date(d);
    monday.setDate(d.getDate() - diff);
    monday.setHours(0, 0, 0, 0);
    return monday.toISOString();
  })();

  const storedWeekStart = localStorage.getItem(WEEK_START_KEY);
  if (storedWeekStart !== currentWeekStart) {
    const init = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
    localStorage.setItem(WEEK_START_KEY, currentWeekStart);
    return init;
  }
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const init = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
    return init;
  }
  try {
    return JSON.parse(raw);
  } catch {
    const init = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
    return init;
  }
}

export default function Analytics() {
  const [weekData, setWeekData] = useState(() => getWeekDataOrInit());
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  useEffect(() => {
    // update summary values
    const values = Object.values(weekData);
    const t = values.reduce((a, b) => a + (Number(b) || 0), 0);
    setTotal(t);
    setAvg(t / 7);
  }, [weekData]);

  useEffect(() => {
    // poll localStorage for changes every 1.5s so graph remains reactive across tabs
    const id = setInterval(() => {
      setWeekData(getWeekDataOrInit());
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = {
    labels,
    datasets: [
      {
        label: "Focus Minutes",
        data: labels.map((l) => weekData[l] || 0),
        borderColor: "#7F5AF0",
        backgroundColor: "rgba(127,90,240,0.15)",
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: "#7F5AF0",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Weekly Focus (minutes)",
        color: "#1B1B2F",
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} min`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `${value}m`;
          },
        },
      },
      x: {
        ticks: { color: "#7F7F90" },
      },
    },
  };

  return (
    <div className="relative pt-28 px-6 min-h-screen overflow-hidden bg-gradient-to-br from-[#F3EDFF] via-white to-[#EDE9F7]">
      <h1 className="text-4xl font-bold text-[#1A1A2E] text-center drop-shadow-sm">Weekly Analytics 📊</h1>
      <p className="text-center text-[#7A7A85] mt-2">Live focus minutes tracked per day (minutes)</p>

      <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/80 rounded-3xl border border-[#E7DFFF] shadow-lg text-center">
          <div className="text-3xl font-bold text-[#7F5AF0]">{total} min</div>
          <p className="text-[#7A7A85] mt-1">Total this week</p>
        </div>

        <div className="p-6 bg-white/80 rounded-3xl border border-[#E7DFFF] shadow-lg text-center">
          <div className="text-3xl font-bold text-[#7F5AF0]">{avg.toFixed(1)} min</div>
          <p className="text-[#7A7A85] mt-1">Average / day</p>
        </div>

        <div className="p-6 bg-white/80 rounded-3xl border border-[#E7DFFF] shadow-lg text-center">
          <div className="text-3xl font-bold text-[#7F5AF0]">
            {Object.values(weekData).filter((v) => v > 0).length}
          </div>
          <p className="text-[#7A7A85] mt-1">Active days</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto h-80 bg-white/80 border border-[#E7DFFF] shadow-xl rounded-3xl p-6 mt-8">
        <Line data={data} options={options} />
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => {
            // reset week manual
            const init = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(init));
            localStorage.setItem(WEEK_START_KEY, new Date().toISOString());
            setWeekData(init);
            alert("Week data reset.");
          }}
          className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100"
        >
          Reset Week
        </button>
      </div>

      <div className="h-16" />
    </div>
  );
}
