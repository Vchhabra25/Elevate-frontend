import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#F6F1FF] via-[#FBF9FF] to-[#EDE9F7] min-h-screen">

      {/* 🌸 Soft Animated Pastel Background Bubbles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-48 h-48 bg-[#E5D4FF] rounded-full blur-3xl opacity-40 animate-pulse left-10 top-20"></div>
        <div className="absolute w-72 h-72 bg-[#FFD8F0] rounded-full blur-3xl opacity-40 animate-ping right-20 top-40"></div>
        <div className="absolute w-60 h-60 bg-[#D4ECFF] rounded-full blur-3xl opacity-40 animate-pulse bottom-10 left-1/3"></div>
      </div>

      {/* =================== HERO SECTION =================== */}
      <header className="pt-32 pb-16 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-5xl md:text-6xl font-extrabold text-[#1A1A2E] drop-shadow-sm"
        >
          Welcome to <span className="text-[#7F5AF0]">Elevate</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[#6A6A70] mt-4 text-lg max-w-2xl mx-auto"
        >
          Plan smart. Focus deep. Reflect better.  
          Your personal dashboard for calm, consistent productivity ✨
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/focus"
            className="bg-[#7F5AF0] text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#6C47DC] transition"
          >
            🎧 Start Focusing
          </Link>

          <Link
            to="/tasks"
            className="bg-white text-[#7F5AF0] px-7 py-3 rounded-xl font-semibold border border-[#DCCBFF] hover:bg-[#F7F2FF] transition"
          >
            🗓️ View Tasks
          </Link>
        </motion.div>
      </header>

      {/* =================== IMPORTANCE SECTION (Pastel Block) =================== */}
      <section className="relative px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto bg-white/60 backdrop-blur-xl shadow-xl 
                     rounded-3xl p-10 border border-[#EADBFF]"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1A1A2E] mb-10">
            Why Elevate Matters 🌿
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-center">

            {/* Motivation */}
            <div className="bg-[#F4EAFF] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#7F5AF0] mb-3">Motivation</h3>
              <p className="text-[#5F5F70] leading-relaxed">
                Motivation builds consistency—your “why” keeps you showing up, even on low-energy days.
              </p>
            </div>

            {/* Focus */}
            <div className="bg-[#EAF2FF] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#3E6CE8] mb-3">Focus</h3>
              <p className="text-[#5F5F70] leading-relaxed">
                Deep focus cuts distractions and increases study quality—learn more in less time.
              </p>
            </div>

            {/* Planning */}
            <div className="bg-[#FFEAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-[#E86CA8] mb-3">Planning</h3>
              <p className="text-[#5F5F70] leading-relaxed">
                A planned routine reduces stress, gives direction, and keeps your progress on track.
              </p>
            </div>

          </div>
        </motion.div>
      </section>

      {/* =================== MOTIVATION IMAGE SECTION =================== */}
      <section className="relative mt-16 mb-10">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-50"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80)",
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80"></div>

        <div className="relative max-w-3xl mx-auto text-center text-white px-6 py-32">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-4xl font-bold mb-5"
          >
            Study With Purpose 🌟
          </motion.h2>

          <p className="text-lg opacity-90 max-w-xl mx-auto leading-relaxed">
            When motivation, focus, and planning come together—you stop studying in chaos and start studying with clarity.
          </p>
        </div>
      </section>

      {/* =================== FOOTER =================== */}
      <footer className="py-10 bg-white border-t border-[#E5D9FA] mt-10">
        <div className="text-center">

          <h3 className="text-lg font-semibold text-[#1A1A2E] mb-3">
            Connect With Me 💬
          </h3>

          <div className="flex justify-center gap-6 text-xl">
            <a
              href="https://instagram.com/"
              target="_blank"
              className="text-pink-600 hover:text-pink-700 transition"
            >
              🌸 Instagram
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              className="text-blue-600 hover:text-blue-700 transition"
            >
              💼 LinkedIn
            </a>
          </div>

          <p className="text-[#7A7A85] text-sm mt-4">
            © 2025 Elevate — Built to help students grow.
          </p>
        </div>
      </footer>
    </div>
  );
}
