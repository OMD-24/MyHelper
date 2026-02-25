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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    role: "",
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const toggleSkill = (skill) => {
    setForm((p) => ({
      ...p,
      skills: p.skills.includes(skill)
        ? p.skills.filter((s) => s !== skill)
        : [...p.skills, skill],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.password || !form.role) {
      toast.error("Please fill all required fields");
      return;
    }
    if (form.phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

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
      // Show backend error message
      const data = err.response?.data;
      let msg = "Registration failed";

      if (typeof data === "string") {
        msg = data;
      } else if (data?.message) {
        msg = data.message;
      } else if (typeof data === "object") {
        // Validation errors come as { field: "message" }
        const firstError = Object.values(data)[0];
        if (firstError) msg = firstError;
      }

      toast.error(msg);
      console.error("Register error:", data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-gray-900">
            Join KaamSetu
          </h1>
          <p className="text-gray-500 mt-1">
            Start helping or earning in your community
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to... *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => update("role", "SEEKER")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    form.role === "SEEKER"
                      ? "border-primary-500 bg-primary-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <HiOutlineHandRaised
                    className={`w-8 h-8 mx-auto mb-2 ${
                      form.role === "SEEKER"
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`font-semibold text-sm ${
                      form.role === "SEEKER"
                        ? "text-primary-700"
                        : "text-gray-600"
                    }`}
                  >
                    Get Help
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Post tasks</p>
                </button>

                <button
                  type="button"
                  onClick={() => update("role", "WORKER")}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    form.role === "WORKER"
                      ? "border-emerald-500 bg-emerald-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <HiOutlineWrenchScrewdriver
                    className={`w-8 h-8 mx-auto mb-2 ${
                      form.role === "WORKER"
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  />
                  <p
                    className={`font-semibold text-sm ${
                      form.role === "WORKER"
                        ? "text-emerald-700"
                        : "text-gray-600"
                    }`}
                  >
                    Earn Money
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Do tasks</p>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="10-digit phone number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                />
              </div>
            </div>

            {/* Skills */}
            {form.role === "WORKER" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Skills (select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => toggleSkill(cat.id)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                        form.skills.includes(cat.id)
                          ? "bg-primary-50 border-primary-300 text-primary-700"
                          : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition disabled:opacity-50 shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}