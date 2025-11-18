export default function AnimatedBg() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

      <div className="absolute w-80 h-80 bg-[#46C7E8]/20 rounded-full blur-3xl animate-[ping_10s_linear_infinite]
      left-10 top-20"></div>

      <div className="absolute w-96 h-96 bg-[#BFAFAF]/25 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite]
      right-20 top-40"></div>

      <div className="absolute w-72 h-72 bg-[#46C7E8]/15 rounded-full blur-3xl animate-[ping_14s_linear_infinite]
      bottom-20 left-1/3"></div>

    </div>
  );
}
