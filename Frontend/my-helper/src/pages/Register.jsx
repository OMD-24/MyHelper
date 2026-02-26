import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineWrenchScrewdriver,
  HiOutlineHandRaised,
} from "react-icons/hi2";

export default function Register() {
  const [form, setForm] = useState({ name: "", phone: "", password: "", role: "", skills: [] });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));
  const toggleSkill = (s) =>
    setForm((p) => ({
      ...p,
      skills: p.skills.includes(s) ? p.skills.filter((x) => x !== s) : [...p.skills, s],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.password || !form.role) { toast.error("Please fill all required fields"); return; }
    if (form.phone.length !== 10) { toast.error("Phone must be 10 digits"); return; }
    if (form.password.length < 6) { toast.error("Password must be at least 6 characters"); return; }

    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        phone: form.phone,
        password: form.password,
        role: form.role,
        skills: form.role === "WORKER" ? form.skills : [],
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const data = err.response?.data;
      let msg = "Registration failed";
      if (typeof data === "string") msg = data;
      else if (data?.message) msg = data.message;
      else if (typeof data === "object") { const v = Object.values(data)[0]; if (v) msg = v; }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-surface-800 tracking-tight">Join Sahayak</h1>
          <p className="text-surface-400 mt-1.5 text-[14px]">Start helping or earning in your community</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-surface-900/5 border border-surface-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role */}
            <div>
              <label className="block text-[13px] font-bold text-surface-700 mb-3">I want to… *</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => update("role", "SEEKER")}
                  className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 ${
                    form.role === "SEEKER"
                      ? "border-primary-400 bg-primary-50 shadow-md shadow-primary-100"
                      : "border-surface-200 hover:border-surface-300"
                  }`}>
                  <HiOutlineHandRaised className={`w-8 h-8 mx-auto mb-2.5 ${form.role === "SEEKER" ? "text-primary-600" : "text-surface-300"}`} />
                  <p className={`font-bold text-[14px] ${form.role === "SEEKER" ? "text-primary-700" : "text-surface-500"}`}>Get Help</p>
                  <p className="text-[12px] text-surface-400 mt-0.5">Post tasks</p>
                </button>
                <button type="button" onClick={() => update("role", "WORKER")}
                  className={`p-5 rounded-2xl border-2 text-center transition-all duration-200 ${
                    form.role === "WORKER"
                      ? "border-success-400 bg-success-50 shadow-md shadow-success-100"
                      : "border-surface-200 hover:border-surface-300"
                  }`}>
                  <HiOutlineWrenchScrewdriver className={`w-8 h-8 mx-auto mb-2.5 ${form.role === "WORKER" ? "text-success-600" : "text-surface-300"}`} />
                  <p className={`font-bold text-[14px] ${form.role === "WORKER" ? "text-success-700" : "text-surface-500"}`}>Earn Money</p>
                  <p className="text-[12px] text-surface-400 mt-0.5">Do tasks</p>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-[13px] font-bold text-surface-700 mb-2">Full Name *</label>
              <div className="relative">
                <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[13px] font-bold text-surface-700 mb-2">Phone Number *</label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                  placeholder="10-digit phone number" maxLength={10}
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-bold text-surface-700 mb-2">Password *</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
                <input type="password" value={form.password} onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
              </div>
            </div>

            {/* Skills */}
            {form.role === "WORKER" && (
              <div className="animate-scale-in">
                <label className="block text-[13px] font-bold text-surface-700 mb-2">Your Skills</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button key={cat.id} type="button" onClick={() => toggleSkill(cat.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold border transition-all duration-200 ${
                        form.skills.includes(cat.id)
                          ? "bg-primary-50 border-primary-300 text-primary-700 shadow-sm"
                          : "bg-surface-50 border-surface-200 text-surface-500 hover:border-surface-300"
                      }`}>
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-primary-500/25 text-[14px]">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </span>
              ) : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-[13px] text-surface-400 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-bold hover:text-primary-500 transition">Login here</Link>
        </p>
      </div>
    </div>
  );
}