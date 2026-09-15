import React from "react";

import { Eye } from "lucide-react";

import StatusBadge from "./StatusBadge";

const getProjectName = (log) => {
  if (!log?.projectId) return "—";

  if (typeof log.projectId === "object") {
    return (
      log.projectId.projectName ||
      log.projectId.name ||
      "—"
    );
  }

  return "—";
};

const getTemplateName = (log) => {
  if (!log?.templateId) return "—";

  if (typeof log.templateId === "object") {
    return (
      log.templateId.name ||
      log.templateId.templateName ||
      "—"
    );
  }

  return "—";
};

const getRecipient = (log) => {
  return (
    log?.to ||
    log?.recipient ||
    log?.recipientEmail ||
    log?.email ||
    "—"
  );
};

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const LogsTable = ({
  logs = [],
  onViewDetails,
}) => {
  if (!logs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="h-16 w-16 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center mb-5">
          <Eye className="h-7 w-7 text-stone-500" />
        </div>

        <h3 className="text-lg font-semibold text-white">
          No email logs found
        </h3>

        <p className="mt-2 max-w-md text-sm text-stone-500">
          Email activity will appear here once you
          start sending emails from your projects.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ========================= */}
      {/* DESKTOP TABLE */}
      {/* ========================= */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-stone-800">
              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Recipient
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Project
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Template
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Status
              </th>

              <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-stone-500">
                Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-stone-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-800/70">
            {logs.map((log) => (
              <tr
                key={log._id}
                className="group transition-colors hover:bg-stone-900/70"
              >
                <td className="px-5 py-4">
                  <div className="max-w-[220px]">
                    <p className="truncate text-sm font-medium text-white">
                      {getRecipient(log)}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-stone-300">
                    {getProjectName(log)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="text-sm text-stone-300">
                    {getTemplateName(log)}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <StatusBadge status={log.status} />
                </td>

                <td className="px-5 py-4">
                  <span className="whitespace-nowrap text-sm text-stone-500">
                    {formatDate(log.createdAt)}
                  </span>
                </td>

                <td className="px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails(log._id)}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-lg
                      border
                      border-stone-700
                      bg-stone-900
                      px-3
                      py-2
                      text-xs
                      font-medium
                      text-stone-300
                      transition
                      hover:border-orange-500/40
                      hover:bg-orange-500/10
                      hover:text-orange-400
                    "
                  >
                    <Eye className="h-4 w-4" />

                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ========================= */}
      {/* MOBILE CARDS */}
      {/* ========================= */}

      <div className="grid gap-3 md:hidden">
        {logs.map((log) => (
          <div
            key={log._id}
            className="
              rounded-2xl
              border
              border-stone-800
              bg-stone-900/60
              p-4
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {getRecipient(log)}
                </p>

                <p className="mt-1 text-xs text-stone-500">
                  {getProjectName(log)}
                </p>
              </div>

              <StatusBadge status={log.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-stone-600">
                  Template
                </p>

                <p className="mt-1 truncate text-sm text-stone-300">
                  {getTemplateName(log)}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-wide text-stone-600">
                  Date
                </p>

                <p className="mt-1 text-sm text-stone-400">
                  {formatDate(log.createdAt)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onViewDetails(log._id)}
              className="
                mt-4
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-stone-700
                bg-stone-800
                px-4
                py-2.5
                text-sm
                font-medium
                text-stone-300
                transition
                hover:border-orange-500/40
                hover:text-orange-400
              "
            >
              <Eye className="h-4 w-4" />

              View Details
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default LogsTable;