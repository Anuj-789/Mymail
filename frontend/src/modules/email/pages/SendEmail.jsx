import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  KeyRound,
  Loader2,
  Mail,
  Send,
  Settings2,
  ShieldCheck,
  User,
  X,
  XCircle,
} from "lucide-react";

import { toast } from "react-hot-toast";

import EmailForm from "../components/EmailForm";

import { fetchProjects } from "@/features/project/projectThunk";
import { selectProjects } from "@/features/project/projectSelectors";

import { fetchProjectTemplates } from "@/features/template/templateThunk";
import { selectTemplates } from "@/features/template/templateSelectors";

import { fetchApiKeys } from "@/features/apiKey/apiKeyThunk";
import { selectApiKeys } from "@/features/apiKey/apiKeySelectors";

import api from "@/services/api";

const SendEmail = () => {
  // =========================================================
  // REDUX
  // =========================================================

  const dispatch = useDispatch();

  const projects = useSelector(selectProjects) || [];
  const templates = useSelector(selectTemplates) || [];
  const apiKeys = useSelector(selectApiKeys) || [];

  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [started, setStarted] = useState(false);

  const [selectedProject, setSelectedProject] = useState("");
  const [template, setTemplate] = useState(null);

  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");

  const [variableValues, setVariableValues] = useState({});

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sending, setSending] = useState(false);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState("");
  const [messageId, setMessageId] = useState("");

  // =========================================================
  // LOAD PROJECTS
  // =========================================================

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // =========================================================
  // LOAD API KEYS
  // =========================================================

  useEffect(() => {
    if (!selectedProject) return;

    dispatch(fetchApiKeys(selectedProject));
  }, [dispatch, selectedProject]);

  // =========================================================
  // LOAD PROJECT TEMPLATES
  // =========================================================

  useEffect(() => {
    if (!selectedProject) {
      setTemplate(null);
      setVariableValues({});
      return;
    }

    dispatch(fetchProjectTemplates(selectedProject));
  }, [dispatch, selectedProject]);

  // =========================================================
  // SELECT FIRST TEMPLATE
  // =========================================================

  useEffect(() => {
    if (!selectedProject) {
      setTemplate(null);
      setVariableValues({});
      return;
    }

    if (!templates.length) {
      setTemplate(null);
      setVariableValues({});
      return;
    }

    const firstTemplate = templates[0];

    setTemplate(firstTemplate);

    const variables = firstTemplate?.variables || [];
    const initialValues = {};

    variables.forEach((variable) => {
      const variableName =
        typeof variable === "string"
          ? variable
          : variable?.name ||
            variable?.key ||
            variable?.variable ||
            "";

      if (variableName) {
        initialValues[variableName] = "";
      }
    });

    setVariableValues(initialValues);
  }, [selectedProject, templates]);

  // =========================================================
  // CURRENT PROJECT API KEYS
  // =========================================================

  const currentProjectApiKeys = useMemo(() => {
    if (!selectedProject) return [];

    return apiKeys.filter((key) => {
      const keyProjectId =
        key?.projectId?._id ||
        key?.projectId?.id ||
        key?.projectId ||
        key?.project?._id ||
        key?.project?.id;

      if (keyProjectId) {
        return String(keyProjectId) === String(selectedProject);
      }

      return true;
    });
  }, [apiKeys, selectedProject]);

  // =========================================================
  // FIND PRODUCTION API KEY
  // =========================================================

  const productionKey = useMemo(() => {
    return currentProjectApiKeys.find((key) => {
      const keyName = String(
        key?.name ||
          key?.keyName ||
          key?.environment ||
          key?.type ||
          ""
      )
        .trim()
        .toLowerCase();

      return keyName === "production";
    });
  }, [currentProjectApiKeys]);

  // =========================================================
  // API KEY STATUS
  // =========================================================

  const productionKeyExists = Boolean(productionKey);

  const productionKeyActive = useMemo(() => {
    if (!productionKey) return false;

    const status = String(productionKey?.status || "")
      .trim()
      .toLowerCase();

    return status === "active";
  }, [productionKey]);

  const apiKeyStatus = useMemo(() => {
    if (!productionKeyExists) return "not-created";

    if (!productionKeyActive) return "inactive";

    return "ready";
  }, [productionKeyExists, productionKeyActive]);

  // =========================================================
  // TEMPLATE VARIABLES
  // =========================================================

  const templateVariables = useMemo(() => {
    if (!template?.variables) return [];

    return template.variables
      .map((variable) => {
        if (typeof variable === "string") {
          return variable;
        }

        return (
          variable?.name ||
          variable?.key ||
          variable?.variable ||
          ""
        );
      })
      .filter(Boolean);
  }, [template]);

  // =========================================================
  // VARIABLES COMPLETED
  // =========================================================

  const variablesCompleted = useMemo(() => {
    if (!templateVariables.length) return true;

    return templateVariables.every(
      (variable) =>
        variableValues[variable] !== undefined &&
        String(variableValues[variable]).trim() !== ""
    );
  }, [templateVariables, variableValues]);

  // =========================================================
  // PROJECT CHANGE
  // =========================================================

  const handleProjectChange = (projectId) => {
    setSelectedProject(projectId);

    setTemplate(null);
    setVariableValues({});

    setSuccess(false);
    setError(null);

    setMessage("");
    setMessageId("");

    setShowConfirmation(false);

    setRecipientEmail("");
    setRecipientName("");
  };

  // =========================================================
  // VARIABLE CHANGE
  // =========================================================

  const handleVariableChange = (variable, value) => {
    setVariableValues((previous) => ({
      ...previous,
      [variable]: value,
    }));
  };

  // =========================================================
  // API KEYS
  // =========================================================

  const handleGoToApiKeys = () => {
    if (!selectedProject) {
      toast.error("Please select a project first");
      return;
    }

    window.location.href = "/dashboard/api-keys";
  };

  // =========================================================
  // TEMPLATE PAGE
  // =========================================================

  const handleGoToTemplates = () => {
    window.location.href = "/dashboard/templates";
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {
    if (!selectedProject) {
      toast.error("Please select a project");
      return false;
    }

    if (!template) {
      toast.error("Please choose a template for this project");
      return false;
    }

    if (!productionKeyExists) {
      toast.error(
        "Production API key is not created. Create it from API Keys."
      );
      return false;
    }

    if (!productionKeyActive) {
      toast.error(
        "Production API is inactive. Activate it from API Keys."
      );
      return false;
    }

    if (!recipientEmail.trim()) {
      toast.error("Please enter recipient email");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
      toast.error("Please enter a valid recipient email");
      return false;
    }

    if (!variablesCompleted) {
      toast.error("Please fill all template variables");
      return false;
    }

    return true;
  };

  // =========================================================
  // SEND BUTTON
  // =========================================================

  const handleSendClick = () => {
    setSuccess(false);
    setError(null);

    if (!validateForm()) {
      return;
    }

    setShowConfirmation(true);
  };

  // =========================================================
  // SEND EMAIL
  // =========================================================

  const handleConfirmSend = async () => {
    setShowConfirmation(false);

    setSending(true);

    setSuccess(false);
    setError(null);

    setMessage("");
    setMessageId("");

    try {
      const payload = {
        projectId: selectedProject,

        templateId: template?._id || template?.id,

        to: recipientEmail,

        data: variableValues,
      };

      const response = await api.post(
        "/email/dashboard-send",
        payload
      );

      const responseData = response?.data || {};

      setSuccess(true);

      setMessage(
        responseData.message || "Email sent successfully"
      );

      setMessageId(
        responseData.emailId ||
          responseData.messageId ||
          ""
      );

      toast.success("Test email sent successfully");
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Email could not be sent";

      setError(errorMessage);

      toast.error(errorMessage);
    } finally {
      setSending(false);
    }
  };

  // =========================================================
  // PROJECT / TEMPLATE NAMES
  // =========================================================

  const templateName =
    template?.templateName ||
    template?.name ||
    "Unnamed Template";

  const selectedProjectData = projects.find(
    (project) =>
      String(project?._id || project?.id) ===
      String(selectedProject)
  );

  const projectName =
    selectedProjectData?.projectName ||
    selectedProjectData?.name ||
    "Selected Project";

  // =========================================================
  // API STATUS LABEL
  // =========================================================

  const apiStatusText =
    apiKeyStatus === "ready"
      ? "Active"
      : apiKeyStatus === "inactive"
      ? "Inactive"
      : "Not Created";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="w-full pb-10">
      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
          <Send size={20} />
        </div>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-100">
            Test your project email
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Send a test email using your project and template.
          </p>
        </div>
      </div>

      {/* =====================================================
          SUCCESS
      ====================================================== */}

      {success && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04]">
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-semibold text-emerald-400">
                  Test email sent successfully
                </h3>

                <p className="mt-1 text-sm leading-6 text-stone-400">
                  {message ||
                    "Your email has been delivered successfully."}
                </p>

                {messageId && (
                  <div className="mt-3 rounded-xl border border-stone-800 bg-stone-950/60 px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                      Email ID
                    </p>

                    <p className="mt-1 break-all font-mono text-xs text-stone-300">
                      {messageId}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-emerald-500/10 bg-stone-950/30 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={21}
                className="mt-0.5 shrink-0 text-emerald-400"
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-stone-100">
                  Your API is ready to use
                </p>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-stone-500">
                  Your production API has been successfully
                  tested and is ready to integrate into your
                  applications.
                </p>

                <button
                  type="button"
                  onClick={handleGoToApiKeys}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-orange-400 transition hover:text-orange-300"
                >
                  View API Keys
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
              <XCircle size={20} />
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold text-red-400">
                Email could not be sent
              </h3>

              <p className="mt-1 text-sm leading-6 text-stone-400">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          INITIAL GETTING STARTED SCREEN
          KEEPING YOUR ORIGINAL DESIGN
      ====================================================== */}

      {!started && (
        <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            <img
              src="/gungif3.gif"
              alt="Getting started"
              className="mb-5 h-32 w-32 object-contain"
            />

            <h2 className="text-lg font-semibold text-stone-100">
              Follow these steps to send an email
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-stone-500">
              Follow these five simple steps to successfully
              send your test email.
            </p>

            {/* =================================================
                5 STEPS
            ================================================== */}

            <div className="mt-6 grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {/* STEP 1 */}

              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-left transition hover:border-stone-700 hover:bg-stone-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
                    1
                  </div>

                  <p className="text-sm font-semibold text-stone-200">
                    Choose Project
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Select the project you want to send an
                  email from.
                </p>
              </div>

              {/* STEP 2 */}

              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-left transition hover:border-stone-700 hover:bg-stone-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
                    2
                  </div>

                  <p className="text-sm font-semibold text-stone-200">
                    Choose Template
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Your project's email template will be loaded
                  automatically.
                </p>
              </div>

              {/* STEP 3 */}

              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-left transition hover:border-stone-700 hover:bg-stone-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
                    3
                  </div>

                  <p className="text-sm font-semibold text-stone-200">
                    Enter Recipient
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Enter the recipient email and required
                  information.
                </p>
              </div>

              {/* STEP 4 */}

              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-left transition hover:border-stone-700 hover:bg-stone-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
                    4
                  </div>

                  <p className="text-sm font-semibold text-stone-200">
                    Fill Details
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Complete all required template variables
                  before sending.
                </p>
              </div>

              {/* STEP 5 */}

              <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-left transition hover:border-stone-700 hover:bg-stone-950">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
                    5
                  </div>

                  <p className="text-sm font-semibold text-stone-200">
                    Send Email
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-stone-600">
                  Confirm everything and send your test email
                  successfully.
                </p>
              </div>
            </div>

            {/* =================================================
                GETTING STARTED BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() => setStarted(true)}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0"
            >
              Getting Started
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN CONFIGURATION AREA
      ====================================================== */}

      {started && (
        <div className="mt-6 w-full">
          <div className="overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/70">
            {/* =================================================
                CONFIG HEADER
            ================================================== */}

            <div className="border-b border-stone-800 bg-stone-950/30 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Settings2 size={18} />
                </div>

                <div>
                  <h2 className="font-semibold text-stone-100">
                    Email Configuration
                  </h2>

                  <p className="mt-1 text-xs text-stone-500">
                    Configure and verify your test email before
                    sending.
                  </p>
                </div>
              </div>
            </div>

            {/* =================================================
                FORM CONTENT
            ================================================== */}

            <div className="p-5 sm:p-6">
              <EmailForm
                projects={projects}
                selectedProject={selectedProject}
                onProjectChange={handleProjectChange}
                template={template}
                recipientEmail={recipientEmail}
                onRecipientEmailChange={setRecipientEmail}
                recipientName={recipientName}
                onRecipientNameChange={setRecipientName}
                variableValues={variableValues}
                onVariableChange={handleVariableChange}
                disabled={sending}
              />

              {/* =================================================
                  PROJECT SUMMARY
              ================================================== */}

              {selectedProject && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-400">
                        <User size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-stone-600">
                          Project
                        </p>

                        <p className="mt-0.5 truncate text-sm font-medium text-stone-200">
                          {projectName}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-800 text-stone-400">
                        <Mail size={17} />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] uppercase tracking-wider text-stone-600">
                          Template
                        </p>

                        <p className="mt-0.5 truncate text-sm font-medium text-stone-200">
                          {templateName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  TEMPLATE NOT FOUND
              ================================================== */}

              {selectedProject && !template && (
                <div className="mt-5 rounded-2xl border border-orange-500/20 bg-orange-500/[0.04] p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                      <AlertCircle size={19} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-stone-100">
                        No template found
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-stone-500">
                        Create a template for this project
                        before sending an email.
                      </p>

                      <button
                        type="button"
                        onClick={handleGoToTemplates}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
                      >
                        Create Template
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* =================================================
                  API STATUS
              ================================================== */}

              {selectedProject && (
                <div className="mt-6 overflow-hidden rounded-2xl border border-stone-800 bg-stone-950/50">
                  <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                        <KeyRound size={18} />
                      </div>

                      <div>
                        <h3 className="font-semibold text-stone-100">
                          Production API
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-stone-500">
                          Your project's production API
                          configuration is checked automatically.
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium ${
                        apiKeyStatus === "ready"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                          : apiKeyStatus === "inactive"
                          ? "border-red-500/20 bg-red-500/10 text-red-400"
                          : "border-orange-500/20 bg-orange-500/10 text-orange-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          apiKeyStatus === "ready"
                            ? "bg-emerald-400"
                            : apiKeyStatus === "inactive"
                            ? "bg-red-400"
                            : "bg-orange-400"
                        }`}
                      />

                      {apiStatusText}
                    </span>
                  </div>

                  {/* READY */}

                  {apiKeyStatus === "ready" && (
                    <div className="border-t border-stone-800 p-5">
                      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2
                            size={19}
                            className="mt-0.5 shrink-0 text-emerald-400"
                          />

                          <div>
                            <p className="text-sm font-semibold text-emerald-400">
                              Production API is active
                            </p>

                            <p className="mt-1 text-xs leading-5 text-stone-500">
                              Your project is ready to send
                              emails.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* INACTIVE */}

                  {apiKeyStatus === "inactive" && (
                    <div className="border-t border-stone-800 p-5">
                      <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-4">
                        <div className="flex items-start gap-3">
                          <XCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-red-400"
                          />

                          <div>
                            <p className="text-sm font-semibold text-red-400">
                              Production API is inactive
                            </p>

                            <p className="mt-1 text-xs leading-5 text-stone-500">
                              Your production API key exists
                              but is currently inactive. Activate
                              it before sending.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoToApiKeys}
                        className="mt-3 inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm font-medium text-stone-200 transition hover:border-orange-500 hover:text-orange-400"
                      >
                        <KeyRound size={16} />
                        Open API Keys
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}

                  {/* NOT CREATED */}

                  {apiKeyStatus === "not-created" && (
                    <div className="border-t border-stone-800 p-5">
                      <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.04] p-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle
                            size={19}
                            className="mt-0.5 shrink-0 text-orange-400"
                          />

                          <div>
                            <p className="text-sm font-semibold text-stone-200">
                              Production API not created
                            </p>

                            <p className="mt-1 text-xs leading-5 text-stone-500">
                              Create a production API key from
                              API Keys before sending an email.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleGoToApiKeys}
                        className="mt-3 inline-flex items-center gap-2 rounded-xl border border-stone-700 bg-stone-900 px-4 py-2.5 text-sm font-medium text-stone-200 transition hover:border-orange-500 hover:text-orange-400"
                      >
                        <KeyRound size={16} />
                        Open API Keys
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* =================================================
                  SEND ACTION
              ================================================== */}

              {selectedProject && template && (
                <div className="mt-7 border-t border-stone-800 pt-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-200">
                        Ready to send?
                      </p>

                      <p className="mt-1 text-xs text-stone-600">
                        Review the recipient and template
                        details before sending.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendClick}
                      disabled={
                        sending ||
                        apiKeyStatus !== "ready"
                      }
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:-translate-y-0.5 hover:opacity-95 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                    >
                      {sending ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin"
                          />
                          Sending email...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Test Email
                        </>
                      )}
                    </button>
                  </div>

                  {apiKeyStatus !== "ready" && (
                    <div className="mt-4 rounded-xl border border-stone-800 bg-stone-950/50 px-4 py-3 text-center">
                      <p className="text-xs text-stone-600">
                        {apiKeyStatus === "inactive" &&
                          "Activate your production API from API Keys before sending."}

                        {apiKeyStatus === "not-created" &&
                          "Create a production API key from API Keys before sending."}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SENDING OVERLAY
      ====================================================== */}

      {sending && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-stone-800 bg-stone-900 p-7 text-center shadow-2xl">
            <img
              src="/gungif3.gif"
              alt="Sending email"
              className="mx-auto h-32 w-32 object-contain"
            />

            <h2 className="mt-4 text-lg font-semibold text-stone-100">
              Sending email...
            </h2>

            <p className="mt-2 text-sm leading-6 text-stone-500">
              Please wait while we securely process and send
              your email.
            </p>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-orange-400">
              <Loader2
                size={15}
                className="animate-spin"
              />

              Processing your request
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          CONFIRMATION MODAL
      ====================================================== */}

      {showConfirmation && !sending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-start justify-between border-b border-stone-800 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                  <Send size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-stone-100">
                    Send test email?
                  </h2>

                  <p className="mt-1 text-sm text-stone-500">
                    Please confirm the email details.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowConfirmation(false)
                }
                className="rounded-lg p-1.5 text-stone-600 transition hover:bg-stone-800 hover:text-stone-300"
              >
                <X size={18} />
              </button>
            </div>

            {/* MODAL BODY */}

            <div className="p-5">
              {/* RECIPIENT */}

              <div className="rounded-xl border border-stone-800 bg-stone-950 p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-stone-600">
                  Recipient
                </p>

                <p className="mt-1.5 break-all text-sm font-medium text-stone-200">
                  {recipientName
                    ? `${recipientName} <${recipientEmail}>`
                    : recipientEmail}
                </p>
              </div>

              {/* DETAILS */}

              <div className="mt-3 rounded-xl border border-stone-800 bg-stone-950 p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">
                    API Status
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">
                    Project
                  </span>

                  <span className="max-w-[220px] truncate text-right text-xs font-medium text-stone-300">
                    {projectName}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4">
                  <span className="text-xs text-stone-500">
                    Template
                  </span>

                  <span className="max-w-[220px] truncate text-right text-xs font-medium text-stone-300">
                    {templateName}
                  </span>
                </div>
              </div>

              {/* WARNING */}

              <div className="mt-4 rounded-xl border border-orange-500/10 bg-orange-500/[0.03] p-3.5">
                <div className="flex items-start gap-2.5">
                  <AlertCircle
                    size={16}
                    className="mt-0.5 shrink-0 text-orange-400"
                  />

                  <p className="text-xs leading-5 text-stone-500">
                    This will send a real test email to the
                    recipient above.
                  </p>
                </div>
              </div>
            </div>

            {/* MODAL ACTIONS */}

            <div className="flex gap-3 border-t border-stone-800 bg-stone-950/30 p-5">
              <button
                type="button"
                onClick={() =>
                  setShowConfirmation(false)
                }
                className="flex-1 rounded-xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm font-medium text-stone-300 transition hover:border-stone-600 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmSend}
                disabled={apiKeyStatus !== "ready"}
                className="flex-1 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirm & Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendEmail;