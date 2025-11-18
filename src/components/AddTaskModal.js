import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({ subject: "", topic: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.topic) return alert("Please fill all fields");
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
      onClose();
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                Add New Task 📝
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                Fill details to add your study task.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Subject (e.g., Physics)"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                />
                <input
                  className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Topic (e.g., Thermodynamics)"
                  value={form.topic}
                  onChange={(e) =>
                    setForm({ ...form, topic: e.target.value })
                  }
                />
                <input
                  className="w-full p-3 border border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
                  placeholder="Time (e.g., 1hr / 30min)"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-md text-slate-500 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {loading ? "Adding..." : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
