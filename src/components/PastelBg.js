export default function PastelBg() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

      {/* Lavender Blob */}
      <div className="absolute w-72 h-72 bg-[#EDE8FF] rounded-full blur-3xl opacity-50 animate-[float_12s_ease-in-out_infinite]
      left-10 top-20"></div>

      {/* Mauve Blob */}
      <div className="absolute w-96 h-96 bg-[#E9D1F9] rounded-full blur-3xl opacity-40 animate-[float_15s_ease-in-out_infinite]
      right-10 top-40"></div>

      {/* Ice Blue Blob */}
      <div className="absolute w-64 h-64 bg-[#C4E7FF] rounded-full blur-3xl opacity-40 animate-[float_18s_ease-in-out_infinite]
      bottom-20 left-1/3"></div>

    </div>
  );
}
