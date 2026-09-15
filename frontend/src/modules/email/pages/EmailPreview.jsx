import React from "react";

import {
  ArrowLeft,
  Eye,
  Mail,
  User,
  FileText,
  AtSign,
  ExternalLink,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

import EmailEditor from "../components/EmailEditor";

const EmailPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    template,
    variableValues = {},
    recipientEmail = "",
    recipientName = "",
  } = location.state || {};

  // ============================================================
  // NO TEMPLATE
  // ============================================================

  if (!template) {
    return (
      <div className="min-h-[70vh] rounded-2xl border border-stone-800 bg-stone-950">

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
            <Eye className="h-7 w-7 text-orange-400" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            Preview Unavailable
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-stone-500">
            No email data was provided for this preview. Please return to the
            Send Email page and try again.
          </p>

          <button
            type="button"
            onClick={() => navigate("/dashboard/email/send")}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              transition
              duration-200
              hover:bg-orange-400
            "
          >
            <ArrowLeft size={16} />
            Back to Send Email
          </button>

        </div>
      </div>
    );
  }

  // ============================================================
  // TEMPLATE DATA
  // ============================================================

  const templateName =
    template.templateName ||
    template.name ||
    "Untitled Template";

  const subject =
    template.subject ||
    "No subject";

  const displayRecipient = recipientName
    ? `${recipientName} <${recipientEmail}>`
    : recipientEmail || "No recipient specified";

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="space-y-6">

      {/* ====================================================== */}
      {/* COMPACT TOP BAR */}
      {/* ====================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10">
            <Eye className="h-5 w-5 text-orange-400" />
          </div>

          <div>
            <p className="text-sm font-medium text-stone-300">
              Email Preview
            </p>

            <p className="mt-0.5 text-xs text-stone-600">
              Review your email before sending
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
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
          "
        >
          <ArrowLeft size={16} />
          Back
        </button>

      </div>

      {/* ====================================================== */}
      {/* EMAIL INFORMATION */}
      {/* ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60">

        {/* CARD HEADER */}

        <div className="flex flex-col gap-3 border-b border-stone-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800">
              <Mail className="h-4 w-4 text-orange-400" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Email Details
              </p>

              <p className="text-xs text-stone-600">
                Template and recipient information
              </p>
            </div>

          </div>

          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            Preview Mode
          </span>

        </div>

        {/* DETAILS */}

        <div className="grid gap-px bg-stone-800 md:grid-cols-2">

          {/* TEMPLATE */}

          <div className="bg-stone-900/80 p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                <FileText className="h-4 w-4 text-orange-400" />
              </div>

              <div className="min-w-0">

                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                  Template
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-white">
                  {templateName}
                </p>

              </div>

            </div>
          </div>

          {/* RECIPIENT */}

          <div className="bg-stone-900/80 p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                <User className="h-4 w-4 text-blue-400" />
              </div>

              <div className="min-w-0">

                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                  Recipient
                </p>

                <p className="mt-1 truncate text-sm font-semibold text-white">
                  {displayRecipient}
                </p>

              </div>

            </div>
          </div>

          {/* SUBJECT */}

          <div className="bg-stone-900/80 p-5 md:col-span-2">

            <div className="flex items-start gap-3">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                <AtSign className="h-4 w-4 text-purple-400" />
              </div>

              <div className="min-w-0">

                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                  Subject
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {subject}
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ====================================================== */}
      {/* PREVIEW HEADER */}
      {/* ====================================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h2 className="text-lg font-semibold text-white">
            Rendered Email
          </h2>

          <p className="mt-1 text-xs text-stone-600">
            This is how the email content will be rendered.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-500">
          <ExternalLink size={13} />
          Email Preview
        </div>

      </div>

      {/* ====================================================== */}
      {/* EMAIL CANVAS */}
      {/* ====================================================== */}

      <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 shadow-2xl">

        {/* Browser-style top bar */}

        <div className="flex items-center gap-2 border-b border-stone-800 bg-stone-950 px-4 py-3">

          <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />
          <span className="h-2.5 w-2.5 rounded-full bg-stone-700" />

          <div className="ml-3 flex-1 rounded-lg border border-stone-800 bg-stone-900 px-3 py-1.5 text-center text-[11px] text-stone-600">
            Email Preview
          </div>

        </div>

        {/* Actual Email */}

        <div className="bg-stone-950 p-3 sm:p-6 lg:p-8">

          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-stone-800 bg-white shadow-xl">

            <EmailEditor
              htmlContent={
                template.htmlContent ||
                template.html ||
                ""
              }
              cssContent={
                template.cssContent ||
                template.css ||
                ""
              }
              variableValues={variableValues}
            />

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* BOTTOM INFO */}
      {/* ====================================================== */}

      <div className="rounded-xl border border-stone-800 bg-stone-900/40 px-4 py-3">

        <div className="flex flex-col gap-2 text-xs text-stone-600 sm:flex-row sm:items-center sm:justify-between">

          <span>
            Variables have been replaced with the values provided for this preview.
          </span>

          <span className="shrink-0 text-stone-700">
            MyMail Preview
          </span>

        </div>

      </div>

    </div>
  );
};

export default EmailPreview;