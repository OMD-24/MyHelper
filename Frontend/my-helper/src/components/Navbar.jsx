import { useState, useEffect } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/dashboard", icon: <HiOutlineSquares2X2 className="w-[18px] h-[18px]" />, label: "Dashboard" },
    { to: "/post-task", icon: <HiOutlinePlusCircle className="w-[18px] h-[18px]" />, label: "Post Task" },
    { to: "/my-tasks", icon: <HiOutlineClipboardDocumentList className="w-[18px] h-[18px]" />, label: "My Tasks" },
    { to: "/profile", icon: <HiOutlineUserCircle className="w-[18px] h-[18px]" />, label: "Profile" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-surface-200/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow">
              S
            </div>
            <span className="font-extrabold text-xl text-surface-800 tracking-tight">
              Saha<span className="text-gradient">yak</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isAuthenticated ? (
              <>
                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 ${
                      isActive(item.to)
                        ? "bg-primary-50 text-primary-700 shadow-sm shadow-primary-100"
                        : "text-surface-500 hover:text-surface-800 hover:bg-surface-100"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}

                <div className="w-px h-8 bg-surface-200 mx-3" />

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-[13px] font-bold text-surface-800 leading-tight">
                      {user?.name}
                    </p>
                    <p className="text-[11px] font-semibold text-primary-500 uppercase tracking-wider">
                      {user?.role === "WORKER" ? "Worker" : "Seeker"}
                    </p>
                  </div>
                  <div className="w-9 h-9 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-primary-700 font-bold text-sm">
                    {user?.name?.[0]}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-surface-400 hover:text-accent-500 hover:bg-accent-50 rounded-xl transition-all duration-200"
                    title="Logout"
                  >
                    <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 text-[13px] font-semibold text-surface-600 hover:text-surface-800 transition"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-[13px] font-bold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 rounded-xl shadow-md shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-xl transition"
          >
            {open ? <HiOutlineXMark className="w-6 h-6" /> : <HiOutlineBars3 className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-5 pt-2 animate-slide-up">
            {isAuthenticated ? (
              <div className="flex flex-col gap-1">
                {/* User Card */}
                <div className="flex items-center gap-3 px-4 py-3.5 mb-3 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-2xl border border-primary-100">
                  <div className="w-11 h-11 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                    {user?.name?.[0]}
                  </div>
                  <div>
                    <p className="font-bold text-surface-800">{user?.name}</p>
                    <p className="text-[11px] font-semibold text-primary-500 uppercase tracking-wider">
                      {user?.role === "WORKER" ? "Worker" : "Seeker"}
                    </p>
                  </div>
                </div>

                {navItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive(item.to)
                        ? "bg-primary-50 text-primary-700"
                        : "text-surface-600 hover:bg-surface-100 hover:text-surface-800"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                ))}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 mt-2 text-accent-600 hover:bg-accent-50 rounded-xl transition text-sm font-semibold"
                >
                  <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/login"
                  className="px-4 py-3 text-surface-600 hover:bg-surface-100 rounded-xl text-sm font-semibold text-center"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl text-sm font-bold text-center shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}