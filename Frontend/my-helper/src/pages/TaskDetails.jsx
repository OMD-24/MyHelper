import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import taskService from "../services/taskService";
import StatusBadge from "../components/StatusBadge";
import { timeAgo, formatCurrency, getUrgencyConfig, getCategoryIcon } from "../utils/helpers";
import toast from "react-hot-toast";
import {
  HiOutlineMapPin, HiOutlineClock, HiOutlineCurrencyRupee, HiOutlineUser,
  HiOutlineStar, HiOutlineCheckCircle, HiOutlineArrowLeft, HiOutlineChatBubbleLeftRight,
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

  useEffect(() => { loadTask(); }, [id]);

  const loadTask = async () => {
    setLoading(true);
    try {
      setTask(await taskService.getTaskById(id));
    } catch { toast.error("Task not found"); navigate("/dashboard"); }
    finally { setLoading(false); }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!appForm.message) { toast.error("Please write a message"); return; }
    setApplying(true);
    try {
      await taskService.applyForTask(id, {
        message: appForm.message,
        proposedBudget: Number(appForm.proposedBudget) || task.budget,
      });
      toast.success("Application sent! 🎉"); setShowApplyForm(false); setAppForm({ message: "", proposedBudget: "" }); loadTask();
    } catch (err) { toast.error(err.response?.data?.message || "Failed to apply"); }
    finally { setApplying(false); }
  };

  const handleAccept = async (applicationId) => {
    try { await taskService.acceptApplication(id, applicationId); toast.success("Worker accepted!"); loadTask(); }
    catch { toast.error("Failed to accept"); }
  };

  const handleComplete = async () => {
    try { await taskService.completeTask(id); toast.success("Task completed! 🎉"); loadTask(); }
    catch { toast.error("Failed to complete"); }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-10 h-10 border-[3px] border-primary-100 border-t-primary-600 rounded-full animate-spin" />
    </div>
  );
  if (!task) return null;

  const urgency = getUrgencyConfig(task.urgency);
  const isOwner = task.createdBy === user?.id;
  const hasApplied = task.applications?.some((a) => a.workerId === user?.id);
  const canApply = !isOwner && !hasApplied && task.status === "OPEN";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <button onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[13px] text-surface-400 hover:text-surface-700 mb-6 font-semibold transition">
        <HiOutlineArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Task Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-surface-900/5 border border-surface-100 overflow-hidden">
        {task.urgency === "EMERGENCY" && (
          <div className="h-1.5 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500 animate-pulse-soft" />
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="text-2xl w-10 h-10 flex items-center justify-center bg-surface-100 rounded-xl">{getCategoryIcon(task.category)}</span>
            <span className="text-[11px] font-bold text-surface-400 uppercase tracking-widest">{task.category}</span>
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${urgency.bg} ${urgency.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />{urgency.label}
            </span>
            <StatusBadge status={task.status} />
          </div>

          <h1 className="text-2xl font-black text-surface-800 mb-3 tracking-tight">{task.title}</h1>
          <p className="text-surface-500 leading-relaxed mb-8 text-[15px]">{task.description}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <HiOutlineCurrencyRupee className="w-4 h-4" />, label: "Budget", value: formatCurrency(task.budget) },
              { icon: <HiOutlineMapPin className="w-4 h-4" />, label: "Location", value: task.location?.address || "Nearby" },
              { icon: <HiOutlineClock className="w-4 h-4" />, label: "Posted", value: timeAgo(task.createdAt) },
              { icon: <HiOutlineUser className="w-4 h-4" />, label: "By", value: task.createdByName },
            ].map((item) => (
              <div key={item.label} className="bg-surface-50 rounded-2xl p-4">
                <div className="flex items-center gap-1.5 text-[11px] text-surface-400 mb-1 font-semibold">{item.icon}{item.label}</div>
                <p className="font-bold text-surface-800 text-[13px] truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-surface-100 p-6 md:p-8">
          {canApply && !showApplyForm && (
            <button onClick={() => setShowApplyForm(true)}
              className="w-full py-4 bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-400 hover:to-accent-500 text-white font-bold rounded-xl shadow-lg shadow-accent-500/25 transition-all text-[14px]">
              Apply for This Task
            </button>
          )}

          {canApply && showApplyForm && (
            <form onSubmit={handleApply} className="space-y-4 animate-scale-in">
              <h3 className="font-bold text-surface-800 text-[15px]">Send Your Proposal</h3>
              <textarea value={appForm.message} onChange={(e) => setAppForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Why should you be chosen? Mention your experience…" rows={3}
                className="w-full px-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] resize-none focus-ring" />
              <div className="relative">
                <HiOutlineCurrencyRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-300" />
                <input type="number" value={appForm.proposedBudget}
                  onChange={(e) => setAppForm((p) => ({ ...p, proposedBudget: e.target.value }))}
                  placeholder={`Your price (Budget: ₹${task.budget})`}
                  className="w-full pl-12 pr-4 py-3.5 bg-surface-50 border border-surface-200 rounded-xl text-[14px] focus-ring" />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={applying}
                  className="flex-1 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl disabled:opacity-50 shadow-md text-[14px]">
                  {applying ? "Sending…" : "Send Proposal"}
                </button>
                <button type="button" onClick={() => setShowApplyForm(false)}
                  className="px-6 py-3.5 border border-surface-200 text-surface-600 rounded-xl hover:bg-surface-50 transition font-semibold text-[14px]">
                  Cancel
                </button>
              </div>
            </form>
          )}

          {hasApplied && (
            <div className="flex items-center gap-2.5 p-4 bg-success-50 text-success-700 rounded-xl border border-success-200">
              <HiOutlineCheckCircle className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-[14px]">You've already applied for this task</span>
            </div>
          )}

          {isOwner && task.status === "ACCEPTED" && (
            <button onClick={handleComplete}
              className="w-full py-4 bg-gradient-to-r from-success-500 to-success-600 text-white font-bold rounded-xl shadow-lg shadow-success-500/25 transition text-[14px]">
              ✅ Mark as Completed
            </button>
          )}

          {isOwner && task.status === "COMPLETED" && (
            <div className="flex items-center gap-2.5 p-4 bg-success-50 text-success-700 rounded-xl border border-success-200">
              <HiOutlineCheckCircle className="w-5 h-5" />
              <span className="font-semibold text-[14px]">Task completed successfully!</span>
            </div>
          )}
        </div>
      </div>

      {/* Applications */}
      {isOwner && task.applications?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-black text-surface-800 mb-5">
            Applications <span className="text-surface-400 font-medium text-[14px]">({task.applications.length})</span>
          </h2>
          <div className="space-y-3">
            {task.applications.map((app) => (
              <div key={app.id}
                className={`bg-white rounded-2xl border p-5 transition-all ${
                  app.status === "ACCEPTED" ? "border-success-200 bg-success-50/30"
                    : app.status === "REJECTED" ? "border-surface-100 opacity-50"
                    : "border-surface-100 shadow-sm card-hover"
                }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 rounded-xl flex items-center justify-center font-bold">
                      {app.workerName?.[0]}
                    </div>
                    <div>
                      <p className="font-bold text-surface-800 text-[14px]">{app.workerName}</p>
                      <div className="flex items-center gap-1 text-[12px] text-surface-400">
                        <HiOutlineStar className="w-3.5 h-3.5 text-warning-500" />
                        <span className="font-semibold">{app.workerRating}</span> rating
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-surface-800">{formatCurrency(app.proposedBudget || task.budget)}</p>
                    <p className="text-[11px] text-surface-300 mt-0.5">{timeAgo(app.appliedAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3.5 bg-surface-50 rounded-xl mb-4">
                  <HiOutlineChatBubbleLeftRight className="w-4 h-4 text-surface-300 mt-0.5 shrink-0" />
                  <p className="text-[13px] text-surface-500 leading-relaxed">{app.message}</p>
                </div>

                {app.status === "PENDING" && task.status === "OPEN" && (
                  <button onClick={() => handleAccept(app.id)}
                    className="w-full py-3 bg-gradient-to-r from-success-500 to-success-600 text-white font-bold rounded-xl hover:from-success-400 hover:to-success-500 transition shadow-md text-[13px]">
                    Accept This Worker
                  </button>
                )}
                {app.status === "ACCEPTED" && (
                  <div className="flex items-center gap-2 text-success-600 text-[13px] font-bold">
                    <HiOutlineCheckCircle className="w-4 h-4" /> Accepted
                  </div>
                )}
                {app.status === "REJECTED" && (
                  <p className="text-[13px] text-surface-400">Not selected</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isOwner && task.applications?.length === 0 && task.status === "OPEN" && (
        <div className="mt-10 text-center py-16 bg-white rounded-3xl border border-surface-100">
          <p className="text-4xl mb-3">⏳</p>
          <h3 className="font-bold text-surface-800 mb-1">No applications yet</h3>
          <p className="text-[14px] text-surface-400">Your task is live. Applications will appear here.</p>
        </div>
      )}
    </div>
  );
}