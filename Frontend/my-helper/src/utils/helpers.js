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
  return `₹${amount}`;
}

export function getUrgencyColor(urgency) {
  switch (urgency) {
    case "EMERGENCY":
      return "bg-red-100 text-red-700 border-red-200";
    case "URGENT":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-green-100 text-green-700 border-green-200";
  }
}

export function getStatusColor(status) {
  switch (status) {
    case "OPEN":
      return "bg-blue-100 text-blue-700";
    case "ACCEPTED":
      return "bg-yellow-100 text-yellow-700";
    case "IN_PROGRESS":
      return "bg-purple-100 text-purple-700";
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "CANCELLED":
      return "bg-gray-100 text-gray-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function getCategoryIcon(categoryId) {
  const map = {
    plumbing: "🔧",
    electrical: "⚡",
    cleaning: "🧹",
    delivery: "📦",
    shifting: "🚛",
    medical: "🏥",
    gardening: "🌱",
    teaching: "📚",
    tech: "💻",
    cooking: "🍳",
    painting: "🎨",
    other: "📋",
  };
  return map[categoryId] || "📋";
}

export function truncate(str, len = 80) {
  if (!str) return "";
  return str.length > len ? str.substring(0, len) + "..." : str;
}