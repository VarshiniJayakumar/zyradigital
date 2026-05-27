export default function Logo({ size = 40 }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="ZyraDigital Logo"
        style={{ height: size, width: 'auto' }}
        className="object-contain"
      />
    </div>
  );
}
