import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-[#1E3A5F] py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo size={32} />
        <p className="text-slate-500 text-sm text-center">
          © 2025 ZyraDigital. All rights reserved. Tamil Nadu, India.
        </p>
        <p className="text-slate-600 text-xs">AI Integrated Digital Marketing Academy</p>
      </div>
    </footer>
  );
}
