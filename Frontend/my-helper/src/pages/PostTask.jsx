import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";
import taskService from "../services/taskService";
import toast from "react-hot-toast";
import {
  HiOutlinePencilSquare,
  HiOutlineDocumentText,
  HiOutlineCurrencyRupee,
  HiOutlineMapPin,
  HiOutlineBolt,
} from "react-icons/hi2";

export default function PostTask() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", category: "", budget: "", urgency: "NORMAL", address: "" });

  const update = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.budget) {
      toast.error("Please fill all required fields"); return;
    }
    setLoading(true);
    try {
      const task = await taskService.createTask({
        title: form.title, description: form.description, category: form.category,
        budget: Number(form.budget), urgency: form.urgency,
        location: { lat: user.latitude || 28.6139, lng: user.longitude || 77.209, address: form.address || "Your Location" },
      });
      toast.success("Task posted! 🎉");
      navigate(`/task/${task.id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-surface-800 tracking-tight">Post a New Task</h1>
        <p className="text-surface-400 mt-1 text-[14px]">Describe what you need help with</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-surface-900/5 border border-surface-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-[13px] font-bold text-surface-700 mb-2">Task Title *</label>
            <div className="relative">
              <HiOutlinePencilSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
              <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Kitchen tap leaking badly" maxLength={100}
                className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
            </div>
            <p className="text-[11px] text-surface-300 mt-1.5 text-right">{form.title.length}/100</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[13px] font-bold text-surface-700 mb-2">Description *</label>
            <div className="relative">
              <HiOutlineDocumentText className="absolute left-4 top-4 w-5 h-5 text-surface-300" />
              <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                placeholder="Describe in detail. What tools or skills are needed?" rows={4} maxLength={500}
                className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 resize-none focus-ring" />
            </div>
            <p className="text-[11px] text-surface-300 mt-1.5 text-right">{form.description.length}/500</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[13px] font-bold text-surface-700 mb-3">Category *</label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} type="button" onClick={() => update("category", cat.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 text-[11px] font-semibold ${
                    form.category === cat.id
                      ? "border-primary-400 bg-primary-50 text-primary-700 shadow-sm"
                      : "border-surface-100 bg-surface-50 text-surface-500 hover:border-surface-200"
                  }`}>
                  <span className="text-xl">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-[13px] font-bold text-surface-700 mb-2">Budget (₹) *</label>
            <div className="relative">
              <HiOutlineCurrencyRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
              <input type="number" value={form.budget} onChange={(e) => update("budget", e.target.value)}
                placeholder="Enter amount" min={0}
                className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
            </div>
            <div className="flex gap-2 mt-2.5">
              {[100, 200, 500, 1000].map((amt) => (
                <button key={amt} type="button" onClick={() => update("budget", String(amt))}
                  className="px-3.5 py-1.5 bg-surface-100 text-surface-600 rounded-lg text-[12px] font-bold hover:bg-surface-200 transition">
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-[13px] font-bold text-surface-700 mb-2">Location</label>
            <div className="relative">
              <HiOutlineMapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
              <input type="text" value={form.address} onChange={(e) => update("address", e.target.value)}
                placeholder="e.g. Connaught Place, Delhi"
                className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="flex items-center gap-1.5 text-[13px] font-bold text-surface-700 mb-3">
              <HiOutlineBolt className="w-4 h-4" /> Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "NORMAL", label: "Normal", desc: "No rush", colors: "border-success-300 bg-success-50 text-success-700" },
                { value: "URGENT", label: "Urgent", desc: "Need soon", colors: "border-warning-300 bg-warning-50 text-warning-700" },
                { value: "EMERGENCY", label: "Emergency", desc: "Right now!", colors: "border-danger-300 bg-danger-50 text-danger-700" },
              ].map((u) => (
                <button key={u.value} type="button" onClick={() => update("urgency", u.value)}
                  className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${
                    form.urgency === u.value ? u.colors + " shadow-sm" : "border-surface-200 text-surface-400 hover:border-surface-300"
                  }`}>
                  <p className="font-bold text-[13px]">{u.label}</p>
                  <p className="text-[11px] opacity-70 mt-0.5">{u.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white font-bold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-accent-500/25 text-[14px]">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting…
              </span>
            ) : "Post Task"}
          </button>
        </form>
      </div>
    </div>
  );
}