import React from "react";

const StatusBadge = ({ status }) => {
  const normalizedStatus = String(status || "unknown")
    .toLowerCase()
    .trim();

  const statusConfig = {
    sent: {
      label: "Sent",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      dot: "bg-emerald-400",
    },

    delivered: {
      label: "Delivered",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      dot: "bg-blue-400",
    },

    pending: {
      label: "Pending",
      className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      dot: "bg-yellow-400",
    },

    processing: {
      label: "Processing",
      className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      dot: "bg-orange-400",
    },

    failed: {
      label: "Failed",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      dot: "bg-red-400",
    },

    bounced: {
      label: "Bounced",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      dot: "bg-red-400",
    },

    unknown: {
      label: "Unknown",
      className: "bg-stone-500/10 text-stone-400 border-stone-500/20",
      dot: "bg-stone-400",
    },
  };

  const config = statusConfig[normalizedStatus] || statusConfig.unknown;

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        px-3
        py-1.5
        rounded-full
        border
        text-xs
        font-medium
        whitespace-nowrap
        ${config.className}
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${config.dot}
        `}
      />

      {config.label}
    </span>
  );
};

export default StatusBadge;
