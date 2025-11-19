import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import { API } from "../config";

export default function GroupStudy() {
  const [code, setCode] = useState("");
  const [name, setName] = useState(localStorage.getItem("elevate_name") || "");
  const [group, setGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const pollRef = useRef(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => clearInterval(pollRef.current);
  }, []);

  // -----------------------------
  // CREATE GROUP
  // -----------------------------
  const createGroup = async () => {
    if (!name.trim()) return alert("Enter your name first");

    try {
      const res = await axios.post(`${API}/groups/create`, {
        name,
        creatorName: name,
      });

      setGroup(res.data.group);
      setCode(res.data.group.code);
      localStorage.setItem("elevate_name", name);
      startPoll(res.data.group.code);
    } catch {
      alert("Error creating group");
    }
  };

  // -----------------------------
  // JOIN GROUP
  // -----------------------------
  const joinGroup = async () => {
    if (!code.trim() || !name.trim()) {
      return alert("Enter both name and group code");
    }
    try {
      const res = await axios.post(`${API}/groups/join`, {
        code,
        name,
      });

      setGroup(res.data.group);
      localStorage.setItem("elevate_name", name);
      startPoll(code);
    } catch {
      alert("Unable to join group");
    }
  };

  // -----------------------------
  // POLLING MESSAGES
  // -----------------------------
  const startPoll = (c) => {
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => fetchMessages(c), 1500);
  };

  const fetchMessages = async (c) => {
    try {
      const res = await axios.get(`${API}/groups/${c}/messages`);
      setMessages(res.data.messages || []);
    } catch {}
  };

  // -----------------------------
  // SEND MESSAGE
  // -----------------------------
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      await axios.post(`${API}/groups/${group.code}/messages`, {
        author: name,
        text,
        emoji: "💬",
      });

      setText("");
      fetchMessages(group.code);
    } catch {}
  };

  // -----------------------------
  // AI BOT
  // -----------------------------
  const askAI = async (prompt) => {
    try {
      const res = await axios.post(`${API}/ai/chat`, {
        prompt,
        groupCode: group.code,
      });

      await axios.post(`${API}/groups/${group.code}/messages`, {
        author: "StudyBot",
        text: res.data.reply,
        emoji: "🤖",
      });

      fetchMessages(group.code);
    } catch {}
  };

  // -----------------------------
  // UPDATE FOCUS MINUTES
  // -----------------------------
  const updateFocus = async (mins = 25) => {
    try {
      await axios.post(`${API}/groups/${group.code}/member/focus`, {
        name,
        addMinutes: mins,
      });

      const refreshed = (await axios.get(`${API}/groups/${group.code}`)).data
        .group;

      setGroup(refreshed);
    } catch {}
  };

  // -----------------------------
  // BADGES
  // -----------------------------
  const badge = (m) => {
    const x = m.focusMinutes || 0;
    if (x >= 300) return "🌟 Elite";
    if (x >= 150) return "🔥 Grinder";
    if (x >= 60) return "⭐ Pro";
    if (x >= 20) return "🔰 Starter";
    return "🟢 New";
  };

  // -----------------------------
  // UI RETURN
  // -----------------------------
  return (
    <div className="relative pt-28 px-6 min-h-screen bg-gradient-to-br from-[#F6F1FF] via-[#FBF9FF] to-[#EDE9F7]">

      {/* Animated BG */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-48 h-48 bg-[#E7D8FF] blur-3xl rounded-full opacity-40 top-24 left-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-[#FFD8F0] blur-3xl rounded-full opacity-30 top-48 right-10 animate-ping"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl text-center font-extrabold text-[#1A1A2E]">
          Group Study 🤝
        </h1>
        <p className="text-center text-[#7A7A85] mt-2 mb-10">
          Collaborate • Chat • Track Progress • AI Support
        </p>

        {/* ------------------------------ */}
        {/* SETUP (NOT IN GROUP) */}
        {/* ------------------------------ */}
        {!group && (
          <div className="grid md:grid-cols-2 gap-6">

            {/* NAME */}
            <div className="p-6 bg-white/80 rounded-3xl shadow-xl border border-[#E6DAFB]">
              <h3 className="text-xl font-semibold text-[#1A1A2E] mb-4">👤 Your Name</h3>
              <input
                className="w-full p-3 border rounded-xl border-[#D8C8F2] bg-white/70 outline-none focus:ring-2 focus:ring-[#7F5AF0]"
                placeholder="Enter display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* JOIN / CREATE */}
            <div className="p-6 bg-white/80 rounded-3xl shadow-xl border border-[#E6DAFB]">
              <h3 className="text-xl font-semibold text-[#1A1A2E] mb-3">
                🔗 Join or Create Group
              </h3>

              <div className="flex gap-2 mb-3">
                <button
                  onClick={createGroup}
                  className="px-4 py-3 bg-[#7F5AF0] text-white rounded-xl hover:bg-[#6b47e0]"
                >
                  Create
                </button>

                <input
                  className="flex-1 p-3 border rounded-xl border-[#D8C8F2] bg-white/70"
                  placeholder="Enter Group Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                />

                <button
                  onClick={joinGroup}
                  className="px-4 py-3 bg-[#46C7E8] text-white rounded-xl hover:bg-[#35b2d2]"
                >
                  Join
                </button>
              </div>

              <p className="text-sm text-[#7A7A85]">
                After joining → Chat, track progress, ask AI.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------ */}
        {/* MAIN GROUP UI */}
        {/* ------------------------------ */}
        {group && (
          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {/* LEFT: MEMBERS */}
            <div className="p-5 bg-white/80 rounded-3xl shadow-xl border border-[#E6DAFB]">
              <h3 className="text-xl font-semibold text-[#1A1A2E] mb-3">
                Members • {group.code}
              </h3>

              <button
                onClick={() => navigator.clipboard.writeText(group.code)}
                className="text-sm underline text-[#7F5AF0]"
              >
                Copy Code
              </button>

              <div className="space-y-4 mt-4">
                {group.members.map((m, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-3 rounded-xl bg-[#F8F5FF] border border-[#E8D9FF]"
                  >
                    <div>
                      <div className="font-semibold">{m.name}</div>
                      <div className="text-xs text-[#7A7A85]">{m.focusMinutes || 0} min</div>
                    </div>
                    <div>{badge(m)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => updateFocus(25)}
                  className="w-full py-3 bg-[#7F5AF0] text-white rounded-xl mb-2 hover:bg-[#6b47e0]"
                >
                  Log 25 min
                </button>

                <button
                  onClick={() =>
                    askAI("Motivate the group in one sentence")
                  }
                  className="w-full py-3 bg-[#46C7E8] text-white rounded-xl hover:bg-[#34b4d3]"
                >
                  Ask StudyBot 🤖
                </button>
              </div>
            </div>

            {/* RIGHT: CHAT */}
            <div className="md:col-span-2 p-5 bg-white/80 rounded-3xl shadow-xl border border-[#E6DAFB] flex flex-col">
              <div className="flex-1 overflow-auto pr-2" style={{ maxHeight: "60vh" }}>
                {messages.map((msg, idx) => {
                  const mine = msg.author === name;
                  const isBot = msg.author === "StudyBot";

                  return (
                    <div key={idx} className={`mb-3 ${mine ? "text-right" : "text-left"}`}>
                      <div
                        className={`inline-block max-w-[80%] p-3 rounded-2xl border ${
                          isBot
                            ? "bg-[#F0F7FF] border-[#CFE3FF]"
                            : mine
                            ? "bg-[#DDEAFE] border-[#BBD0FF]"
                            : "bg-[#F8F8FB] border-[#E6E6EF]"
                        }`}
                      >
                        <div className="text-xs text-[#7A7A85] mb-1">
                          {msg.author} {msg.emoji}
                        </div>
                        <div className="text-[#1A1A2E]">{msg.text}</div>
                        <div className="text-[10px] text-[#999] mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  className="flex-1 p-3 rounded-xl border border-[#D8C8F2] bg-white/70"
                  placeholder="Type message..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="px-6 py-3 bg-[#7F5AF0] text-white rounded-xl hover:bg-[#6b47e0]"
                >
                  Send
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      <div className="h-16"></div>
    </div>
  );
}
