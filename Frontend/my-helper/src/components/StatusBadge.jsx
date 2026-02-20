import { getStatusColor } from "../utils/helpers";

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}