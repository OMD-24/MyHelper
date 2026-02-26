import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center">
        <p className="text-8xl font-black text-gradient mb-6">404</p>
        <h1 className="text-2xl font-black text-surface-800 mb-2 tracking-tight">Page Not Found</h1>
        <p className="text-surface-400 mb-8 text-[15px]">The page you're looking for doesn't exist.</p>
        <Link to="/"
          className="inline-flex px-8 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-lg shadow-primary-500/25 transition text-[14px]">
          Go Home
        </Link>
      </div>
    </div>
  );
}