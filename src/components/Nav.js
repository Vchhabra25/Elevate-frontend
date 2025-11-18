import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all ${
      location.pathname === path
        ? "bg-[#7F5AF0] text-white shadow-md"
        : "text-[#1B1B2F] hover:bg-[#EDE9F7] hover:text-[#7F5AF0]"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#EDE9F7] flex items-center justify-center">
            <span className="text-[#7F5AF0] font-bold text-lg">E</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#1B1B2F]">Elevate</h1>
            <p className="text-xs text-[#7F7F90]">Study • Focus • Grow</p>
          </div>
        </div>

        {/* Pages */}
        <div className="flex gap-3">
          <Link to="/" className={linkClass("/")}>Home</Link>
          <Link to="/tasks" className={linkClass("/tasks")}>Tasks</Link>
          <Link to="/focus" className={linkClass("/focus")}>Focus</Link>
          <Link to="/reflection" className={linkClass("/reflection")}>Reflection</Link>
          <Link to="/analytics" className={linkClass("/analytics")}>Analytics</Link>

          

          {/* ⭐ NEW PAGE */}
          <Link to="/groups" className={linkClass("/groups")}>Group Study</Link>
        </div>
      </div>
    </nav>
  );
}
