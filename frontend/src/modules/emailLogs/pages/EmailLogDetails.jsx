import React, { useEffect } from "react";

import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock3,
  FileText,
  Mail,
  User,
  AlertCircle,
  FolderOpen,
  Send,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import {
  fetchEmailLogById,
} from "../../../features/emailLogs/emailLogsThunk";

import {
  clearCurrentLog,
} from "../../../features/emailLogs/emailLogsSlice";

import {
  selectCurrentEmailLog,
  selectEmailLogDetailsLoading,
  selectEmailLogDetailsError,
} from "../../../features/emailLogs/emailLogsSelectors";

import StatusBadge from "../components/StatusBadge";

// ============================================================
// SEND EMAIL ROUTE
// ============================================================

const SEND_EMAIL_ROUTE = "/dashboard/send-email";

// ============================================================
// PROJECT NAME
// ============================================================

const getProjectName = (log) => {
  if (!log?.projectId) {
    return "—";
  }

  if (typeof log.projectId === "object") {
    return (
      log.projectId.projectName ||
      log.projectId.name ||
      "—"
    );
  }

  return "—";
};

// ============================================================
// TEMPLATE NAME
// ============================================================

const getTemplateName = (log) => {
  if (!log?.templateId) {
    return "—";
  }

  if (typeof log.templateId === "object") {
    return (
      log.templateId.templateName ||
      log.templateId.name ||
      "—"
    );
  }

  return "—";
};

// ============================================================
// RECIPIENT
// ============================================================

const getRecipient = (log) => {
  return log?.to || "—";
};

// ============================================================
// SENDER
// ============================================================

const getSender = (log) => {
  return log?.from || "—";
};

// ============================================================
// DATE FORMAT
// ============================================================

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// ============================================================
// EMAIL LOG DETAILS
// ============================================================

const EmailLogDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ============================================================
  // REDUX
  // ============================================================

  const log = useSelector(selectCurrentEmailLog);

  const loading = useSelector(
    selectEmailLogDetailsLoading
  );

  const error = useSelector(
    selectEmailLogDetailsError
  );

  // ============================================================
  // FETCH LOG
  // ============================================================

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchEmailLogById(id));

    return () => {
      dispatch(clearCurrentLog());
    };
  }, [dispatch, id]);

  // ============================================================
  // OPEN SEND EMAIL
  // ============================================================

  const handleSendTestMail = () => {
    navigate(SEND_EMAIL_ROUTE);
  };

  return (
    <div className="min-h-full bg-[#0c0a09] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="mb-6">

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/email-logs")
            }
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-stone-500
              transition
              hover:text-orange-400
            "
          >
            <ArrowLeft className="h-4 w-4" />

            Back to Email Logs
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h1 className="text-xl font-semibold text-white sm:text-2xl">
                Email Details
              </h1>

              <p className="mt-1 text-sm text-stone-500">
                View detailed information about this email
              </p>

            </div>

            {log && (
              <StatusBadge status={log.status} />
            )}

          </div>

        </div>

        {/* ================================================== */}
        {/* LOADING */}
        {/* ================================================== */}

        {loading && (
          <div className="space-y-5">

            <div className="h-48 animate-pulse rounded-2xl bg-stone-900" />

            <div className="h-72 animate-pulse rounded-2xl bg-stone-900" />

          </div>
        )}

        {/* ================================================== */}
        {/* ERROR */}
        {/* ================================================== */}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">

            <div className="flex items-start gap-3">

              <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />

              <div>

                <h2 className="text-sm font-semibold text-red-300">
                  Unable to load email log
                </h2>

                <p className="mt-1 text-sm text-red-400/80">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    dispatch(fetchEmailLogById(id))
                  }
                  className="
                    mt-4
                    rounded-lg
                    bg-red-500/10
                    px-3
                    py-2
                    text-xs
                    font-medium
                    text-red-300
                    hover:bg-red-500/20
                  "
                >
                  Try Again
                </button>

              </div>

            </div>

          </div>
        )}

        {/* ================================================== */}
        {/* CONTENT */}
        {/* ================================================== */}

        {!loading && !error && log && (
          <div className="space-y-5">

            {/* ================================================== */}
            {/* EMAIL INFORMATION */}
            {/* ================================================== */}

            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 sm:p-6">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                  <Mail className="h-5 w-5 text-orange-400" />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-white">
                    Email Information
                  </h2>

                  <p className="text-xs text-stone-500">
                    Basic information about this email
                  </p>
                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* SUBJECT */}

                <InfoItem
                  icon={FileText}
                  label="Subject"
                  value={log.subject || "—"}
                />

                {/* RECIPIENT */}

                <InfoItem
                  icon={User}
                  label="Recipient"
                  value={getRecipient(log)}
                />

                {/* FROM */}

                <InfoItem
                  icon={Send}
                  label="From / Sender"
                  value={getSender(log)}
                />

                {/* STATUS */}

                <InfoItem
                  icon={CheckCircle2}
                  label="Status"
                  value={
                    <StatusBadge
                      status={log.status}
                    />
                  }
                />

                {/* PROJECT */}

                <InfoItem
                  icon={FolderOpen}
                  label="Project"
                  value={getProjectName(log)}
                />

                {/* TEMPLATE */}

                <InfoItem
                  icon={FileText}
                  label="Template"
                  value={getTemplateName(log)}
                />

                {/* CREATED AT */}

                <InfoItem
                  icon={Calendar}
                  label="Created At"
                  value={formatDate(log.createdAt)}
                />

                {/* SENT AT */}

                <InfoItem
                  icon={Clock3}
                  label="Sent At"
                  value={formatDate(log.sentAt)}
                />

              </div>

            </div>

            {/* ================================================== */}
            {/* SEND TEST MAIL */}
            {/* ================================================== */}

            <div className="
              rounded-2xl
              border
              border-stone-800
              bg-stone-900/60
              p-4
              sm:p-5
              lg:p-6
            ">

              <button
                type="button"
                onClick={handleSendTestMail}
                className="
                  group
                  flex
                  w-full
                  flex-col
                  items-stretch
                  gap-4
                  rounded-2xl
                  border
                  border-stone-800
                  bg-stone-950/70
                  p-3
                  text-left
                  transition
                  hover:border-orange-500/40
                  hover:bg-orange-500/5
                  sm:flex-row
                  sm:items-center
                  sm:p-4
                "
              >

                {/* ================================================== */}
                {/* GIF */}
                {/* ================================================== */}

                <div className="
                  flex
                  h-40
                  w-full
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-stone-800
                  bg-stone-950
                  sm:h-24
                  sm:w-40
                  md:h-28
                  md:w-48
                ">

                  <img
                    src="/progilelogogif2.gif"
                    alt="Send Test Mail"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-300
                      group-hover:scale-[1.03]
                    "
                  />

                </div>

                {/* ================================================== */}
                {/* TEXT */}
                {/* ================================================== */}

                <div className="
                  min-w-0
                  flex-1
                  px-1
                  sm:px-0
                ">

                  <p className="
                    text-sm
                    font-semibold
                    text-white
                    transition
                    group-hover:text-orange-400
                  ">
                    Send Test Mail
                  </p>

                  <p className="
                    mt-1
                    text-xs
                    leading-5
                    text-stone-500
                  ">
                    Open the email sender and send a test email.
                  </p>

                </div>

                {/* ================================================== */}
                {/* ACTION ICON */}
                {/* ================================================== */}

                <div className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  self-end
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-stone-800
                  bg-stone-900
                  text-stone-500
                  transition
                  group-hover:border-orange-500/40
                  group-hover:text-orange-400
                  sm:self-auto
                ">

                  <Send className="h-4 w-4" />

                </div>

              </button>

            </div>

            {/* ================================================== */}
            {/* ERROR MESSAGE */}
            {/* ================================================== */}

            {log.errorMessage && (
              <div className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/5
                p-5
                sm:p-6
              ">

                <div className="flex items-start gap-3">

                  <AlertCircle
                    className="
                      mt-0.5
                      h-5
                      w-5
                      shrink-0
                      text-red-400
                    "
                  />

                  <div>

                    <p className="
                      text-xs
                      font-medium
                      uppercase
                      tracking-wide
                      text-red-400
                    ">
                      Error Message
                    </p>

                    <p className="
                      mt-2
                      break-words
                      text-sm
                      leading-6
                      text-red-300
                    ">
                      {log.errorMessage}
                    </p>

                  </div>

                </div>

              </div>
            )}

          </div>
        )}

        {/* ================================================== */}
        {/* NOT FOUND */}
        {/* ================================================== */}

        {!loading && !error && !log && (
          <div className="
            rounded-2xl
            border
            border-stone-800
            bg-stone-900/60
            p-10
            text-center
          ">

            <Mail
              className="
                mx-auto
                h-10
                w-10
                text-stone-700
              "
            />

            <h2 className="
              mt-4
              text-lg
              font-semibold
              text-white
            ">
              Email log not found
            </h2>

            <p className="
              mt-2
              text-sm
              text-stone-500
            ">
              This email log may have been removed or does not exist.
            </p>

          </div>
        )}

      </div>
    </div>
  );
};

// ============================================================
// INFO ITEM
// ============================================================

const InfoItem = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="
      rounded-xl
      border
      border-stone-800/80
      bg-stone-950/50
      p-4
    ">

      <div className="flex items-center gap-2">

        <Icon
          className="
            h-4
            w-4
            shrink-0
            text-stone-600
          "
        />

        <p className="
          text-xs
          font-medium
          uppercase
          tracking-wide
          text-stone-600
        ">
          {label}
        </p>

      </div>

      <div className="
        mt-3
        break-words
        text-sm
        text-stone-200
      ">
        {value}
      </div>

    </div>
  );
};

export default EmailLogDetails;