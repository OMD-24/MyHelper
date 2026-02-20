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
  HiOutlineLightBulb,
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

  // 1. Logic to find selected category data for the dynamic tips
  const selectedCatData = CATEGORIES.find((c) => c.id === form.category);

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
        <h1 className="text-2xl font-extrabold text-gray-900">Post a New Task</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Describe what you need help with and let the community respond
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
            <div className="relative">
              <HiOutlinePencilSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Kitchen tap leaking badly"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
                maxLength={100}
              />
            </div>
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
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

          {/* Dynamic Description Field with Instructions */}
          <div>
            <label className="flex items-center justify-between text-sm font-bold text-gray-700 mb-2">
              <span>Detailed Requirements *</span>
              {selectedCatData && (
                <span className="text-primary-600 text-[10px] uppercase tracking-wider bg-primary-50 px-2 py-0.5 rounded">
                  Specific for {selectedCatData.label}
                </span>
              )}
            </label>
            <div className="relative">
              <HiOutlineDocumentText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder={
                  selectedCatData 
                    ? `Mention: ${selectedCatData.types?.slice(0, 3).join(", ") || "details"}...` 
                    : "Describe the task in detail..."
                }
                rows={5}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary-500 outline-none transition text-sm"
              />
            </div>

            {/* Dynamic Tips Box based on category */}
            {selectedCatData && selectedCatData.checklist && (
              <div className="mt-3 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-1">
                  <HiOutlineLightBulb className="w-4 h-4" /> 
                  Hiring Specifications for {selectedCatData.label}
                </p>
                <ul className="space-y-1.5">
                  {selectedCatData.checklist.map((item, index) => (
                    <li key={index} className="text-[11px] text-amber-700 flex items-start gap-2">
                      <span className="font-bold">{index + 1}.</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹) *</label>
            <div className="relative">
              <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <HiOutlineMapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="e.g. Sangli, Maharashtra"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition disabled:opacity-50 shadow-lg"
          >
            {loading ? "Posting..." : "Post Task"}
          </button>
        </form>
      </div>
    </div>
  );
}