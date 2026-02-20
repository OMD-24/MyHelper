import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlinePlusCircle,
  HiOutlineClipboardDocumentList,
  HiOutlineUserCircle,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  const navLink = (to, icon, label) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
          active
            ? "bg-primary-50 text-primary-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
              K
            </div>
            <span className="font-bold text-xl text-gray-900">
              Kaam<span className="text-primary-600">Setu</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated ? (
              <>
                {navLink(
                  "/dashboard",
                  <HiOutlineSquares2X2 className="w-4 h-4" />,
                  "Dashboard"
                )}

                {navLink(
                  "/post-task",
                  <HiOutlinePlusCircle className="w-4 h-4" />,
                  "Post Task"
                )}

                {navLink(
                  "/my-tasks",
                  <HiOutlineClipboardDocumentList className="w-4 h-4" />,
                  "My Tasks"
                )}

                {navLink(
                  "/profile",
                  <HiOutlineUserCircle className="w-4 h-4" />,
                  "Profile"
                )}

                <div className="w-px h-6 bg-gray-200 mx-2" />

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-primary-600 font-medium">
                      {user?.role === "WORKER" ? "Worker" : "Help Seeker"}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                    title="Logout"
                  >
                    <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {open ? (
              <HiOutlineXMark className="w-6 h-6" />
            ) : (
              <HiOutlineBars3 className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 animate-slide-up">
            <div className="flex flex-col gap-1">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-primary-50 rounded-xl">
                    <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs text-primary-600">
                        {user?.role === "WORKER" ? "Worker" : "Help Seeker"}
                      </p>
                    </div>
                  </div>

                  {navLink(
                    "/dashboard",
                    <HiOutlineSquares2X2 className="w-5 h-5" />,
                    "Dashboard"
                  )}

                  {navLink(
                    "/post-task",
                    <HiOutlinePlusCircle className="w-5 h-5" />,
                    "Post Task"
                  )}

                  {navLink(
                    "/my-tasks",
                    <HiOutlineClipboardDocumentList className="w-5 h-5" />,
                    "My Tasks"
                  )}

                  {navLink(
                    "/profile",
                    <HiOutlineUserCircle className="w-5 h-5" />,
                    "Profile"
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 mt-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                  >
                    <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="px-3 py-2.5 text-center text-white bg-primary-600 rounded-xl text-sm font-medium"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 