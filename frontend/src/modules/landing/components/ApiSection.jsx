import { useEffect, useRef, useState } from "react";

import {
  CheckCircle2,
  Code2,
  Copy,
  Terminal,
} from "lucide-react";

const ApiSection = () => {

  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const phrases = [
    "Integrate MyMail in minutes.",
    "Send your first email instantly.",
    "Build reliable email workflows.",
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);


  /* SECTION REVEAL */

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };

  }, []);


  /* HEADING TYPING */

  useEffect(() => {

    const current = phrases[phraseIndex];

    const speed = deleting ? 35 : 65;

    const timer = setTimeout(() => {

      if (!deleting) {

        setText(
          current.substring(0, text.length + 1)
        );

        if (text.length === current.length) {

          setTimeout(() => {
            setDeleting(true);
          }, 1400);

        }

      } else {

        setText(
          current.substring(0, text.length - 1)
        );

        if (text.length === 0) {

          setDeleting(false);

          setPhraseIndex(
            (prev) => (prev + 1) % phrases.length
          );

        }

      }

    }, speed);

    return () => clearTimeout(timer);

  }, [text, deleting, phraseIndex]);


  const code = `const response = await fetch(
  "https://api.mymail.dev/v1/email",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: "user@example.com",
      templateId: "welcome-email",
    }),
  }
);`;


  const copyCode = async () => {

    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);

  };


  return (
    <section
      ref={sectionRef}
      id="api"
      className="
        relative
        overflow-hidden
        border-y
        border-white/5
        bg-stone-950
        py-16
        sm:py-20
        lg:py-24
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/5
          blur-[130px]
        "
      />


      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-2
            lg:gap-20
          "
        >

          {/* LEFT */}

          <div
            className={`
              transition-all
              duration-1000
              ease-out
              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }
            `}
          >

            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-orange-500/20
                bg-orange-500/5
                px-3
                py-1.5
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-orange-400
                sm:text-xs
              "
            >

              <Code2 size={14} />

              Developer API

            </div>


            {/* HEADING */}

            <h2
              className="
                mt-5
                min-h-[110px]
                text-3xl
                font-black
                leading-[1.08]
                tracking-[-0.035em]
                text-white
                sm:min-h-[125px]
                sm:text-5xl
              "
            >

              {text}

              <span
                className="
                  ml-1
                  animate-pulse
                  text-orange-400
                "
              >
                |
              </span>

            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-stone-400
                sm:mt-5
                sm:text-base
              "
            >
              Connect your application to MyMail with a simple,
              secure API. Use projects, API keys and dynamic
              templates to build powerful email workflows.
            </p>


            {/* FEATURES */}

            <div className="mt-7 space-y-3">

              {[
                "Simple REST API",
                "Secure API key authentication",
                "Dynamic template support",
                "Detailed email logs",
              ].map((item, index) => (

                <div
                  key={item}
                  style={{
                    transitionDelay: visible
                      ? `${index * 120}ms`
                      : "0ms",
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    transition-all
                    duration-700
                    ${
                      visible
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-5 opacity-0"
                    }
                  `}
                >

                  <div className="rounded-full bg-green-500/10 p-1">

                    <CheckCircle2
                      size={15}
                      className="text-green-500"
                    />

                  </div>

                  <span className="text-sm text-stone-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>


          {/* RIGHT CODE TERMINAL */}

          <div
            className={`
              relative
              transition-all
              duration-1000
              ease-out
              ${
                visible
                  ? "translate-x-0 scale-100 opacity-100"
                  : "translate-x-10 scale-[0.96] opacity-0"
              }
            `}
          >

            {/* TERMINAL GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -inset-2
                rounded-[30px]
                bg-orange-500/10
                opacity-60
                blur-2xl
              "
            />


            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#090909]
                shadow-2xl
                shadow-black/50
              "
            >

              {/* TERMINAL HEADER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  bg-white/[0.015]
                  px-4
                  py-3
                  sm:px-5
                "
              >

                <div className="flex items-center gap-2">

                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />

                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />

                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />

                </div>


                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-medium
                    text-stone-500
                    sm:text-xs
                  "
                >

                  <Terminal size={13} />

                  send-email.js

                </div>


                <button
                  type="button"
                  onClick={copyCode}
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-lg
                    px-2
                    py-1.5
                    text-stone-500
                    transition
                    hover:bg-white/5
                    hover:text-white
                  "
                >

                  <Copy size={14} />

                  <span className="hidden text-[10px] sm:block">
                    {copied ? "Copied!" : "Copy"}
                  </span>

                </button>

              </div>


              {/* CODE AREA */}

              <div
                className="
                  overflow-x-auto
                  px-3
                  py-5
                  sm:px-5
                  sm:py-6
                "
              >

                <pre
                  className="
                    min-w-max
                    font-mono
                    text-[10px]
                    leading-6
                    sm:text-xs
                  "
                >

                  {code.split("\n").map((line, index) => (

                    <div
                      key={index}
                      style={{
                        transitionDelay: visible
                          ? `${index * 70}ms`
                          : "0ms",
                      }}
                      className={`
                        flex
                        transition-all
                        duration-500
                        ${
                          visible
                            ? "translate-x-0 opacity-100"
                            : "translate-x-3 opacity-0"
                        }
                      `}
                    >

                      {/* LINE NUMBER */}

                      <span
                        className="
                          mr-4
                          w-4
                          select-none
                          text-right
                          text-stone-700
                        "
                      >
                        {index + 1}
                      </span>


                      {/* CODE */}

                      <code
                        className={`
                          whitespace-pre
                          ${
                            line.includes("const")
                              ? "text-orange-400"
                              : line.includes("https")
                              ? "text-green-400"
                              : line.includes("method") ||
                                line.includes("headers") ||
                                line.includes("body") ||
                                line.includes("to:") ||
                                line.includes("templateId")
                              ? "text-blue-300"
                              : "text-stone-300"
                          }
                        `}
                      >
                        {line}
                      </code>

                    </div>

                  ))}

                </pre>

              </div>


              {/* RESPONSE */}

              <div
                className="
                  border-t
                  border-white/10
                  bg-white/[0.015]
                  p-4
                  sm:p-5
                "
              >

                <div className="mb-3 flex items-center gap-2">

                  <span className="relative flex h-2.5 w-2.5">

                    <span
                      className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        animate-ping
                        rounded-full
                        bg-green-400
                        opacity-60
                      "
                    />

                    <span
                      className="
                        relative
                        inline-flex
                        h-2.5
                        w-2.5
                        rounded-full
                        bg-green-500
                      "
                    />

                  </span>


                  <CheckCircle2
                    size={15}
                    className="text-green-500"
                  />

                  <span
                    className="
                      text-[10px]
                      font-semibold
                      text-green-400
                      sm:text-xs
                    "
                  >
                    200 — Email sent successfully
                  </span>

                </div>


                <div
                  className="
                    rounded-xl
                    border
                    border-white/5
                    bg-black/30
                    p-4
                    font-mono
                    text-[10px]
                    leading-6
                    sm:text-xs
                  "
                >

                  <div>

                    <span className="text-orange-400">
                      {"{"}
                    </span>

                  </div>


                  <div className="pl-4">

                    <span className="text-stone-500">
                      "status":
                    </span>

                    <span className="text-green-400">
                      {" "}
                      "success"
                    </span>

                  </div>


                  <div>

                    <span className="text-orange-400">
                      {"}"}
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ApiSection;