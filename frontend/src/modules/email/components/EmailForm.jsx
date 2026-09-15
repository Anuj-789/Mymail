
import React from "react";
import { Mail, User } from "lucide-react";

import VariableInput from "./VariableInput";

const EmailForm = ({
  projects = [],
  selectedProject,
  onProjectChange,

  template,

  recipientEmail,
  onRecipientEmailChange,

  recipientName,
  onRecipientNameChange,

  variableValues = {},
  onVariableChange,

  disabled = false,
}) => {
  const hasTemplate = Boolean(template);

  return (
    <div className="space-y-6">
      {/* ===============================
          PROJECT
      =============================== */}

      <div>
        <label className="mb-2 block text-sm font-medium text-stone-300">
          Project
        </label>

        <select
          value={selectedProject || ""}
          onChange={(e) => onProjectChange(e.target.value)}
          disabled={disabled}
          className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">Select a project</option>

          {projects.map((project) => {
            const projectId = project._id || project.id;

            return (
              <option key={projectId} value={projectId}>
                {project.projectName ||
                  project.name ||
                  "Unnamed Project"}
              </option>
            );
          })}
        </select>
      </div>

      {/* ===============================
          TEMPLATE INFORMATION
      =============================== */}

      {selectedProject && (
        <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
          {!hasTemplate ? (
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-orange-500/10 p-2 text-orange-400">
                <Mail size={18} />
              </div>

              <div>
                <h3 className="font-semibold text-stone-100">
                  No template selected
                </h3>

                <p className="mt-1 text-sm leading-6 text-stone-500">
                  Please choose a template for this project before
                  sending an email.
                </p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs font-medium uppercase tracking-wider text-orange-400">
                Selected Template
              </p>

              <h3 className="mt-2 text-lg font-semibold text-stone-100">
                {template.templateName ||
                  template.name ||
                  "Untitled Template"}
              </h3>

              {template.subject && (
                <p className="mt-1 text-sm text-stone-400">
                  Subject: {template.subject}
                </p>
              )}
            </>
          )}
        </div>
      )}

      {/* ===============================
          RECIPIENT + VARIABLES
      =============================== */}

      {hasTemplate && (
        <>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-stone-100">
                Recipient Details
              </h3>

              <p className="mt-1 text-xs leading-5 text-stone-500">
                Enter the email address where you want to receive the
                test email.
              </p>
            </div>

            {/* Recipient Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-300">
                Recipient Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
                />

                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) =>
                    onRecipientEmailChange(e.target.value)
                  }
                  placeholder="you@example.com"
                  disabled={disabled}
                  className="w-full rounded-xl border border-stone-700 bg-stone-950 py-3 pl-10 pr-4 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Recipient Name */}

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-300">
                Recipient Name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500"
                />

                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) =>
                    onRecipientNameChange(e.target.value)
                  }
                  placeholder="John Doe"
                  disabled={disabled}
                  className="w-full rounded-xl border border-stone-700 bg-stone-950 py-3 pl-10 pr-4 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* ===============================
              TEMPLATE VARIABLES
          =============================== */}

          <div>
            <VariableInput
              variables={template.variables || []}
              values={variableValues}
              onChange={onVariableChange}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmailForm;

