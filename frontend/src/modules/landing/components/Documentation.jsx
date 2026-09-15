import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Copy,
  ExternalLink,
  FileText,
  FolderKanban,
  KeyRound,
  Mail,
  Menu,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [copied, setCopied] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      description: "Understand MyMail",
      icon: BookOpen,
      color: "orange",
    },
    {
      id: "quick-start",
      title: "Quick Start",
      description: "Start sending emails",
      icon: Rocket,
      color: "yellow",
    },
    {
      id: "projects",
      title: "Projects",
      description: "Organize applications",
      icon: FolderKanban,
      color: "blue",
    },
    {
      id: "api-keys",
      title: "API Keys",
      description: "Secure authentication",
      icon: KeyRound,
      color: "purple",
    },
    {
      id: "templates",
      title: "Templates",
      description: "Dynamic email content",
      icon: FileText,
      color: "pink",
    },
    {
      id: "email-api",
      title: "Email API",
      description: "Send transactional emails",
      icon: Send,
      color: "orange",
    },
    {
      id: "email-logs",
      title: "Email Logs",
      description: "Monitor deliveries",
      icon: Mail,
      color: "green",
    },
    {
      id: "security",
      title: "Security",
      description: "Protect your integration",
      icon: ShieldCheck,
      color: "cyan",
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description: "Fix common problems",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const activeIndex = sections.findIndex(
    (section) => section.id === activeSection
  );

  const previousSection =
    activeIndex > 0 ? sections[activeIndex - 1] : null;

  const nextSection =
    activeIndex < sections.length - 1
      ? sections[activeIndex + 1]
      : null;

  const changeSection = (id) => {
    setActiveSection(id);
    setMobileOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyCode = async (code, id) => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(id);

      setTimeout(() => {
        setCopied("");
      }, 1800);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "introduction":
        return <Introduction />;

      case "quick-start":
        return <QuickStart />;

      case "projects":
        return <Projects />;

      case "api-keys":
        return <ApiKeys />;

      case "templates":
        return <Templates />;

      case "email-api":
        return (
          <EmailApi
            copied={copied}
            copyCode={copyCode}
          />
        );

      case "email-logs":
        return <EmailLogs />;

      case "security":
        return <Security />;

      case "troubleshooting":
        return <Troubleshooting />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white">

      {/* ============================================== */}
      {/* FIXED TOP NAVBAR */}
      {/* ============================================== */}

      <header
        className="
          fixed
          inset-x-0
          top-0
          z-[100]
          h-[72px]
          border-b
          border-white/[0.07]
          bg-[#070707]/90
          backdrop-blur-2xl
        "
      >
        <div
          className="
            flex
            h-full
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* LOGO */}

          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div
              className="
                relative
                h-10
                w-10
                overflow-hidden
                rounded-xl
                border
                border-orange-500/20
                bg-orange-500/10
                shadow-lg
                shadow-orange-500/10
                transition
                duration-300
                group-hover:scale-105
              "
            >
              <img
                src="/gungif3.gif"
                alt="MyMail"
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-orange-500/10" />
            </div>

            <div className="hidden sm:block">
              <div className="text-base font-black tracking-tight">
                My
                <span className="text-orange-400">
                  Mail
                </span>
              </div>

              <div className="text-[9px] uppercase tracking-[0.2em] text-stone-600">
                Developer Docs
              </div>
            </div>
          </Link>

          {/* CENTER */}

          <div className="hidden items-center gap-2 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-green-500/10 bg-green-500/[0.04] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-green-500" />
              </span>

              <span className="text-[10px] font-medium text-stone-400">
                All systems operational
              </span>
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">

            <Link
              to="/"
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                border
                border-white/10
                px-3
                py-2
                text-xs
                text-stone-400
                transition
                hover:border-orange-500/30
                hover:text-white
                sm:flex
              "
            >
              <ArrowLeft size={14} />
              Back to MyMail
            </Link>

            <Link
              to="/register"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-orange-500
                px-3
                py-2
                text-xs
                font-bold
                text-black
                shadow-lg
                shadow-orange-500/10
                transition
                hover:-translate-y-0.5
                hover:bg-orange-400
              "
            >
              <span className="hidden sm:inline">
                Get Started
              </span>

              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
                rounded-xl
                border
                border-white/10
                p-2
                text-stone-400
                lg:hidden
              "
            >
              {mobileOpen ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>

          </div>
        </div>
      </header>


      {/* ============================================== */}
      {/* MOBILE SIDEBAR */}
      {/* ============================================== */}

      {mobileOpen && (
        <div
          className="
            fixed
            inset-x-0
            top-[72px]
            z-[90]
            border-b
            border-white/10
            bg-[#090909]
            p-4
            shadow-2xl
            lg:hidden
          "
        >
          <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">
            Documentation
          </div>

          <div className="grid gap-1.5">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => changeSection(section.id)}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    px-3
                    py-3
                    text-left
                    transition-all
                    ${
                      active
                        ? "border-orange-500/20 bg-orange-500/10 text-orange-400"
                        : "border-transparent text-stone-500 hover:bg-white/[0.03] hover:text-white"
                    }
                  `}
                >
                  <Icon size={16} />

                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {section.title}
                    </div>

                    <div className="text-[10px] text-stone-600">
                      {section.description}
                    </div>
                  </div>

                  {active && (
                    <ChevronRight size={15} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}


      {/* ============================================== */}
      {/* MAIN APPLICATION */}
      {/* ============================================== */}

      <div className="flex min-h-screen pt-[72px]">

        {/* ============================================ */}
        {/* FIXED SIDEBAR */}
        {/* ============================================ */}

        <aside
          className="
            fixed
            bottom-0
            left-0
            top-[72px]
            hidden
            w-[270px]
            border-r
            border-white/[0.06]
            bg-[#080808]
            lg:block
          "
        >
          <div className="flex h-full flex-col">

            {/* SIDEBAR HEADER */}

            <div className="border-b border-white/[0.05] px-5 py-5">

              <div className="mb-1 flex items-center gap-2">
                <BookOpen
                  size={15}
                  className="text-orange-400"
                />

                <span className="text-xs font-bold text-white">
                  Documentation
                </span>
              </div>

              <p className="text-[10px] leading-5 text-stone-600">
                Everything you need to integrate MyMail.
              </p>

            </div>


            {/* SIDEBAR LIST */}

            <nav className="flex-1 overflow-y-auto px-3 py-5">

              <div className="mb-3 px-2 text-[9px] font-bold uppercase tracking-[0.22em] text-stone-700">
                Guides
              </div>

              <div className="space-y-1">

                {sections.map((section, index) => {
                  const Icon = section.icon;
                  const active =
                    activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        changeSection(section.id)
                      }
                      className={`
                        group
                        relative
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        border
                        px-3
                        py-2.5
                        text-left
                        transition-all
                        duration-300
                        ${
                          active
                            ? `
                              border-orange-500/20
                              bg-gradient-to-r
                              from-orange-500/10
                              to-transparent
                              text-white
                              shadow-lg
                              shadow-orange-500/[0.03]
                            `
                            : `
                              border-transparent
                              text-stone-500
                              hover:border-white/[0.05]
                              hover:bg-white/[0.025]
                              hover:text-stone-200
                            `
                        }
                      `}
                    >

                      {/* ACTIVE INDICATOR */}

                      {active && (
                        <span
                          className="
                            absolute
                            bottom-2
                            left-0
                            top-2
                            w-[2px]
                            rounded-full
                            bg-orange-400
                            shadow-[0_0_12px_rgba(251,146,60,0.8)]
                          "
                        />
                      )}

                      <div
                        className={`
                          flex
                          h-8
                          w-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          transition-all
                          ${
                            active
                              ? "bg-orange-500/10 text-orange-400"
                              : "bg-white/[0.025] text-stone-600 group-hover:text-stone-300"
                          }
                        `}
                      >
                        <Icon size={15} />
                      </div>

                      <div className="min-w-0 flex-1">

                        <div
                          className={`
                            truncate
                            text-xs
                            font-semibold
                            ${
                              active
                                ? "text-white"
                                : "text-stone-400"
                            }
                          `}
                        >
                          {section.title}
                        </div>

                        <div className="mt-0.5 truncate text-[9px] text-stone-700">
                          {section.description}
                        </div>

                      </div>

                      {active && (
                        <ChevronRight
                          size={13}
                          className="text-orange-400"
                        />
                      )}

                    </button>
                  );
                })}

              </div>
            </nav>


            {/* SIDEBAR FOOTER */}

            <div className="border-t border-white/[0.05] p-4">

              <div className="rounded-2xl border border-orange-500/10 bg-orange-500/[0.03] p-4">

                <div className="mb-3 flex items-center gap-2">
                  <Sparkles
                    size={14}
                    className="text-orange-400"
                  />

                  <span className="text-[10px] font-bold text-orange-300">
                    Need help?
                  </span>
                </div>

                <p className="mb-3 text-[10px] leading-5 text-stone-600">
                  Check the troubleshooting guide or contact support.
                </p>

                <Link
                  to="/"
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-white/[0.04]
                    px-3
                    py-2
                    text-[10px]
                    font-semibold
                    text-stone-400
                    transition
                    hover:bg-white/[0.07]
                    hover:text-white
                  "
                >
                  Contact Support
                  <ExternalLink size={11} />
                </Link>

              </div>

            </div>

          </div>
        </aside>


        {/* ============================================ */}
        {/* CONTENT AREA */}
        {/* ============================================ */}

        <main className="min-w-0 flex-1 lg:ml-[270px]">

          {/* TOP CONTENT BAR */}

          <div
            className="
              sticky
              top-[72px]
              z-40
              hidden
              border-b
              border-white/[0.05]
              bg-[#070707]/85
              backdrop-blur-xl
              lg:block
            "
          >
            <div className="flex h-12 items-center justify-between px-8">

              <div className="flex items-center gap-2 text-[10px] text-stone-600">
                <span>Docs</span>

                <ChevronRight size={12} />

                <span className="text-stone-400">
                  {
                    sections.find(
                      (section) =>
                        section.id === activeSection
                    )?.title
                  }
                </span>
              </div>

              <div className="flex items-center gap-3">

                <span className="text-[9px] uppercase tracking-wider text-stone-700">
                  Section
                </span>

                <span className="text-[10px] font-bold text-orange-400">
                  {String(activeIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(sections.length).padStart(2, "0")}
                </span>

              </div>

            </div>
          </div>


          {/* DOCUMENT */}

          <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">

            {/* SECTION ANIMATION */}

            <div
              key={activeSection}
              className="animate-[docEnter_.45s_ease-out]"
            >
              {renderContent()}
            </div>


            {/* PREVIOUS / NEXT */}

            <div className="mt-16 grid gap-3 border-t border-white/[0.06] pt-8 sm:grid-cols-2">

              {previousSection ? (
                <button
                  onClick={() =>
                    changeSection(previousSection.id)
                  }
                  className="
                    group
                    rounded-2xl
                    border
                    border-white/[0.06]
                    bg-white/[0.015]
                    p-5
                    text-left
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-orange-500/20
                    hover:bg-orange-500/[0.025]
                  "
                >
                  <div className="mb-2 flex items-center gap-2 text-[9px] uppercase tracking-widest text-stone-700">
                    <ArrowLeft size={12} />
                    Previous
                  </div>

                  <div className="text-sm font-bold text-stone-300 transition group-hover:text-white">
                    {previousSection.title}
                  </div>
                </button>
              ) : (
                <div />
              )}


              {nextSection && (
                <button
                  onClick={() =>
                    changeSection(nextSection.id)
                  }
                  className="
                    group
                    rounded-2xl
                    border
                    border-orange-500/10
                    bg-orange-500/[0.025]
                    p-5
                    text-right
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-orange-500/25
                    hover:bg-orange-500/[0.05]
                  "
                >
                  <div className="mb-2 flex items-center justify-end gap-2 text-[9px] uppercase tracking-widest text-orange-500/50">
                    Next
                    <ArrowRight size={12} />
                  </div>

                  <div className="text-sm font-bold text-stone-300 transition group-hover:text-white">
                    {nextSection.title}
                  </div>
                </button>
              )}

            </div>

          </div>

        </main>

      </div>


      {/* GLOBAL ANIMATION */}

      <style>
        {`
          @keyframes docEnter {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          ::selection {
            background: rgba(249, 115, 22, 0.25);
            color: white;
          }

          ::-webkit-scrollbar {
            width: 6px;
          }

          ::-webkit-scrollbar-track {
            background: #070707;
          }

          ::-webkit-scrollbar-thumb {
            background: #292524;
            border-radius: 999px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #44403c;
          }
        `}
      </style>

    </div>
  );
};


/* ========================================================= */
/* INTRODUCTION */
/* ========================================================= */

const Introduction = () => {
  return (
    <DocPage
      icon={BookOpen}
      eyebrow="GETTING STARTED"
      title="Introduction"
      description="Everything you need to understand and integrate MyMail into your application."
    >

      <DocText>
        MyMail is a developer-first email infrastructure platform
        designed to make transactional email simple, reliable and
        secure.
      </DocText>

      <InfoGrid
        items={[
          ["Create Projects", "Keep applications isolated"],
          ["Email Templates", "Build reusable email content"],
          ["API Keys", "Secure server authentication"],
          ["Email API", "Send transactional emails"],
          ["Email Logs", "Monitor delivery activity"],
          ["Security", "Protect your integration"],
        ]}
      />

      <DocHeading>
        How MyMail Works
      </DocHeading>

      <Architecture>
        <ArchitectureItem icon={Code2}>
          Your Application
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={Send}>
          MyMail API
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={FolderKanban}>
          Project
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={FileText}>
          Template
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={Mail}>
          Email Service
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={CheckCircle2}>
          Recipient
        </ArchitectureItem>
      </Architecture>

      <Callout type="success">
        MyMail handles the email infrastructure so your application can
        focus on delivering the actual product experience.
      </Callout>

    </DocPage>
  );
};


/* ========================================================= */
/* QUICK START */
/* ========================================================= */

const QuickStart = () => {
  return (
    <DocPage
      icon={Rocket}
      eyebrow="QUICK START"
      title="Start sending emails"
      description="Go from zero to your first transactional email in a few simple steps."
    >

      <Step
        number="01"
        title="Create an Account"
        description="Create your MyMail account and open your dashboard."
      />

      <Step
        number="02"
        title="Create a Project"
        description="Create a dedicated project for your application."
      />

      <Step
        number="03"
        title="Create a Template"
        description="Build your email template and define the variables it requires."
      />

      <Step
        number="04"
        title="Generate API Key"
        description="Generate a production API key for your project."
      />

      <Step
        number="05"
        title="Send Your First Email"
        description="Connect your backend application to the MyMail API."
      />

      <Callout type="info">
        Keep your API key in an environment variable and never expose
        production credentials to browser code.
      </Callout>

    </DocPage>
  );
};


/* ========================================================= */
/* PROJECTS */
/* ========================================================= */

const Projects = () => {
  return (
    <DocPage
      icon={FolderKanban}
      eyebrow="PROJECT MANAGEMENT"
      title="Projects"
      description="Organize your applications and email infrastructure into isolated workspaces."
    >

      <DocText>
        A project represents an isolated workspace for an application.
        Templates, API keys and email logs are associated with the project.
      </DocText>

      <CodeBlock>
{`Project
 ├── Templates
 ├── API Keys
 ├── Email Configuration
 └── Email Logs`}
      </CodeBlock>

      <DocHeading>
        Recommended Workflow
      </DocHeading>

      <Step
        number="01"
        title="Create Project"
        description="Open the Projects section and create a new project."
      />

      <Step
        number="02"
        title="Configure Templates"
        description="Add the templates required by your application."
      />

      <Step
        number="03"
        title="Configure API"
        description="Generate an active production API key."
      />

    </DocPage>
  );
};


/* ========================================================= */
/* API KEYS */
/* ========================================================= */

const ApiKeys = () => {
  return (
    <DocPage
      icon={KeyRound}
      eyebrow="AUTHENTICATION"
      title="API Keys"
      description="Authenticate production API requests securely."
    >

      <DocText>
        API keys authenticate requests made from your backend application
        to the MyMail API.
      </DocText>

      <Callout type="warning">
        Never expose your production API key inside frontend, browser
        or client-side code.
      </Callout>

      <DocHeading>
        Never Store API Keys In
      </DocHeading>

      <InfoGrid
        items={[
          ["React Source", "Never place secrets in components"],
          ["Public JavaScript", "Browser code is visible"],
          ["GitHub", "Never commit production secrets"],
          ["localStorage", "Avoid storing sensitive credentials"],
          ["sessionStorage", "Not suitable for API secrets"],
          ["Client Apps", "Use your backend instead"],
        ]}
      />

      <DocHeading>
        Recommended Architecture
      </DocHeading>

      <Architecture>
        <ArchitectureItem icon={Code2}>
          Your Backend
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={KeyRound}>
          Environment Variable
        </ArchitectureItem>

        <ArchitectureArrow />

        <ArchitectureItem icon={Send}>
          MyMail API
        </ArchitectureItem>
      </Architecture>

    </DocPage>
  );
};


/* ========================================================= */
/* TEMPLATES */
/* ========================================================= */

const Templates = () => {
  return (
    <DocPage
      icon={FileText}
      eyebrow="EMAIL TEMPLATES"
      title="Templates"
      description="Create reusable emails with powerful dynamic variables."
    >

      <DocText>
        Templates allow you to create reusable email content instead
        of rebuilding the same email every time.
      </DocText>

      <DocHeading>
        Example Template
      </DocHeading>

      <CodeBlock>
{`Subject:
Welcome {{name}}

Body:

Hello {{name}},

Welcome to {{company}}.

Your verification code is {{code}}.`}
      </CodeBlock>

      <DocHeading>
        Template Data
      </DocHeading>

      <CodeBlock>
{`{
  "name": "John",
  "company": "Acme",
  "code": "123456"
}`}
      </CodeBlock>

      <Callout type="success">
        MyMail replaces template variables with the values supplied
        by your backend application.
      </Callout>

    </DocPage>
  );
};


/* ========================================================= */
/* EMAIL API */
/* ========================================================= */

const EmailApi = ({ copied, copyCode }) => {
  const code = `const response = await fetch(
  "https://api.mymail.dev/v1/email",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.MYMAIL_API_KEY,
    },

    body: JSON.stringify({
      templateId: "welcome-email",
      to: "john@example.com",

      data: {
        name: "John",
      },
    }),
  }
);`;

  return (
    <DocPage
      icon={Send}
      eyebrow="API REFERENCE"
      title="Email API"
      description="Send transactional emails from your backend application."
    >

      <DocText>
        The MyMail Email API is designed for secure server-side
        integrations.
      </DocText>

      <DocHeading>
        Authentication
      </DocHeading>

      <CodeBlock>
{`x-api-key: YOUR_PRODUCTION_API_KEY`}
      </CodeBlock>

      <DocHeading>
        Request Body
      </DocHeading>

      <CodeBlock>
{`{
  "templateId": "welcome-email",
  "to": "john@example.com",
  "data": {
    "name": "John",
    "code": "123456"
  }
}`}
      </CodeBlock>

      <DocHeading>
        Node.js Example
      </DocHeading>

      <div className="relative">

        <button
          onClick={() =>
            copyCode(code, "email-api")
          }
          className="
            absolute
            right-3
            top-3
            z-10
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-white/10
            bg-stone-900
            px-3
            py-2
            text-[10px]
            font-semibold
            text-stone-400
            transition
            hover:border-orange-500/30
            hover:text-white
          "
        >
          {copied === "email-api" ? (
            <>
              <Check
                size={13}
                className="text-green-400"
              />
              Copied
            </>
          ) : (
            <>
              <Copy size={13} />
              Copy
            </>
          )}
        </button>

        <CodeBlock>
          {code}
        </CodeBlock>

      </div>

      <Callout type="warning">
        Keep your production API key on your backend and never expose
        it to frontend users.
      </Callout>

    </DocPage>
  );
};


/* ========================================================= */
/* EMAIL LOGS */
/* ========================================================= */

const EmailLogs = () => {
  return (
    <DocPage
      icon={Mail}
      eyebrow="OBSERVABILITY"
      title="Email Logs"
      description="Monitor email activity and delivery status across your projects."
    >

      <DocText>
        Email Logs provide visibility into messages processed by your
        MyMail projects.
      </DocText>

      <InfoGrid
        items={[
          ["Recipient", "Email destination"],
          ["Project", "Associated project"],
          ["Template", "Used email template"],
          ["Status", "Current delivery state"],
          ["Message ID", "Unique message identifier"],
          ["Created", "Creation timestamp"],
          ["Sent", "Delivery timestamp"],
          ["Failure Reason", "Error details"],
        ]}
      />

      <DocHeading>
        Email Statuses
      </DocHeading>

      <StatusRow
        status="pending"
        description="Email is currently being processed."
      />

      <StatusRow
        status="sent"
        description="Email was successfully sent."
      />

      <StatusRow
        status="failed"
        description="Email could not be sent."
      />

    </DocPage>
  );
};


/* ========================================================= */
/* SECURITY */
/* ========================================================= */

const Security = () => {
  const items = [
    "Keep production API keys on your backend.",
    "Store secrets using environment variables.",
    "Never commit API keys to Git repositories.",
    "Never expose provider credentials to frontend applications.",
    "Rotate compromised API keys immediately.",
    "Validate API errors in your application.",
  ];

  return (
    <DocPage
      icon={ShieldCheck}
      eyebrow="BEST PRACTICES"
      title="Security"
      description="Recommended practices for keeping your MyMail integration secure."
    >

      <div className="space-y-3">

        {items.map((item) => (
          <SecurityItem key={item}>
            {item}
          </SecurityItem>
        ))}

      </div>

      <Callout type="success">
        Treat API keys exactly like database passwords and other
        production secrets.
      </Callout>

    </DocPage>
  );
};


/* ========================================================= */
/* TROUBLESHOOTING */
/* ========================================================= */

const Troubleshooting = () => {
  return (
    <DocPage
      icon={AlertTriangle}
      eyebrow="HELP & DEBUGGING"
      title="Troubleshooting"
      description="Common issues and recommended solutions."
    >

      <DocHeading>
        Email is not being sent
      </DocHeading>

      <InfoGrid
        items={[
          ["Project", "Verify that the project exists"],
          ["Template", "Verify that the template exists"],
          ["API", "Verify that the production API is active"],
          ["API Key", "Verify that the key is valid"],
          ["Variables", "Verify all required variables"],
          ["Recipient", "Verify the recipient email"],
        ]}
      />

      <DocHeading>
        Authentication Error
      </DocHeading>

      <DocText>
        Check that your production API key is valid, active and being
        sent using the correct authentication header.
      </DocText>

      <DocHeading>
        Daily Limit Exceeded
      </DocHeading>

      <DocText>
        Your request may be rejected when the configured sending limit
        has been reached.
      </DocText>

      <DocHeading>
        404 Error
      </DocHeading>

      <DocText>
        Verify your API base URL, endpoint and HTTP method.
      </DocText>

      <Callout type="warning">
        If the issue continues, check the Email Logs section for the
        message ID and failure reason.
      </Callout>

    </DocPage>
  );
};


/* ========================================================= */
/* DOC PAGE */
/* ========================================================= */

const DocPage = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}) => {
  return (
    <div>

      {/* HERO */}

      <div className="relative mb-12 overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-orange-500/[0.07] via-transparent to-transparent p-6 sm:p-8 lg:p-10">

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-orange-500/10
            blur-[90px]
          "
        />

        <div className="relative">

          <div className="mb-5 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-orange-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
            {eyebrow}
          </div>

          <div className="flex items-start gap-4">

            <div
              className="
                hidden
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-orange-500/20
                bg-orange-500/10
                text-orange-400
                shadow-lg
                shadow-orange-500/5
                sm:flex
              "
            >
              <Icon size={25} />
            </div>

            <div>

              <h1
                className="
                  text-3xl
                  font-black
                  tracking-[-0.03em]
                  text-white
                  sm:text-4xl
                  lg:text-5xl
                "
              >
                {title}
              </h1>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-sm
                  leading-7
                  text-stone-400
                  sm:text-base
                "
              >
                {description}
              </p>

            </div>

          </div>

        </div>
      </div>


      {/* CONTENT */}

      <div className="space-y-0">
        {children}
      </div>

    </div>
  );
};


/* ========================================================= */
/* TEXT */
/* ========================================================= */

const DocText = ({ children }) => {
  return (
    <p
      className="
        mb-8
        max-w-3xl
        text-sm
        leading-7
        text-stone-400
        sm:text-[15px]
      "
    >
      {children}
    </p>
  );
};


/* ========================================================= */
/* HEADING */
/* ========================================================= */

const DocHeading = ({ children }) => {
  return (
    <div className="mb-4 mt-10 flex items-center gap-3">

      <div className="h-5 w-1 rounded-full bg-orange-500" />

      <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
        {children}
      </h2>

    </div>
  );
};


/* ========================================================= */
/* INFO GRID */
/* ========================================================= */

const InfoGrid = ({ items }) => {
  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-2">

      {items.map((item) => {

        const title = Array.isArray(item)
          ? item[0]
          : item;

        const description = Array.isArray(item)
          ? item[1]
          : null;

        return (
          <div
            key={title}
            className="
              group
              relative
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.06]
              bg-white/[0.02]
              p-4
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-500/20
              hover:bg-orange-500/[0.025]
            "
          >

            <div className="absolute right-0 top-0 h-16 w-16 rounded-full bg-orange-500/5 blur-2xl transition group-hover:bg-orange-500/10" />

            <div className="relative flex items-start gap-3">

              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-500/10">
                <Check
                  size={14}
                  className="text-orange-400"
                />
              </div>

              <div>

                <div className="text-sm font-semibold text-stone-200">
                  {title}
                </div>

                {description && (
                  <div className="mt-1 text-[11px] leading-5 text-stone-600">
                    {description}
                  </div>
                )}

              </div>

            </div>

          </div>
        );
      })}

    </div>
  );
};


/* ========================================================= */
/* STEP */
/* ========================================================= */

const Step = ({
  number,
  title,
  description,
}) => {
  return (
    <div
      className="
        group
        relative
        mb-4
        flex
        gap-4
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        p-5
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-orange-500/20
        hover:bg-orange-500/[0.025]
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-orange-500
          text-[10px]
          font-black
          text-black
          shadow-lg
          shadow-orange-500/20
        "
      >
        {number}
      </div>

      <div className="min-w-0">

        <h3 className="font-bold text-white">
          {title}
        </h3>

        <p className="mt-1.5 text-sm leading-6 text-stone-500">
          {description}
        </p>

      </div>

    </div>
  );
};


/* ========================================================= */
/* ARCHITECTURE */
/* ========================================================= */

const Architecture = ({ children }) => {
  return (
    <div
      className="
        mb-8
        flex
        flex-col
        items-center
        rounded-3xl
        border
        border-orange-500/10
        bg-gradient-to-b
        from-orange-500/[0.035]
        to-transparent
        p-5
        sm:p-7
      "
    >
      {children}
    </div>
  );
};


const ArchitectureItem = ({
  icon: Icon,
  children,
}) => {
  return (
    <div
      className="
        flex
        w-full
        max-w-sm
        items-center
        gap-3
        rounded-xl
        border
        border-white/[0.06]
        bg-stone-900/80
        px-4
        py-3
        text-sm
        font-semibold
        text-stone-300
        shadow-xl
        transition
        hover:border-orange-500/20
        hover:text-white
      "
    >

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
        <Icon
          size={15}
          className="text-orange-400"
        />
      </div>

      {children}

    </div>
  );
};


const ArchitectureArrow = () => {
  return (
    <div className="flex h-8 items-center justify-center text-orange-500/40">
      <ArrowRight
        size={16}
        className="rotate-90"
      />
    </div>
  );
};


/* ========================================================= */
/* CODE BLOCK */
/* ========================================================= */

const CodeBlock = ({ children }) => {
  return (
    <pre
      className="
        mb-8
        overflow-x-auto
        rounded-2xl
        border
        border-white/[0.06]
        bg-[#050505]
        p-5
        font-mono
        text-xs
        leading-7
        text-stone-300
        shadow-2xl
        sm:p-6
        sm:text-sm
      "
    >
      <code>{children}</code>
    </pre>
  );
};


/* ========================================================= */
/* CALLOUT */
/* ========================================================= */

const Callout = ({
  type = "info",
  children,
}) => {

  const styles = {
    info: {
      border: "border-blue-500/15",
      bg: "bg-blue-500/[0.035]",
      icon: "text-blue-400",
      Icon: Circle,
    },

    success: {
      border: "border-green-500/15",
      bg: "bg-green-500/[0.035]",
      icon: "text-green-400",
      Icon: CheckCircle2,
    },

    warning: {
      border: "border-yellow-500/15",
      bg: "bg-yellow-500/[0.035]",
      icon: "text-yellow-400",
      Icon: AlertTriangle,
    },
  };

  const style = styles[type];
  const Icon = style.Icon;

  return (
    <div
      className={`
        mb-8
        flex
        gap-3
        rounded-2xl
        border
        p-4
        text-sm
        leading-6
        text-stone-300
        ${style.border}
        ${style.bg}
      `}
    >

      <Icon
        size={18}
        className={`mt-0.5 shrink-0 ${style.icon}`}
      />

      <div>
        {children}
      </div>

    </div>
  );
};


/* ========================================================= */
/* STATUS */
/* ========================================================= */

const StatusRow = ({
  status,
  description,
}) => {

  const colors = {
    pending:
      "border-yellow-500/10 bg-yellow-500/[0.025] text-yellow-400",

    sent:
      "border-green-500/10 bg-green-500/[0.025] text-green-400",

    failed:
      "border-red-500/10 bg-red-500/[0.025] text-red-400",
  };

  return (
    <div
      className="
        mb-3
        flex
        flex-col
        gap-3
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >

      <span
        className={`
          w-fit
          rounded-lg
          border
          px-3
          py-1
          text-[9px]
          font-black
          uppercase
          tracking-widest
          ${colors[status]}
        `}
      >
        {status}
      </span>

      <span className="text-sm text-stone-500">
        {description}
      </span>

    </div>
  );
};


/* ========================================================= */
/* SECURITY ITEM */
/* ========================================================= */

const SecurityItem = ({ children }) => {
  return (
    <div
      className="
        group
        flex
        items-start
        gap-3
        rounded-2xl
        border
        border-white/[0.06]
        bg-white/[0.02]
        p-4
        text-sm
        leading-6
        text-stone-300
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-green-500/15
        hover:bg-green-500/[0.025]
      "
    >

      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
        <ShieldCheck
          size={15}
          className="text-green-400"
        />
      </div>

      <span>{children}</span>

    </div>
  );
};


export default Documentation;
