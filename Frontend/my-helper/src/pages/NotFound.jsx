import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 animate-fade-in">
      <div className="text-center">
        <p className="text-7xl font-extrabold text-primary-600 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}