import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import { CATEGORIES } from "../data/mockData";
import taskService from "../services/taskService";
import {
  HiOutlineMagnifyingGlass,
  HiOutlinePlusCircle,
  HiOutlineFunnel,
  HiOutlineXMark,
} from "react-icons/hi2";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => { loadTasks(); }, [selectedCategory, selectedUrgency]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks({
        category: selectedCategory, urgency: selectedUrgency, status: "OPEN",
      });
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = search
    ? tasks.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()))
    : tasks;

  const emergencyTasks = filteredTasks.filter((t) => t.urgency === "EMERGENCY");
  const regularTasks = filteredTasks.filter((t) => t.urgency !== "EMERGENCY");
  const clearFilters = () => { setSelectedCategory(""); setSelectedUrgency(""); setSearch(""); };
  const hasFilters = selectedCategory || selectedUrgency || search;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-surface-800 tracking-tight">
            {user?.role === "WORKER" ? "Available Tasks" : "Community Tasks"}
          </h1>
          <p className="text-surface-400 text-[14px] mt-1">
            {user?.role === "WORKER" ? "Find tasks near you and start earning" : "See what's happening around you"}
          </p>
        </div>
        <Link to="/post-task"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white font-bold rounded-xl shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 transition-all duration-200 text-[13px]">
          <HiOutlinePlusCircle className="w-5 h-5" />
          Post a Task
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-surface-200 rounded-xl text-[14px] text-surface-800 placeholder:text-surface-300 focus-ring" />
        </div>
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-5 py-3.5 rounded-xl text-[13px] font-bold transition-all duration-200 border ${
            showFilters || hasFilters
              ? "bg-primary-50 border-primary-200 text-primary-700"
              : "bg-white border-surface-200 text-surface-500 hover:border-surface-300"
          }`}>
          <HiOutlineFunnel className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasFilters && <span className="w-2 h-2 bg-accent-500 rounded-full" />}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-surface-100 p-6 mb-6 animate-scale-in shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-surface-800 text-[14px]">Filter Tasks</h3>
            {hasFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-[12px] text-accent-500 hover:text-accent-600 font-bold">
                <HiOutlineXMark className="w-3.5 h-3.5" /> Clear all
              </button>
            )}
          </div>

          <div className="mb-5">
            <p className="text-[11px] font-bold text-surface-400 mb-2.5 uppercase tracking-[0.15em]">Category</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id ? "" : cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-surface-50 border-surface-200 text-surface-500 hover:border-surface-300"
                  }`}>
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-surface-400 mb-2.5 uppercase tracking-[0.15em]">Urgency</p>
            <div className="flex gap-2">
              {[
                { value: "NORMAL", label: "Normal", emoji: "" },
                { value: "URGENT", label: "Urgent", emoji: "⚡ " },
                { value: "EMERGENCY", label: "Emergency", emoji: "🚨 " },
              ].map((u) => (
                <button key={u.value} onClick={() => setSelectedUrgency(selectedUrgency === u.value ? "" : u.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold border transition-all ${
                    selectedUrgency === u.value
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-surface-50 border-surface-200 text-surface-500 hover:border-surface-300"
                  }`}>
                  {u.emoji}{u.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-[3px] border-primary-100 border-t-primary-600 rounded-full animate-spin" />
            <p className="text-[14px] text-surface-400 font-medium">Loading tasks…</p>
          </div>
        </div>
      ) : (
        <>
          {/* Emergency */}
          {emergencyTasks.length > 0 && (
            <div className="mb-10">
              <h2 className="flex items-center gap-2.5 text-base font-black text-accent-600 mb-4">
                <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse-soft" />
                Emergency Help Needed
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyTasks.map((task) => (
                  <div key={task.id} className="ring-2 ring-accent-200 rounded-2xl">
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular */}
          {regularTasks.length > 0 ? (
            <div>
              <h2 className="text-base font-black text-surface-800 mb-4">
                All Tasks
                <span className="text-[13px] font-medium text-surface-400 ml-2">({regularTasks.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularTasks.map((task) => <TaskCard key={task.id} task={task} />)}
              </div>
            </div>
          ) : !emergencyTasks.length && (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">📋</p>
              <h3 className="text-lg font-bold text-surface-800 mb-2">No tasks found</h3>
              <p className="text-surface-400 mb-6 text-[14px]">
                {hasFilters ? "Try adjusting your filters" : "Be the first to post a task!"}
              </p>
              {hasFilters && (
                <button onClick={clearFilters}
                  className="px-6 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition text-[13px] font-bold">
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}