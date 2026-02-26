import { getStatusConfig } from "../utils/helpers";

export default function StatusBadge({ status }) {
  const config = getStatusConfig(status);
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-lg ${config.bg} ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}