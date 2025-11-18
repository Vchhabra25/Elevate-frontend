// frontend/src/components/AIHelper.js
import React, { useState } from "react";
import axios from "axios";

export default function AIHelper() {
  const [reply, setReply] = useState("");

  const getSuggestion = async () => {
    try {
      const focusMinutes = parseInt(localStorage.getItem("focusMinutes") || "0", 10);
      const res = await axios.get(`http://localhost:5000/ai/suggestion?focusMinutes=${focusMinutes}`);
      setReply(res.data.reply);
    } catch (err) {
      setReply("Could not fetch suggestion.");
    }
  };

  const analyzeReflection = async (text) => {
    try {
      const res = await axios.post("http://localhost:5000/ai/reflection/analyze", { text });
      setReply(res.data.reply);
    } catch (err) {
      setReply("Could not analyze reflection.");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h4 className="font-semibold">StudyBot</h4>
      <p className="text-sm text-gray-500 mb-2">Quick AI suggestions based on your data (no account required).</p>
      <div className="flex gap-2">
        <button onClick={getSuggestion} className="px-3 py-1 bg-[#7F5AF0] text-white rounded">Suggest</button>
        <button onClick={() => analyzeReflection(prompt("Paste your reflection to analyze:"))} className="px-3 py-1 bg-[#46C7E8] text-white rounded">Analyze Reflection</button>
      </div>
      {reply && <div className="mt-3 text-sm bg-[#FBFAFF] p-3 rounded">{reply}</div>}
    </div>
  );
}
