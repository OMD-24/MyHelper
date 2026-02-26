import { Link } from "react-router-dom";
import {
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineCurrencyRupee,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import {
  timeAgo,
  formatCurrency,
  getUrgencyConfig,
  getStatusConfig,
  getCategoryIcon,
  truncate,
} from "../utils/helpers";

export default function TaskCard({ task }) {
  const urgency = getUrgencyConfig(task.urgency);
  const status = getStatusConfig(task.status);

  return (
    <Link
      to={`/task/${task.id}`}
      className="block bg-white rounded-2xl border border-surface-200/80 card-hover overflow-hidden group focus-ring"
    >
      {task.urgency === "EMERGENCY" && (
        <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-500 animate-pulse-soft" />
      )}

      <div className="p-5">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl w-8 h-8 flex items-center justify-center bg-surface-100 rounded-lg">
              {getCategoryIcon(task.category)}
            </span>
            <span className="text-[11px] font-bold text-surface-400 uppercase tracking-widest">
              {task.category}
            </span>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${urgency.bg} ${urgency.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
            {urgency.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-surface-800 text-[15px] leading-snug mb-2 group-hover:text-primary-700 transition-colors duration-200">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-surface-400 mb-4 leading-relaxed">
          {truncate(task.description, 90)}
        </p>

        {/* Info chips */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-surface-400">
          <span className="inline-flex items-center gap-1 bg-surface-50 px-2.5 py-1 rounded-lg">
            <HiOutlineCurrencyRupee className="w-3.5 h-3.5 text-surface-400" />
            <span className="font-bold text-surface-700">
              {formatCurrency(task.budget)}
            </span>
          </span>
          <span className="inline-flex items-center gap-1 bg-surface-50 px-2.5 py-1 rounded-lg">
            <HiOutlineMapPin className="w-3.5 h-3.5" />
            {task.location?.address || "Nearby"}
          </span>
          <span className="inline-flex items-center gap-1 bg-surface-50 px-2.5 py-1 rounded-lg">
            <HiOutlineClock className="w-3.5 h-3.5" />
            {timeAgo(task.createdAt)}
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-surface-100 my-4" />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-surface-400">
            by{" "}
            <span className="font-semibold text-surface-600">
              {task.createdByName}
            </span>
          </span>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 text-[12px] text-surface-400">
              <HiOutlineUserGroup className="w-3.5 h-3.5" />
              {task.applications?.length || 0}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${status.bg} ${status.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}