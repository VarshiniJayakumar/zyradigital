export default function Logo({ size = 36, dark = false }) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Logo image with white background pill so it's visible on any bg */}
      <div className="rounded-xl overflow-hidden bg-white p-1 shadow-sm flex-shrink-0"
        style={{ width: size + 8, height: size + 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/logo.png"
          alt="ZyraDigital"
          style={{ height: size, width: 'auto', display: 'block' }}
          className="object-contain"
        />
      </div>
      {/* Text beside logo */}
      <div className="leading-none hidden sm:block">
        <div className={`text-base font-extrabold tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
          <span className="text-blue-600">zyra</span>
          <span>digital</span>
        </div>
        <div className="text-[9px] text-slate-400 tracking-[0.15em] uppercase mt-0.5">Elevate Your Presence</div>
      </div>
    </div>
  );
}
