import {
  BookOpen,
  Rocket,
  FolderKanban,
  KeyRound,
  FileText,
  Send,
  Mail,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
} from "lucide-react";

import { useState } from "react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: BookOpen,
    },
    {
      id: "quick-start",
      title: "Quick Start",
      icon: Rocket,
    },
    {
      id: "projects",
      title: "Projects",
      icon: FolderKanban,
    },
    {
      id: "api-keys",
      title: "API Keys",
      icon: KeyRound,
    },
    {
      id: "templates",
      title: "Templates",
      icon: FileText,
    },
    {
      id: "email-api",
      title: "Email API",
      icon: Send,
    },
    {
      id: "email-logs",
      title: "Email Logs",
      icon: Mail,
    },
    {
      id: "security",
      title: "Security",
      icon: ShieldCheck,
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: AlertTriangle,
    },
  ];

  const copyCode = async () => {
    const code = `const response = await fetch(
  "http://localhost:5000/api/email/send",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY",
    },

    body: JSON.stringify({
      to: "john@example.com",

      data: {
        appName: "MyMail",
        userName: "John",
        resetLink: "https://example.com/reset",
        supportEmail: "support@example.com",
        companyName: "MyMail",
      },
    }),
  }
);`;

    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <>
            <SectionHeader
              icon={BookOpen}
              title="Introduction"
              description="Welcome to MyMail developer documentation."
            />

            <DocText>
              MyMail is an email infrastructure platform that allows
              developers to send transactional emails using reusable templates
              and a secure API.
            </DocText>

            <InfoGrid
              items={[
                "Create projects",
                "Create email templates",
                "Manage API keys",
                "Send transactional emails",
                "Test email configuration",
                "Track email activity",
              ]}
            />

            <DocHeading>How MyMail Works</DocHeading>

            <Architecture>
              <span>Your Application</span>
              <span className="text-stone-600">↓</span>
              <span>MyMail API</span>
              <span className="text-stone-600">↓</span>
              <span>API Key</span>
              <span className="text-stone-600">↓</span>
              <span>Project</span>
              <span className="text-stone-600">↓</span>
              <span>Assigned Template</span>
              <span className="text-stone-600">↓</span>
              <span>Email Service</span>
              <span className="text-stone-600">↓</span>
              <span>Email Provider</span>
              <span className="text-stone-600">↓</span>
              <span>Recipient</span>
            </Architecture>

            <InfoBox>
              Each project uses its configured API key and assigned email
              template. Your application does not need to send a project ID or
              template ID with every email request.
            </InfoBox>
          </>
        );

      case "quick-start":
        return (
          <>
            <SectionHeader
              icon={Rocket}
              title="Quick Start"
              description="Send your first email with MyMail."
            />

            <DocText>
              Follow these steps to configure your project and start sending
              emails through the MyMail API.
            </DocText>

            <Step number="01" title="Create a Project">
              Create a project from the Projects section of your dashboard.
            </Step>

            <Step number="02" title="Create a Template">
              Create an email template and define the dynamic variables
              required by your email.
            </Step>

            <Step number="03" title="Assign the Template">
              Assign the required template to your project. The assigned
              template will automatically be used when the project API key is
              used.
            </Step>

            <Step number="04" title="Create a Production API Key">
              Generate an active production API key for your project.
            </Step>

            <Step number="05" title="Integrate the API">
              Use the production API key from your backend application to send
              emails.
            </Step>

            <Step number="06" title="Send Emails">
              Send the recipient email address and the required template data
              to the MyMail Email API.
            </Step>
          </>
        );

      case "projects":
        return (
          <>
            <SectionHeader
              icon={FolderKanban}
              title="Projects"
              description="Organize your email infrastructure with projects."
            />

            <DocText>
              A project represents an isolated workspace for your application.
              Each project contains its API key, assigned email template and
              email activity.
            </DocText>

            <CodeBlock>
              {`Project
 ├── API Key
 ├── Assigned Template
 ├── Email Configuration
 └── Email Logs`}
            </CodeBlock>

            <DocHeading>Project Workflow</DocHeading>

            <Step number="01" title="Create Project">
              Open Projects and create a new project.
            </Step>

            <Step number="02" title="Configure Template">
              Create and assign the email template required by your
              application.
            </Step>

            <Step number="03" title="Create API Key">
              Generate an active production API key for the project.
            </Step>

            <Step number="04" title="Integrate">
              Use the API key in your backend application to send emails.
            </Step>

            <InfoBox>
              The API key identifies the project automatically. You do not
              need to send the project ID in the email request.
            </InfoBox>
          </>
        );

      case "api-keys":
        return (
          <>
            <SectionHeader
              icon={KeyRound}
              title="API Keys"
              description="Authenticate your production API requests securely."
            />

            <DocText>
              API keys authenticate requests to the MyMail production email
              API. Each project has its own API key.
            </DocText>

            <Warning>
              Never expose your production API key in frontend or browser
              code.
            </Warning>

            <DocHeading>API Key Usage</DocHeading>

            <CodeBlock>
              {`x-api-key: YOUR_API_KEY`}
            </CodeBlock>

            <DocHeading>Never Store API Keys In</DocHeading>

            <InfoGrid
              items={[
                "React source code",
                "Public JavaScript",
                "GitHub repositories",
                "localStorage",
                "sessionStorage",
                "Client-side application code",
              ]}
            />

            <DocHeading>Recommended Architecture</DocHeading>

            <Architecture>
              <span>Your Backend</span>
              <span className="text-stone-600">↓</span>
              <span>Environment Variable</span>
              <span className="text-stone-600">↓</span>
              <span>MyMail API</span>
            </Architecture>

            <CodeBlock>
              {`MYMAIL_API_KEY=YOUR_API_KEY`}
            </CodeBlock>
          </>
        );

      case "templates":
        return (
          <>
            <SectionHeader
              icon={FileText}
              title="Templates"
              description="Create reusable email templates with dynamic variables."
            />

            <DocText>
              Templates allow you to define reusable email content with
              dynamic variables. The template assigned to a project is
              automatically selected by the MyMail API.
            </DocText>

            <CodeBlock>
              {`Subject:
Welcome {{name}}

Body:

Hello {{name}},

Welcome to {{company}}.

Your verification code is {{code}}.`}
            </CodeBlock>

            <DocHeading>Template Variables</DocHeading>

            <CodeBlock>
              {`{
  "name": "John",
  "company": "Acme",
  "code": "123456"
}`}
            </CodeBlock>

            <DocText>
              MyMail replaces the variables in the assigned template with the
              values supplied in the API request.
            </DocText>

            <InfoBox>
              You do not need to send a template ID in your API request. MyMail
              automatically uses the template assigned to the API key's
              project.
            </InfoBox>
          </>
        );

      case "email-api":
        return (
          <>
            <SectionHeader
              icon={Send}
              title="Email API"
              description="Integrate MyMail into your backend application."
            />

            <DocText>
              The MyMail Email API allows your backend application to send
              transactional emails using a project's API key and assigned
              template.
            </DocText>

            <DocHeading>Endpoint</DocHeading>

            <CodeBlock>
              {`POST http://localhost:5000/api/email/send`}
            </CodeBlock>

            <DocHeading>Authentication</DocHeading>

            <CodeBlock>
              {`x-api-key: YOUR_API_KEY`}
            </CodeBlock>

            <DocHeading>Request Body</DocHeading>

            <CodeBlock>
              {`{
  "to": "john@example.com",

  "data": {
    "appName": "MyMail",
    "userName": "John",
    "resetLink": "https://example.com/reset",
    "supportEmail": "support@example.com",
    "companyName": "MyMail"
  }
}`}
            </CodeBlock>

            <InfoBox>
              The exact variables inside the <strong>data</strong> object
              depend on the template assigned to your project.
            </InfoBox>

            <DocHeading>Node.js Integration</DocHeading>

            <div className="relative">

              <button
                type="button"
                onClick={copyCode}
                className="
                  absolute
                  right-3
                  top-3
                  z-10
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
                  text-stone-300
                  transition
                  hover:border-orange-500/40
                  hover:text-white
                "
              >
                {copied ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>

              <CodeBlock>
                {`const response = await fetch(
  "http://localhost:5000/api/email/send",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      "x-api-key": "YOUR_API_KEY",
    },

    body: JSON.stringify({
      to: "john@example.com",

      data: {
        appName: "MyMail",
        userName: "John",
        resetLink: "https://example.com/reset",
        supportEmail: "support@example.com",
        companyName: "MyMail",
      },
    }),
  }
);`}
              </CodeBlock>

            </div>

            <DocHeading>Complete Integration Example</DocHeading>

            <CodeBlock>
              {`async function sendWelcomeEmail() {

  const response = await fetch(
    "http://localhost:5000/api/email/send",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": "YOUR_API_KEY",
      },

      body: JSON.stringify({
        to: "john@example.com",

        data: {
          appName: "MyMail",
          userName: "John",
          dashboardLink:
            "https://example.com/dashboard",
          supportEmail:
            "support@example.com",
          companyName:
            "MyMail Technologies",
        },
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Email sending failed"
    );
  }

  console.log(
    "Email sent successfully:",
    result
  );
}`}
            </CodeBlock>

            <DocHeading>Request Flow</DocHeading>

            <Architecture>
              <span>Your Backend Application</span>
              <span className="text-stone-600">↓</span>
              <span>POST /api/email/send</span>
              <span className="text-stone-600">↓</span>
              <span>x-api-key</span>
              <span className="text-stone-600">↓</span>
              <span>Project Identified</span>
              <span className="text-stone-600">↓</span>
              <span>Assigned Template</span>
              <span className="text-stone-600">↓</span>
              <span>Variables Replaced</span>
              <span className="text-stone-600">↓</span>
              <span>Email Sent</span>
            </Architecture>

            <DocHeading>Important</DocHeading>

            <InfoGrid
              items={[
                "No templateId is required",
                "No projectId is required",
                "API key identifies the project",
                "Project template is selected automatically",
                "Dynamic values are sent inside data",
                "API key must remain on your backend",
              ]}
            />

            <Warning>
              The API key shown as <strong>YOUR_API_KEY</strong> is a
              placeholder. Replace it with the production API key generated
              from your MyMail project.
            </Warning>
          </>
        );

      case "email-logs":
        return (
          <>
            <SectionHeader
              icon={Mail}
              title="Email Logs"
              description="Monitor emails sent through your projects."
            />

            <DocText>
              Every email activity can be tracked through the Email Logs
              section.
            </DocText>

            <InfoGrid
              items={[
                "Recipient",
                "Project",
                "Template",
                "Email status",
                "Message ID",
                "Created date",
                "Sent date",
                "Failure reason",
              ]}
            />

            <DocHeading>Current Statuses</DocHeading>

            <StatusRow
              status="pending"
              description="Email is being processed."
            />

            <StatusRow
              status="sent"
              description="Email was successfully sent."
            />

            <StatusRow
              status="failed"
              description="Email could not be sent."
            />
          </>
        );

      case "security":
        return (
          <>
            <SectionHeader
              icon={ShieldCheck}
              title="Security"
              description="Keep your MyMail integration secure."
            />

            <SecurityItem>
              Keep production API keys on your backend.
            </SecurityItem>

            <SecurityItem>
              Store secrets using environment variables.
            </SecurityItem>

            <SecurityItem>
              Never commit API keys to Git repositories.
            </SecurityItem>

            <SecurityItem>
              Never expose provider credentials to frontend applications.
            </SecurityItem>

            <SecurityItem>
              Rotate compromised API keys immediately.
            </SecurityItem>

            <SecurityItem>
              Always validate API errors in your application.
            </SecurityItem>
          </>
        );

      case "troubleshooting":
        return (
          <>
            <SectionHeader
              icon={AlertTriangle}
              title="Troubleshooting"
              description="Common problems and their solutions."
            />

            <DocHeading>Email is not being sent</DocHeading>

            <InfoGrid
              items={[
                "Verify that the project exists",
                "Verify that the assigned template exists",
                "Verify that the production API is active",
                "Verify that the API key is valid",
                "Verify all required variables",
                "Verify the recipient email",
              ]}
            />

            <DocHeading>Authentication Error</DocHeading>

            <DocText>
              Check your production API key and make sure the key is active
              and is being sent using the <strong>x-api-key</strong> header.
            </DocText>

            <DocHeading>Template Error</DocHeading>

            <DocText>
              Make sure the project has an active template assigned to it.
              You do not need to provide the template ID in the API request.
            </DocText>

            <DocHeading>Missing Variables</DocHeading>

            <DocText>
              Check the template variables and make sure every required
              variable is included inside the <strong>data</strong> object.
            </DocText>

            <DocHeading>Daily Limit Exceeded</DocHeading>

            <DocText>
              Your email request may be rejected when the configured sending
              limit has been reached.
            </DocText>

            <DocHeading>404 Error</DocHeading>

            <DocText>
              Verify the API base URL, endpoint and HTTP method used by your
              application.
            </DocText>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-full text-white">

      {/* MOBILE DOCUMENTATION NAVIGATION */}

      <div className="border-b border-stone-800 bg-stone-950/70 p-4 lg:hidden">

        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-500">
          Documentation Sections
        </label>

        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-stone-800
            bg-stone-900
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            focus:border-orange-500
          "
        >
          {sections.map((section) => (
            <option
              key={section.id}
              value={section.id}
            >
              {section.title}
            </option>
          ))}
        </select>

      </div>

      {/* DOCUMENTATION LAYOUT */}

      <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">

        {/* SIDEBAR */}

        <aside
          className="
            hidden
            border-r
            border-stone-800
            bg-stone-950/40
            lg:block
          "
        >
          <div className="sticky top-6 p-4">

            <div className="mb-4 px-3">

              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Documentation
              </p>

              <p className="mt-1 text-xs text-stone-700">
                MyMail Developer Guide
              </p>

            </div>

            <nav className="space-y-1">

              {sections.map((section) => {

                const Icon = section.icon;

                const active =
                  activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(section.id)
                    }
                    className={`
                      group
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      border
                      px-3
                      py-2.5
                      text-left
                      text-sm
                      transition-all
                      duration-200

                      ${
                        active
                          ? "border-orange-500/20 bg-orange-500/10 text-orange-400 shadow-sm"
                          : "border-transparent text-stone-400 hover:border-stone-800 hover:bg-stone-900 hover:text-white"
                      }
                    `}
                  >

                    <Icon
                      size={17}
                      className={
                        active
                          ? "text-orange-400"
                          : "text-stone-600 group-hover:text-stone-400"
                      }
                    />

                    <span>
                      {section.title}
                    </span>

                  </button>
                );

              })}

            </nav>

          </div>
        </aside>

        {/* CONTENT */}

        <main className="min-w-0">

          <div
            className="
              mx-auto
              w-full
              max-w-5xl
              px-5
              py-7
              sm:px-8
              lg:px-10
              lg:py-9
            "
          >
            {renderContent()}
          </div>

        </main>

      </div>
    </div>
  );
};


