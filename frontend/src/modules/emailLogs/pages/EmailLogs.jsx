import React, { useCallback, useEffect, useState } from "react";

import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  RefreshCw,
  X,
  Activity,
  Clock3,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchEmailLogs } from "../../../features/emailLogs/emailLogsThunk";

import {
  selectEmailLogs,
  selectEmailLogsTotal,
  selectEmailLogsPage,
  selectEmailLogsLimit,
  selectEmailLogsLoading,
  selectEmailLogsError,
} from "../../../features/emailLogs/emailLogsSelectors";

import LogsTable from "../components/LogsTable";

import { selectProjects } from "../../../features/project/projectSelectors";

import { fetchProjects } from "../../../features/project/projectThunk";

// ============================================================
// STATUS CONFIG
// ============================================================

const STATUS_CONFIG = {
  sent: "Sent",
  pending: "Pending",
  failed: "Failed",
};

// ============================================================
// EMAIL LOGS
// ============================================================

const EmailLogs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================================================
  // EMAIL LOG STATE
  // ==========================================================

  const logs = useSelector(selectEmailLogs) || [];

  const total = useSelector(selectEmailLogsTotal) || 0;

  const currentPage = useSelector(selectEmailLogsPage) || 1;

  const limit = useSelector(selectEmailLogsLimit) || 10;

  const loading = useSelector(selectEmailLogsLoading);

  const error = useSelector(selectEmailLogsError);

  // ==========================================================
  // PROJECT STATE
  // ==========================================================

  const projects = useSelector(selectProjects) || [];

  // ==========================================================
  // FILTER STATE
  // ==========================================================

  const [status, setStatus] = useState("");

  const [projectId, setProjectId] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const totalPages = Math.ceil(total / limit) || 1;

  // ==========================================================
  // LOAD PROJECTS
  // ==========================================================

  useEffect(() => {
    if (!projects.length) {
      dispatch(fetchProjects());
    }
  }, [dispatch, projects.length]);

  // ==========================================================
  // LOAD EMAIL LOGS
  // ==========================================================

  const loadLogs = useCallback(
    (page = 1, selectedStatus = status, selectedProjectId = projectId) => {
      dispatch(
        fetchEmailLogs({
          page,
          limit: 10,
          status: selectedStatus,
          projectId: selectedProjectId,
        }),
      );
    },
    [dispatch, status, projectId],
  );

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    loadLogs(1);
  }, [loadLogs]);

  // ==========================================================
  // PROJECT CHANGE
  // ==========================================================

  const handleProjectChange = (e) => {
    const value = e.target.value;

    setProjectId(value);
    setStatus("");

    loadLogs(1, "", value);
  };

  // ==========================================================
  // STATUS CHANGE
  // ==========================================================

  const handleStatusChange = (e) => {
    const value = e.target.value;

    setStatus(value);

    loadLogs(1, value, projectId);
  };

  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const handleClearFilters = () => {
    setStatus("");
    setProjectId("");

    loadLogs(1, "", "");
  };

  // ==========================================================
  // REFRESH
  // ==========================================================

  const handleRefresh = () => {
    loadLogs(currentPage, status, projectId);
  };

  // ==========================================================
  // PAGINATION
  // ==========================================================

  const handlePrevious = () => {
    if (currentPage <= 1) {
      return;
    }

    loadLogs(currentPage - 1, status, projectId);
  };

  const handleNext = () => {
    if (currentPage >= totalPages) {
      return;
    }

    loadLogs(currentPage + 1, status, projectId);
  };

  const handlePageChange = (page) => {
    loadLogs(page, status, projectId);
  };

  // ==========================================================
  // VIEW DETAILS
  // ==========================================================

  const handleViewDetails = (id) => {
    navigate(`/dashboard/email-logs/${id}`);
  };

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const formatTotal = () => {
    if (total === 0) {
      return "0 emails";
    }

    return `${total} ${total === 1 ? "email" : "emails"}`;
  };

  // ==========================================================
  // EMPTY MESSAGE
  // ==========================================================

  const getEmptyMessage = () => {
    if (projectId && status) {
      return `No email activity found with ${
        STATUS_CONFIG[status] || status
      } status for the selected project.`;
    }

    if (projectId) {
      return "No email activity found for the selected project.";
    }

    if (status) {
      return `No email activity found with ${
        STATUS_CONFIG[status] || status
      } status.`;
    }

    return "Email activity will appear here once you start sending emails from your projects.";
  };

  const hasFilters = Boolean(status || projectId);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-full bg-[#0c0a09] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">

        {/* ================================================== */}
        {/* COMPACT TOP BAR */}
        {/* ================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* LEFT SIDE - NO DUPLICATE PAGE HEADER */}
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
              <Activity className="h-5 w-5 text-orange-400" />
            </div>

            <div>
              <p className="text-sm font-medium text-stone-300">
                Email Activity
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-xs text-stone-600">
                  {hasFilters ? "Filtered activity" : "All sending activity"}
                </span>

                <span className="h-1 w-1 rounded-full bg-stone-700" />

                <span className="inline-flex items-center gap-1 text-xs text-stone-600">
                  <Clock3 className="h-3 w-3" />
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <button
            type="button"
            onClick={handleRefresh}
            disabled={loading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-stone-700
              bg-stone-900
              px-4
              py-2.5
              text-sm
              font-medium
              text-stone-300
              transition
              duration-200
              hover:border-orange-500/40
              hover:bg-stone-800
              hover:text-orange-400
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loading ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>
        </div>

        {/* ================================================== */}
        {/* SUMMARY */}
        {/* ================================================== */}

        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* TOTAL */}

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Total Emails
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {total}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
                <Mail className="h-5 w-5 text-orange-400" />
              </div>
            </div>

            <p className="mt-2 text-xs text-stone-600">
              {formatTotal()} in your account
            </p>
          </div>

          {/* PAGE */}

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                  Current Page
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {currentPage}

                  <span className="text-base font-normal text-stone-600">
                    {" "}
                    / {totalPages}
                  </span>
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800">
                <Clock3 className="h-5 w-5 text-stone-500" />
              </div>
            </div>

            <p className="mt-2 text-xs text-stone-600">
              Showing up to {limit} logs per page
            </p>
          </div>
        </div>

        {/* ================================================== */}
        {/* FILTER BAR */}
        {/* ================================================== */}

        <div className="mb-5 rounded-2xl border border-stone-800 bg-stone-900/60 p-4">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-xl
                border
                border-stone-700
                bg-stone-950
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
              <Filter className="h-4 w-4" />

              Filters

              {hasFilters && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-bold text-white">
                  {(status ? 1 : 0) + (projectId ? 1 : 0)}
                </span>
              )}
            </button>

            {hasFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-medium
                  text-stone-500
                  transition
                  hover:text-orange-400
                "
              >
                <X className="h-3.5 w-3.5" />
                Clear filters
              </button>
            )}
          </div>

          {/* FILTER CONTENT */}

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-stone-800 pt-4 md:grid-cols-2">

              {/* PROJECT */}

              <div>
                <label className="mb-2 block text-xs font-medium text-stone-400">
                  Project
                </label>

                <select
                  value={projectId}
                  onChange={handleProjectChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-stone-700
                    bg-stone-950
                    px-3
                    py-2.5
                    text-sm
                    text-stone-200
                    outline-none
                    transition
                    focus:border-orange-500
                  "
                >
                  <option value="">All Projects</option>

                  {projects.length > 0 ? (
                    projects.map((project) => {
                      const id = project?._id || project?.id;

                      const name =
                        project?.projectName ||
                        project?.name ||
                        "Unnamed Project";

                      if (!id) {
                        return null;
                      }

                      return (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      );
                    })
                  ) : (
                    <option value="" disabled>
                      No projects found
                    </option>
                  )}
                </select>
              </div>

              {/* STATUS */}

              <div>
                <label className="mb-2 block text-xs font-medium text-stone-400">
                  Status
                </label>

                <select
                  value={status}
                  onChange={handleStatusChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-stone-700
                    bg-stone-950
                    px-3
                    py-2.5
                    text-sm
                    text-stone-200
                    outline-none
                    transition
                    focus:border-orange-500
                  "
                >
                  <option value="">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>

                <p className="mt-2 text-xs text-stone-600">
                  Select a status to filter email activity.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ================================================== */}
        {/* ERROR */}
        {/* ================================================== */}

        {error && !loading && (
          <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 p-4">

            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

            <div className="flex-1">
              <p className="text-sm font-medium text-red-300">
                Unable to load email logs
              </p>

              <p className="mt-1 text-xs text-red-400/80">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              className="text-xs font-medium text-red-400 hover:text-red-300"
            >
              Retry
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* TABLE / EMPTY STATE */}
        {/* ================================================== */}

        <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60">

          {loading ? (
            <div className="space-y-4 p-5">

              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-16 animate-pulse rounded-xl bg-stone-800/60"
                />
              ))}

            </div>
          ) : logs.length > 0 ? (
            <LogsTable
              logs={logs}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-800 bg-stone-950">
                <Mail className="h-7 w-7 text-stone-600" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-white">
                {status
                  ? `${STATUS_CONFIG[status] || status} emails not found`
                  : "No email activity found"}
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
                {getEmptyMessage()}
              </p>

              {hasFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-stone-700
                    bg-stone-900
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
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* ================================================== */}
        {/* PAGINATION */}
        {/* ================================================== */}

        {!loading && total > 0 && (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-stone-600">
              Page {currentPage} of {totalPages}
            </p>

            <div className="flex items-center gap-2">

              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentPage <= 1}
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-xl
                  border
                  border-stone-700
                  bg-stone-900
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-stone-400
                  transition
                  hover:border-orange-500/40
                  hover:text-orange-400
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="hidden items-center gap-1 sm:flex">

                {Array.from(
                  {
                    length: Math.min(totalPages, 5),
                  },
                  (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`
                          h-9
                          min-w-9
                          rounded-lg
                          px-2
                          text-xs
                          font-medium
                          transition
                          ${
                            page === currentPage
                              ? "bg-orange-500 text-white"
                              : "border border-stone-800 bg-stone-900 text-stone-500 hover:text-orange-400"
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                className="
                  inline-flex
                  items-center
                  gap-1
                  rounded-xl
                  border
                  border-stone-700
                  bg-stone-900
                  px-3
                  py-2
                  text-xs
                  font-medium
                  text-stone-400
                  transition
                  hover:border-orange-500/40
                  hover:text-orange-400
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailLogs;