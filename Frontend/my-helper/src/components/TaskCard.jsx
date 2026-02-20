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
  getUrgencyColor,
  getStatusColor,
  getCategoryIcon,
  truncate,
} from "../utils/helpers";

export default function TaskCard({ task }) {
  return (
    <Link
      to={`/task/${task.id}`}
      className="block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 overflow-hidden group"
    >
      <div className="p-5">
        {/* Top Row - Category + Urgency + Status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getCategoryIcon(task.category)}</span>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {task.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getUrgencyColor(
                task.urgency
              )}`}
            >
              {task.urgency === "EMERGENCY" ? "🚨 " : ""}
              {task.urgency}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-2 group-hover:text-primary-700 transition-colors">
          {task.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          {truncate(task.description, 100)}
        </p>

        {/* Info Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <HiOutlineCurrencyRupee className="w-3.5 h-3.5" />
            <span className="font-semibold text-gray-800">
              {formatCurrency(task.budget)}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineMapPin className="w-3.5 h-3.5" />
            {task.location?.address || "Nearby"}
          </span>
          <span className="flex items-center gap-1">
            <HiOutlineClock className="w-3.5 h-3.5" />
            {timeAgo(task.createdAt)}
          </span>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-500">
            by <span className="font-medium">{task.createdByName}</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <HiOutlineUserGroup className="w-3.5 h-3.5" />
              {task.applications?.length || 0} applied
            </span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}