/* ========================================================= */
/* SECTION HEADER */
/* ========================================================= */

const SectionHeader = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="mb-8">

      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
        <Icon size={23} />
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-400 sm:text-base">
        {description}
      </p>

    </div>
  );
};


/* ========================================================= */
/* HEADING */
/* ========================================================= */

const DocHeading = ({ children }) => {
  return (
    <h3 className="mb-4 mt-10 text-xl font-semibold text-white">
      {children}
    </h3>
  );
};


/* ========================================================= */
/* TEXT */
/* ========================================================= */

const DocText = ({ children }) => {
  return (
    <p className="mb-6 max-w-3xl text-[15px] leading-7 text-stone-400">
      {children}
    </p>
  );
};


/* ========================================================= */
/* INFO GRID */
/* ========================================================= */

const InfoGrid = ({ items }) => {
  return (
    <div className="mb-8 grid gap-3 sm:grid-cols-2">

      {items.map((item) => (
        <div
          key={item}
          className="
            rounded-xl
            border
            border-stone-800
            bg-stone-900/50
            px-4
            py-3.5
            text-sm
            text-stone-300
            transition
            hover:border-stone-700
            hover:bg-stone-900
          "
        >

          <span className="mr-2 font-semibold text-orange-400">
            ✓
          </span>

          {item}

        </div>
      ))}

    </div>
  );
};


