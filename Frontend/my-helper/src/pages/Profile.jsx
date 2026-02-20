import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";
import toast from "react-hot-toast";
import {
  HiOutlineStar,
  HiOutlineCheckBadge,
  HiOutlinePencilSquare,
  HiOutlineCalendar,
  HiOutlinePhone,
  HiOutlineBriefcase,
} from "react-icons/hi2";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [skills, setSkills] = useState(user?.skills || []);

  const toggleSkill = (s) =>
    setSkills((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const save = () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    updateProfile({ name, skills });
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
        My Profile
      </h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-3 border-2 border-white/30">
            {user?.name?.[0]}
          </div>
          <h2 className="text-xl font-bold text-white">{user?.name}</h2>
          <p className="text-primary-100 text-sm mt-1">
            {user?.role === "WORKER" ? "🔧 Worker" : "👤 Help Seeker"}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-gray-100">
          <div className="p-4 text-center border-r border-gray-100">
            <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
              <HiOutlineStar className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {user?.rating || "N/A"}
            </p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
          <div className="p-4 text-center border-r border-gray-100">
            <div className="flex items-center justify-center gap-1 text-primary-500 mb-1">
              <HiOutlineBriefcase className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {user?.tasksCompleted || 0}
            </p>
            <p className="text-xs text-gray-500">Completed</p>
          </div>
          <div className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-500 mb-1">
              <HiOutlineCheckBadge className="w-5 h-5" />
            </div>
            <p className="text-xl font-bold text-gray-900">
              {user?.role === "WORKER" ? "Verified" : "Active"}
            </p>
            <p className="text-xs text-gray-500">Status</p>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          {editing ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                />
              </div>

              {user?.role === "WORKER" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleSkill(cat.id)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                          skills.includes(cat.id)
                            ? "bg-primary-50 border-primary-300 text-primary-700"
                            : "bg-gray-50 border-gray-200 text-gray-600"
                        }`}
                      >
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={save}
                  className="flex-1 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setName(user?.name);
                    setSkills(user?.skills || []);
                  }}
                  className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 text-sm">
                <HiOutlinePhone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">{user?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <HiOutlineCalendar className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">
                  Joined{" "}
                  {new Date(user?.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {user?.skills?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((s) => {
                      const cat = CATEGORIES.find((c) => c.id === s);
                      return (
                        <span
                          key={s}
                          className="flex items-center gap-1 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                          {cat?.icon} {cat?.label || s}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-2 text-sm text-primary-600 font-medium hover:text-primary-700 transition"
              >
                <HiOutlinePencilSquare className="w-4 h-4" />
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full mt-6 py-3 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition"
      >
        Logout
      </button>
    </div>
  );
}