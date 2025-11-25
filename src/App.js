// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import FocusPage from "./pages/FocusPage";
import Reflection from "./pages/Reflections";
import Analytics from "./components/Analytics";
import Nav from "./components/Nav";
import MusicPlayer from "./components/MusicPlayer";
import GroupStudy from "./pages/GroupStudy";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/focus" element={<FocusPage />} />
          <Route path="/reflection" element={<Reflection />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/groups" element={<GroupStudy />} />
        </Routes>
        <MusicPlayer />
      </div>
    </Router>
  );
}

export default App;
