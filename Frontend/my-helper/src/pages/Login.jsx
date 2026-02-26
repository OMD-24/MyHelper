import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone || !password) { toast.error("Please fill all fields"); return; }
    setLoading(true);
    try {
      await login(phone, password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || "Login failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    setLoading(true);
    try {
      const creds = role === "WORKER"
        ? { phone: "9876543210", pass: "password" }
        : { phone: "9876543211", pass: "password" };
      await login(creds.phone, creds.pass);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-5 shadow-xl shadow-primary-500/25">
            S
          </div>
          <h1 className="text-2xl font-black text-surface-800 tracking-tight">Welcome Back</h1>
          <p className="text-surface-400 mt-1.5 text-[14px]">Log in to your Sahayak account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-surface-900/5 border border-surface-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[13px] font-bold text-surface-700 mb-2">Phone Number</label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring"
                  maxLength={10}
                />
              </div>
            </div>

            <div>
              <label className="block text-[13px] font-bold text-surface-700 mb-2">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-300 hover:text-surface-500 transition">
                  {showPass ? <HiOutlineEyeSlash className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 text-[14px]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in…
                </span>
              ) : "Log in"}
            </button>
          </form>

          {/* Demo buttons */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-100" /></div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white text-[12px] font-semibold text-surface-300 uppercase tracking-wider">Quick Demo</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => demoLogin("SEEKER")} disabled={loading}
                className="flex-1 py-3 border-2 border-primary-100 text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition text-[13px] disabled:opacity-50">
                👤 Help Seeker
              </button>
              <button onClick={() => demoLogin("WORKER")} disabled={loading}
                className="flex-1 py-3 border-2 border-success-100 text-success-700 font-bold rounded-xl hover:bg-success-50 transition text-[13px] disabled:opacity-50">
                🔧 Worker
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-[13px] text-surface-400 mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary-600 font-bold hover:text-primary-500 transition">Register here</Link>
        </p>
      </div>
    </div>
  );
}