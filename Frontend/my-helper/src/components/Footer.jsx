export default function Footer() {
  return (
    <footer className="border-t border-surface-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
              S
            </div>
            <span className="font-extrabold text-surface-800 tracking-tight">
              Saha<span className="text-gradient">yak</span>
            </span>
          </div>
          <p className="text-[13px] text-surface-400 text-center">
            Transforming free time into income & problems into opportunities.
          </p>
          <p className="text-[12px] text-surface-300">
            © {new Date().getFullYear()} Sahayak. Built for Social Good.
          </p>
        </div>
      </div>
    </footer>
  );
}