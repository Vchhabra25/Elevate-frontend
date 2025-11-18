// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from "react";

/*  
  ELEVATE DASHBOARD (UPGRADED UI)
  -------------------------------
  ✨ New Additions:
  - Soft pastel card backgrounds
  - Rounded glass panels
  - Modern task list with timers
  - Improved focus timer UI
  - Better spacing & readability
  - Mobile-responsive layout
*/

// -------------------- FOCUS TIMER --------------------
function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let t;
    if (isRunning && timeLeft > 0) {
      t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    } else if (timeLeft === 0) {
      alert("🎯 Focus session complete! +25 mins logged.");
      const total = parseInt(localStorage.getItem("focusMinutes") || "0", 10);
      localStorage.setItem("focusMinutes", total + 25);
    }
    return () => clearInterval(t);
  }, [isRunning, timeLeft]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="bg-white/80 p-4 rounded-2xl shadow border border-[#E6DFFF] text-center">
      <h3 className="font-semibold text-[#1B1B2F] mb-2">⏱ Focus Timer</h3>

      <div className="text-3xl font-bold text-[#7F5AF0] tracking-widest mb-3">
        {mins}:{secs}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-1 bg-[#7F5AF0] text-white rounded-lg"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(25 * 60);
          }}
          className="px-4 py-1 border border-[#C9C2D9] text-[#1B1B2F] rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// -------------------- ADD TASK CARD --------------------
function AddTaskCard({ onAdd }) {
  const [form, setForm] = useState({ subject: "", topic: "", time: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.topic) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      onAdd(data.task);
      setForm({ subject: "", topic: "", time: "" });
    } catch (err) {
      alert("Backend not running");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white/80 p-6 rounded-2xl shadow border border-[#E6DFFF]">
      <h2 className="text-xl font-semibold text-[#1B1B2F]">Add a Task</h2>
      <p className="text-sm text-[#7F7F90] mb-4">Subject, topic & time</p>

      <form onSubmit={submit} className="space-y-3">
        <input
          placeholder="Subject (e.g. Math)"
          className="w-full p-3 rounded-xl border border-[#D6CCE9] outline-none"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <input
          placeholder="Topic (e.g. Arrays)"
          className="w-full p-3 rounded-xl border border-[#D6CCE9]"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        />
        <input
          placeholder="Time (e.g. 45 min)"
          className="w-full p-3 rounded-xl border border-[#D6CCE9]"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <button
          disabled={loading}
          className="w-full bg-[#7F5AF0] text-white py-2 rounded-xl hover:bg-[#6A47D8]"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}

// -------------------- TASK LIST --------------------
function TaskList({ tasks, onDelete }) {
  const [active, setActive] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let t;
    if (running) {
      t = setInterval(() => setElapsed((p) => p + 1), 1000);
    }
    return () => clearInterval(t);
  }, [running]);

  const toggleTimer = (id) => {
    if (active === id) setRunning(!running);
    else {
      setActive(id);
      setElapsed(0);
      setRunning(true);
    }
  };

  const stop = () => {
    setRunning(false);

    const mins = Math.floor(elapsed / 60);
    const total = parseInt(localStorage.getItem("focusMinutes") || "0", 10);
    localStorage.setItem("focusMinutes", total + mins);

    alert(`⏱ +${mins} minutes added`);

    setActive(null);
    setElapsed(0);
  };

  const format = (sec) =>
    String(Math.floor(sec / 60)).padStart(2, "0") +
    ":" +
    String(sec % 60).padStart(2, "0");

  return (
    <div className="bg-white/80 p-6 rounded-2xl shadow border border-[#E6DFFF]">
      <h2 className="text-xl font-semibold text-[#1B1B2F]">Today's Tasks</h2>

      <ul className="mt-4 space-y-4">
        {tasks.map((t) => (
          <li
            key={t._id}
            className={`p-4 rounded-xl border ${
              active === t._id
                ? "bg-[#F3EDFF] border-[#CFC2FF]"
                : "border-[#E6DFFF] bg-white"
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium text-[#1B1B2F]">
                  {t.subject} •{" "}
                  <span className="text-sm text-[#7F7F90]">{t.topic}</span>
                </div>
                <div className="text-xs text-[#7F7F90]">{t.time}</div>

                {active === t._id && (
                  <p className="text-[#7F5AF0] font-semibold mt-1">
                    {format(elapsed)}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {active === t._id ? (
                  <>
                    <button
                      onClick={() => toggleTimer(t._id)}
                      className="bg-[#7F5AF0] text-white px-3 py-1 rounded-lg"
                    >
                      {running ? "Pause" : "Resume"}
                    </button>
                    <button
                      onClick={stop}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-lg"
                    >
                      Stop
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleTimer(t._id)}
                    className="px-3 py-1 border rounded-lg text-[#1B1B2F]"
                  >
                    Start
                  </button>
                )}
                <button
                  onClick={() => onDelete(t._id)}
                  className="px-3 py-1 bg-red-100 text-red-600 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}

        {tasks.length === 0 && (
          <p className="text-center text-[#7F7F90]">No tasks added yet.</p>
        )}
      </ul>
    </div>
  );
}

// -------------------- MAIN DASHBOARD --------------------
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  useEffect(() => {
    fetch("https://elevate-backend.onrender.com/tasks")
      .then((r) => r.json())
      .then((d) => setTasks(d));
  }, []);

  const addLocal = (t) => setTasks((p) => [...p, t]);
  const deleteLocal = (id) => setTasks((p) => p.filter((t) => t._id !== id));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left */}
      <div className="space-y-6">
        <AddTaskCard onAdd={addLocal} />
      </div>

      {/* Right */}
      <div className="md:col-span-2 space-y-6">
        <TaskList tasks={tasks} onDelete={deleteLocal} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FocusTimer />
          <div className="bg-white/80 p-4 rounded-2xl shadow border border-[#E6DFFF]">
            <h3 className="font-semibold text-[#1B1B2F] mb-1">Reflection</h3>
            <p className="text-sm text-[#7F7F90]">Write a short diary today ✍️</p>
          </div>
          <div className="bg-white/80 p-4 rounded-2xl shadow border border-[#E6DFFF]">
            <h3 className="font-semibold text-[#1B1B2F] mb-1">Journey</h3>
            <p className="text-sm text-[#7F7F90]">Milestones coming soon 🌱</p>
          </div>
        </div>
      </div>
    </div>
  );
}