/* ========================================================= */
/* STEP */
/* ========================================================= */

const Step = ({
  number,
  title,
  children,
}) => {
  return (
    <div
      className="
        mb-4
        flex
        gap-4
        rounded-2xl
        border
        border-stone-800
        bg-stone-900/50
        p-5
        transition
        hover:border-stone-700
        hover:bg-stone-900
      "
    >

      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-orange-500
          text-xs
          font-bold
          text-black
        "
      >
        {number}
      </div>

      <div className="min-w-0">

        <h4 className="font-semibold text-white">
          {title}
        </h4>

        <p className="mt-1 text-sm leading-6 text-stone-400">
          {children}
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
        rounded-2xl
        border
        border-stone-800
        bg-stone-900/70
        p-6
        text-center
        font-mono
        text-sm
        leading-8
        text-orange-300
      "
    >
      {children}
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
        mb-6
        overflow-x-auto
        rounded-2xl
        border
        border-stone-800
        bg-black/70
        p-5
        text-sm
        leading-7
        text-stone-300
        shadow-inner
      "
    >
      <code>{children}</code>
    </pre>
  );
};


/* ========================================================= */
/* INFO BOX */
/* ========================================================= */

const InfoBox = ({ children }) => {
  return (
    <div
      className="
        mb-6
        rounded-2xl
        border
        border-blue-500/20
        bg-blue-500/5
        p-4
        text-sm
        leading-6
        text-blue-200
      "
    >
      {children}
    </div>
  );
};


