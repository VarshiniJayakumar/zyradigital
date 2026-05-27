export default function Logo({ size = 36, dark = false }) {
  return (
    <img
      src="/logo.png"
      alt="ZyraDigital"
      style={{ height: size, width: 'auto' }}
      className="object-contain"
    />
  );
}
