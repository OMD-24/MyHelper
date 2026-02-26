import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../data/mockData";
import toast from "react-hot-toast";
import {
  HiOutlineStar, HiOutlineCheckBadge, HiOutlinePencilSquare,
  HiOutlineCalendar, HiOutlinePhone, HiOutlineBriefcase,
} from "react-icons/hi2";

export default function Profile() {
  const { user, updateProfile, logout } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [skills, setSkills] = useState(user?.skills || []);

  const toggleSkill = (s) => setSkills((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const save = () => {
    if (!name.trim()) { toast.error("Name cannot be empty"); return; }
    updateProfile({ name, skills }); setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <h1 className="text-2xl font-black text-surface-800 tracking-tight mb-8">My Profile</h1>

      <div className="bg-white rounded-3xl shadow-xl shadow-surface-900/5 border border-surface-100 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 p-10 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }} />
          <div className="relative">
            <div className="w-20 h-20 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-black text-white mx-auto mb-4 border border-white/20 shadow-xl">
              {user?.name?.[0]}
            </div>
            <h2 className="text-xl font-black text-white">{user?.name}</h2>
            <p className="text-primary-200 text-[13px] mt-1 font-semibold">
              {user?.role === "WORKER" ? "🔧 Worker" : "👤 Help Seeker"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 border-b border-surface-100">
          {[
            { icon: <HiOutlineStar className="w-5 h-5 text-warning-500" />, value: user?.rating || "N/A", label: "Rating" },
            { icon: <HiOutlineBriefcase className="w-5 h-5 text-primary-500" />, value: user?.tasksCompleted || 0, label: "Completed" },
            { icon: <HiOutlineCheckBadge className="w-5 h-5 text-success-500" />, value: user?.role === "WORKER" ? "Verified" : "Active", label: "Status" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 text-center border-r last:border-r-0 border-surface-100">
              <div className="flex justify-center mb-1.5">{stat.icon}</div>
              <p className="text-xl font-black text-surface-800">{stat.value}</p>
              <p className="text-[11px] text-surface-400 font-semibold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="p-6 md:p-8 space-y-5">
          {editing ? (
            <div className="animate-scale-in space-y-5">
              <div>
                <label className="block text-[13px] font-bold text-surface-700 mb-2">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] focus-ring" />
              </div>

              {user?.role === "WORKER" && (
                <div>
                  <label className="block text-[13px] font-bold text-surface-700 mb-2">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button key={cat.id} type="button" onClick={() => toggleSkill(cat.id)}
                        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold border transition-all ${
                          skills.includes(cat.id)
                            ? "bg-primary-50 border-primary-300 text-primary-700"
                            : "bg-surface-50 border-surface-200 text-surface-500"
                        }`}>
                        {cat.icon} {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={save}
                  className="flex-1 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl shadow-md text-[14px]">
                  Save Changes
                </button>
                <button onClick={() => { setEditing(false); setName(user?.name); setSkills(user?.skills || []); }}
                  className="px-6 py-3.5 border border-surface-200 text-surface-600 rounded-xl hover:bg-surface-50 transition font-semibold text-[14px]">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 text-[14px]">
                <HiOutlinePhone className="w-5 h-5 text-surface-300" />
                <span className="text-surface-600 font-medium">{user?.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[14px]">
                <HiOutlineCalendar className="w-5 h-5 text-surface-300" />
                <span className="text-surface-600 font-medium">
                  Joined {new Date(user?.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                </span>
              </div>

              {user?.skills?.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-surface-400 uppercase tracking-[0.15em] mb-2.5">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((s) => {
                      const cat = CATEGORIES.find((c) => c.id === s);
                      return (
                        <span key={s} className="flex items-center gap-1.5 px-3.5 py-2 bg-primary-50 text-primary-700 rounded-xl text-[12px] font-semibold">
                          {cat?.icon} {cat?.label || s}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <button onClick={() => setEditing(true)}
                className="flex items-center gap-2 text-[14px] text-primary-600 font-bold hover:text-primary-500 transition">
                <HiOutlinePencilSquare className="w-4 h-4" /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <button onClick={logout}
        className="w-full mt-6 py-3.5 border-2 border-accent-200 text-accent-600 font-bold rounded-xl hover:bg-accent-50 transition text-[14px]">
        Logout
      </button>
    </div>
  );
}