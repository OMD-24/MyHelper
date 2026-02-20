import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <span className="font-bold text-gray-900">
              Kaam<span className="text-primary-600">Setu</span>
            </span>
          </div>
          <p className="text-sm text-gray-500">
            Transforming free time into income & problems into
            opportunities.
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} KaamSetu. Built for Social Good.
          </p>
        </div>
      </div>
    </footer>
  );
}