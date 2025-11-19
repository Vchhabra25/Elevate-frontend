import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { API } from "../config";

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [form, setForm] = useState({ subject: "", topic: "", time: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject || !form.topic) return alert("Please fill all fields");

    setLoading(true);

    try {
      const res = await fetch(`${API}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      onAdd(data.task);
      setForm({ subject: "", topic: "", time: "" });
      onClose();
    } catch (err) {
      alert("Failed to add task. Backend may be off.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-semibold">Add New Task 📝</h2>

              <form onSubmit={handleSubmit} className="space-y-3 mt-4">
                <input
                  className="w-full p-3 border rounded-md"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <input
                  className="w-full p-3 border rounded-md"
                  placeholder="Topic"
                  value={form.topic}
                  onChange={(e) => setForm({ ...form, topic: e.target.value })}
                />
                <input
                  className="w-full p-3 border rounded-md"
                  placeholder="Time"
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                />

                <div className="flex justify-end gap-3 mt-4">
                  <button onClick={onClose} type="button" className="px-4 py-2">
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
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