/* ========================================================= */
/* WARNING */
/* ========================================================= */

const Warning = ({ children }) => {
  return (
    <div
      className="
        mb-6
        flex
        gap-3
        rounded-2xl
        border
        border-yellow-500/20
        bg-yellow-500/5
        p-4
        text-sm
        leading-6
        text-yellow-200
      "
    >

      <AlertTriangle
        size={18}
        className="mt-0.5 shrink-0 text-yellow-400"
      />

      <p>
        {children}
      </p>

    </div>
  );
};


/* ========================================================= */
/* STATUS ROW */
/* ========================================================= */

const StatusRow = ({
  status,
  description,
}) => {
  return (
    <div
      className="
        mb-3
        flex
        flex-col
        gap-3
        rounded-xl
        border
        border-stone-800
        bg-stone-900/50
        p-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >

      <span className="w-fit rounded-lg bg-stone-800 px-3 py-1 text-xs font-semibold uppercase text-orange-400">
        {status}
      </span>

      <span className="text-sm text-stone-400">
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
        mb-3
        flex
        items-start
        gap-3
        rounded-xl
        border
        border-stone-800
        bg-stone-900/50
        p-4
        text-sm
        leading-6
        text-stone-300
        transition
        hover:border-stone-700
      "
    >

      <ShieldCheck
        size={18}
        className="mt-0.5 shrink-0 text-green-400"
      />

      {children}

    </div>
  );
};


export default Documentation;