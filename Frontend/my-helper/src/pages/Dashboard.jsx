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

  useEffect(() => {
    loadTasks();
  }, [selectedCategory, selectedUrgency]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getAllTasks({
        category: selectedCategory,
        urgency: selectedUrgency,
        status: "OPEN",
      });
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = search
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase())
      )
    : tasks;

  const emergencyTasks = filteredTasks.filter(
    (t) => t.urgency === "EMERGENCY"
  );
  const regularTasks = filteredTasks.filter(
    (t) => t.urgency !== "EMERGENCY"
  );

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedUrgency("");
    setSearch("");
  };

  const hasFilters = selectedCategory || selectedUrgency || search;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">
            {user?.role === "WORKER"
              ? "Available Tasks"
              : "Community Tasks"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {user?.role === "WORKER"
              ? "Find tasks near you and start earning"
              : "See what's happening in your community"}
          </p>
        </div>
        <Link
          to="/post-task"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition shadow-md text-sm"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          Post a Task
        </Link>
      </div>

      {/* Search + Filter Bar */}
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition text-sm font-medium ${
            showFilters || hasFilters
              ? "bg-primary-50 border-primary-200 text-primary-700"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <HiOutlineFunnel className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {hasFilters && (
            <span className="w-2 h-2 bg-primary-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 animate-slide-up shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 text-sm">
              Filter Tasks
            </h3>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
              >
                <HiOutlineXMark className="w-3 h-3" />
                Clear all
              </button>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Category
            </p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.id ? "" : cat.id
                    )
                  }
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    selectedCategory === cat.id
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Urgency
            </p>
            <div className="flex gap-2">
              {["NORMAL", "URGENT", "EMERGENCY"].map((u) => (
                <button
                  key={u}
                  onClick={() =>
                    setSelectedUrgency(selectedUrgency === u ? "" : u)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                    selectedUrgency === u
                      ? "bg-primary-50 border-primary-300 text-primary-700"
                      : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {u === "EMERGENCY" ? "🚨 " : u === "URGENT" ? "⚠️ " : ""}
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">Loading tasks...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Emergency Tasks */}
          {emergencyTasks.length > 0 && (
            <div className="mb-8">
              <h2 className="flex items-center gap-2 text-lg font-bold text-red-700 mb-4">
                🚨 Emergency Help Needed
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {emergencyTasks.map((task) => (
                  <div
                    key={task.id}
                    className="ring-2 ring-red-200 rounded-2xl"
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Regular Tasks */}
          {regularTasks.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                All Tasks
                <span className="text-sm font-normal text-gray-400 ml-2">
                  ({regularTasks.length})
                </span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {regularTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          ) : (
            !emergencyTasks.length && (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">📋</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tasks found
                </h3>
                <p className="text-gray-500 mb-6">
                  {hasFilters
                    ? "Try adjusting your filters"
                    : "Be the first to post a task!"}
                </p>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="px-5 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}