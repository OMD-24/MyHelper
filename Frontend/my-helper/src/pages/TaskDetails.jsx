import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import taskService from "../services/taskService";
import StatusBadge from "../components/StatusBadge";
import {
  timeAgo,
  formatCurrency,
  getUrgencyColor,
  getCategoryIcon,
} from "../utils/helpers";
import toast from "react-hot-toast";
import {
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCurrencyRupee,
  HiOutlineUser,
  HiOutlineStar,
  HiOutlineCheckCircle,
  HiOutlineArrowLeft,
  HiOutlineChatBubbleLeftRight,
} from "react-icons/hi2";

export default function TaskDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [appForm, setAppForm] = useState({ message: "", proposedBudget: "" });

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTaskById(id);
      setTask(data);
    } catch (err) {
      toast.error("Task not found");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!appForm.message) {
      toast.error("Please write a message");
      return;
    }
    setApplying(true);
    try {
      await taskService.applyForTask(id, {
        workerId: user.id,
        workerName: user.name,
        workerRating: user.rating || 0,
        message: appForm.message,
        proposedBudget: Number(appForm.proposedBudget) || task.budget,
      });
      toast.success("Application sent!");
      setShowApplyForm(false);
      setAppForm({ message: "", proposedBudget: "" });
      loadTask();
    } catch (err) {
      toast.error("Failed to apply");
    } finally {
      setApplying(false);
    }
  };

  const handleAccept = async (applicationId) => {
    try {
      await taskService.acceptApplication(id, applicationId);
      toast.success("Worker accepted!");
      loadTask();
    } catch (err) {
      toast.error("Failed to accept");
    }
  };

  const handleComplete = async () => {
    try {
      await taskService.completeTask(id);
      toast.success("Task marked as completed! 🎉");
      loadTask();
    } catch (err) {
      toast.error("Failed to complete task");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!task) return null;

  const isOwner = task.createdBy === user?.id;
  const hasApplied = task.applications?.some((a) => a.workerId === user?.id);
  const canApply =
    !isOwner && !hasApplied && task.status === "OPEN";

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition"
      >
        <HiOutlineArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Task Info Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-2xl">{getCategoryIcon(task.category)}</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {task.category}
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getUrgencyColor(
                task.urgency
              )}`}
            >
              {task.urgency === "EMERGENCY" ? "🚨 " : ""}
              {task.urgency}
            </span>
            <StatusBadge status={task.status} />
          </div>

          <h1 className="text-2xl font-extrabold text-gray-900 mb-3">
            {task.title}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-6">
            {task.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <HiOutlineCurrencyRupee className="w-3.5 h-3.5" />
                Budget
              </div>
              <p className="font-bold text-gray-900">
                {formatCurrency(task.budget)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <HiOutlineMapPin className="w-3.5 h-3.5" />
                Location
              </div>
              <p className="font-medium text-gray-900 text-sm">
                {task.location?.address || "Nearby"}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <HiOutlineClock className="w-3.5 h-3.5" />
                Posted
              </div>
              <p className="font-medium text-gray-900 text-sm">
                {timeAgo(task.createdAt)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <HiOutlineUser className="w-3.5 h-3.5" />
                Posted by
              </div>
              <p className="font-medium text-gray-900 text-sm">
                {task.createdByName}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-100 p-6 md:p-8">
          {/* Worker: Apply */}
          {canApply && (
            <>
              {!showApplyForm ? (
                <button
                  onClick={() => setShowApplyForm(true)}
                  className="w-full py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition shadow-lg"
                >
                  Apply for This Task
                </button>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <h3 className="font-bold text-gray-900">
                    Send Your Proposal
                  </h3>
                  <textarea
                    value={appForm.message}
                    onChange={(e) =>
                      setAppForm((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Why should you be chosen? Mention your experience..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm resize-none"
                  />
                  <div className="relative">
                    <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={appForm.proposedBudget}
                      onChange={(e) =>
                        setAppForm((p) => ({
                          ...p,
                          proposedBudget: e.target.value,
                        }))
                      }
                      placeholder={`Your price (Budget: ₹${task.budget})`}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      disabled={applying}
                      className="flex-1 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition disabled:opacity-50"
                    >
                      {applying ? "Sending..." : "Send Proposal"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {hasApplied && (
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-xl">
              <HiOutlineCheckCircle className="w-5 h-5" />
              <span className="font-medium text-sm">
                You've already applied for this task
              </span>
            </div>
          )}

          {/* Owner: Complete button */}
          {isOwner && task.status === "ACCEPTED" && (
            <button
              onClick={handleComplete}
              className="w-full py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition shadow-lg"
            >
              ✅ Mark as Completed
            </button>
          )}

          {isOwner && task.status === "COMPLETED" && (
            <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-xl">
              <HiOutlineCheckCircle className="w-5 h-5" />
              <span className="font-medium text-sm">
                This task has been completed successfully!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Applications Section */}
      {isOwner && task.applications?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Applications ({task.applications.length})
          </h2>
          <div className="space-y-3">
            {task.applications.map((app) => (
              <div
                key={app.id}
                className={`bg-white rounded-2xl border p-5 transition ${
                  app.status === "ACCEPTED"
                    ? "border-green-200 bg-green-50/50"
                    : app.status === "REJECTED"
                    ? "border-gray-200 opacity-60"
                    : "border-gray-100 shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                      {app.workerName?.[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {app.workerName}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <HiOutlineStar className="w-3 h-3 text-amber-400" />
                        {app.workerRating} rating
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">
                      {formatCurrency(app.proposedBudget || task.budget)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {timeAgo(app.appliedAt)}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
                  <HiOutlineChatBubbleLeftRight className="inline w-4 h-4 mr-1 text-gray-400" />
                  {app.message}
                </p>

                {app.status === "PENDING" && task.status === "OPEN" && (
                  <button
                    onClick={() => handleAccept(app.id)}
                    className="w-full py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition text-sm"
                  >
                    Accept This Worker
                  </button>
                )}

                {app.status === "ACCEPTED" && (
                  <div className="flex items-center gap-2 text-green-700 text-sm font-medium">
                    <HiOutlineCheckCircle className="w-4 h-4" />
                    Accepted
                  </div>
                )}

                {app.status === "REJECTED" && (
                  <p className="text-sm text-gray-400">Not selected</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Applications */}
      {isOwner &&
        task.applications?.length === 0 &&
        task.status === "OPEN" && (
          <div className="mt-8 text-center py-12 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">⏳</p>
            <h3 className="font-semibold text-gray-900 mb-1">
              No applications yet
            </h3>
            <p className="text-sm text-gray-500">
              Your task is live. Applications will appear here.
            </p>
          </div>
        )}
    </div>
  );
}