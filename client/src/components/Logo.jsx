// SVG logo matching the ZyraDigital brand — blue ZD monogram + "zyra digital" text
export default function Logo({ size = 40 }) {
  return (
    <div className="flex items-center gap-2">
      {/* ZD icon */}
      <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* D background shape */}
        <path d="M38 8 H52 Q72 8 72 40 Q72 72 52 72 H38 Z" fill="#1E2A3A"/>
        {/* Z letter */}
        <polygon points="8,10 36,10 36,22 18,58 36,58 36,70 8,70 8,58 26,22 8,22" fill="#2563EB"/>
        {/* Chart bars */}
        <rect x="42" y="44" width="5" height="18" rx="1" fill="#3B82F6" opacity="0.7"/>
        <rect x="50" y="36" width="5" height="26" rx="1" fill="#3B82F6" opacity="0.85"/>
        <rect x="58" y="28" width="5" height="34" rx="1" fill="#3B82F6"/>
        {/* Arrow curve */}
        <path d="M42 46 Q55 30 66 18" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <polygon points="66,18 60,22 68,28" fill="#60A5FA"/>
      </svg>

      {/* Text */}
      <div className="leading-none">
        <div className="text-lg font-black tracking-tight">
          <span className="text-[#3B82F6]">zyra</span>
          <span className="text-[#1E2A3A] dark:text-[#94A3B8]"> digital</span>
        </div>
        <div className="text-[9px] text-[#64748B] tracking-[0.2em] uppercase">Elevate Your Presence</div>
      </div>
    </div>
  );
}
