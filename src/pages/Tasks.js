import React from "react";
import Dashboard from "../components/Dashboard";
import { API } from "../config";


export default function Tasks() {
  return (
    <div className="relative pt-28 min-h-screen overflow-hidden bg-gradient-to-br from-[#F6F1FF] via-[#FBF9FF] to-[#EDE9F7] px-6">

      {/* 🌸 Animated Pastel Background Bubbles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-52 h-52 bg-[#E7D8FF] rounded-full blur-3xl opacity-40 animate-pulse top-10 left-[-20px]"></div>
        <div className="absolute w-64 h-64 bg-[#FBD9FF] rounded-full blur-3xl opacity-30 animate-ping right-[-40px] top-32"></div>
        <div className="absolute w-48 h-48 bg-[#CFE7FF] rounded-full blur-3xl opacity-40 animate-pulse bottom-10 left-1/3"></div>
      </div>

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-wide text-[#1A1A2E] drop-shadow-sm">
          Your Tasks <span className="animate-pulse">📚</span>
        </h1>
        <p className="text-[#7F7F90] mt-3 text-lg">
          Plan your subjects, track topics & stay ahead with structure.
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-[#E3DAF7] hover:shadow-[0_0_25px_rgba(127,90,240,0.15)] transition-all duration-300">
        <Dashboard />
      </div>

      {/* FOOTER SPACE */}
      <div className="h-10"></div>
    </div>
  );
}
