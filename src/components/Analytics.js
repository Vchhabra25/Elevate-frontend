import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { API } from "../config";

export default function Analytics() {
  const [weekData, setWeekData] = useState({
    Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0,
  });
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);

  // Fetch and compute weekly data
  useEffect(() => {
    const fetchSessions = async () => {
      const res = await axios.get(`${API}/focus`);
      const sessions = res.data;

      const week = {
        Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0,
      };

      sessions.forEach((s) => {
        const day = new Date(s.date).getDay();
        const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        week[names[day]] += s.duration;
      });

      setWeekData(week);

      const t = Object.values(week).reduce((a, b) => a + b, 0);
      setTotal(t);
      setAvg(t / 7);
    };

    fetchSessions();
  }, []);

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Minutes",
        data: labels.map((l) => weekData[l]),
        borderColor: "#7F5AF0",
        backgroundColor: "rgba(127,90,240,0.25)",
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  return (
    <div className="pt-28 px-6 min-h-screen bg-gradient-to-br from-[#F3EDFF] via-white to-[#EDE9F7]">
      <h1 className="text-4xl font-bold text-center text-[#1A1A2E]">Weekly Analytics 📊</h1>

      <div className="max-w-6xl mx-auto mt-10 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white/80 rounded-3xl text-center shadow-lg">
          <div className="text-3xl font-bold text-[#7F5AF0]">{total} min</div>
          <p>Total this week</p>
        </div>

        <div className="p-6 bg-white/80 rounded-3xl text-center shadow-lg">
          <div className="text-3xl font-bold text-[#7F5AF0]">{avg.toFixed(1)} min</div>
          <p>Average per day</p>
        </div>

        <div className="p-6 bg-white/80 rounded-3xl text-center shadow-lg">
          <div className="text-3xl font-bold text-[#7F5AF0]">
            {Object.values(weekData).filter((v) => v > 0).length}
          </div>
          <p>Active days</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-10 h-80 bg-white/80 rounded-3xl shadow p-6">
        <Line data={data} />
      </div>
    </div>
  );
}
