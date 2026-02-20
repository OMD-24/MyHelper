import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import TaskCard from "../components/TaskCard";
import taskService from "../services/taskService";
import { Link } from "react-router-dom";
import { HiOutlinePlusCircle } from "react-icons/hi2";

export default function MyTasks() {
  const { user } = useAuth();
  const [tab, setTab] = useState("posted");
  const [posted, setPosted] = useState([]);
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const [p, a] = await Promise.all([
        taskService.getTasksByUser(user.id),
        taskService.getAppliedTasks(user.id),
      ]);
      setPosted(p);
      setApplied(a);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentList = tab === "posted" ? posted : applied;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">My Tasks</h1>
        <Link
          to="/post-task"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition shadow-md text-sm"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          Post a Task
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-xs">
        <button
          onClick={() => setTab("posted")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition ${
            tab === "posted"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Posted ({posted.length})
        </button>
        <button
          onClick={() => setTab("applied")}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition ${
            tab === "applied"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Applied ({applied.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      ) : currentList.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentList.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">{tab === "posted" ? "📝" : "🔍"}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {tab === "posted"
              ? "You haven't posted any tasks"
              : "You haven't applied to any tasks"}
          </h3>
          <p className="text-gray-500 mb-6 text-sm">
            {tab === "posted"
              ? "Post your first task and get help from the community"
              : "Browse the dashboard to find tasks you can help with"}
          </p>
          <Link
            to={tab === "posted" ? "/post-task" : "/dashboard"}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition text-sm"
          >
            {tab === "posted" ? "Post a Task" : "Browse Tasks"}
          </Link>
        </div>
      )}
    </div>
  );
}