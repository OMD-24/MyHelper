export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-IN");
}

export function formatCurrency(amount) {
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

export function getUrgencyConfig(urgency) {
  switch (urgency) {
    case "EMERGENCY":
      return {
        bg: "bg-danger-50",
        text: "text-danger-600",
        border: "border-danger-200",
        dot: "bg-danger-500",
        icon: "🚨",
        label: "Emergency",
      };
    case "URGENT":
      return {
        bg: "bg-warning-50",
        text: "text-warning-600",
        border: "border-warning-200",
        dot: "bg-warning-500",
        icon: "⚡",
        label: "Urgent",
      };
    default:
      return {
        bg: "bg-success-50",
        text: "text-success-600",
        border: "border-success-200",
        dot: "bg-success-500",
        icon: "✓",
        label: "Normal",
      };
  }
}

export function getStatusConfig(status) {
  switch (status) {
    case "OPEN":
      return { bg: "bg-primary-50", text: "text-primary-700", dot: "bg-primary-500", label: "Open" };
    case "ACCEPTED":
      return { bg: "bg-warning-50", text: "text-warning-700", dot: "bg-warning-500", label: "Accepted" };
    case "IN_PROGRESS":
      return { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500", label: "In Progress" };
    case "COMPLETED":
      return { bg: "bg-success-50", text: "text-success-700", dot: "bg-success-500", label: "Completed" };
    case "CANCELLED":
      return { bg: "bg-surface-100", text: "text-surface-500", dot: "bg-surface-400", label: "Cancelled" };
    default:
      return { bg: "bg-surface-100", text: "text-surface-500", dot: "bg-surface-400", label: status };
  }
}

export function getCategoryIcon(categoryId) {
  const map = {
    plumbing: "🔧", electrical: "⚡", cleaning: "🧹", delivery: "📦",
    shifting: "🚛", medical: "🏥", gardening: "🌱", teaching: "📚",
    tech: "💻", cooking: "🍳", painting: "🎨", other: "📋",
  };
  return map[categoryId] || "📋";
}

export function truncate(str, len = 80) {
  if (!str) return "";
  return str.length > len ? str.substring(0, len) + "…" : str;
}