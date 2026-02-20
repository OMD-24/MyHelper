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
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    urgency: "NORMAL",
    address: "",
  });

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category || !form.budget) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const task = await taskService.createTask({
        ...form,
        budget: Number(form.budget),
        createdBy: user.id,
        createdByName: user.name,
        location: {
          lat: user.location?.lat || 28.6139,
          lng: user.location?.lng || 77.209,
          address: form.address || "Your Location",
        },
      });
      toast.success("Task posted successfully!");
      navigate(`/task/${task.id}`);
    } catch (err) {
      toast.error(err.message || "Failed to post task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Post a New Task
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Describe what you need help with and let the community respond
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task Title *
            </label>
            <div className="relative">
              <HiOutlinePencilSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Kitchen tap leaking badly"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
                maxLength={100}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {form.title.length}/100
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <div className="relative">
              <HiOutlineDocumentText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe the task in detail. What needs to be done? Any tools or skills needed?"
                rows={4}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm resize-none"
                maxLength={500}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {form.description.length}/500
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => update("category", cat.id)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition text-xs font-medium ${
                    form.category === cat.id
                      ? "border-primary-500 bg-primary-50 text-primary-700"
                      : "border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200"
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget (₹) *
            </label>
            <div className="relative">
              <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="Enter amount in rupees"
                min={0}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
              />
            </div>
            <div className="flex gap-2 mt-2">
              {[100, 200, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => update("budget", String(amt))}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 transition"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location / Address
            </label>
            <div className="relative">
              <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="e.g. Connaught Place, Delhi"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
              />
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <HiOutlineBolt className="inline w-4 h-4 mr-1" />
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  value: "NORMAL",
                  label: "Normal",
                  desc: "No rush",
                  color: "border-green-200 bg-green-50 text-green-700",
                },
                {
                  value: "URGENT",
                  label: "Urgent",
                  desc: "Need soon",
                  color: "border-amber-200 bg-amber-50 text-amber-700",
                },
                {
                  value: "EMERGENCY",
                  label: "Emergency",
                  desc: "Right now!",
                  color: "border-red-200 bg-red-50 text-red-700",
                },
              ].map((u) => (
                <button
                  key={u.value}
                  type="button"
                  onClick={() => update("urgency", u.value)}
                  className={`p-3 rounded-xl border-2 text-center transition ${
                    form.urgency === u.value
                      ? u.color + " shadow-sm"
                      : "border-gray-100 text-gray-500 hover:border-gray-200"
                  }`}
                >
                  <p className="font-semibold text-sm">{u.label}</p>
                  <p className="text-xs opacity-75 mt-0.5">{u.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition disabled:opacity-50 shadow-lg text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Posting...
              </span>
            ) : (
              "Post Task"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}