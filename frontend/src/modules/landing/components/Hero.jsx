import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Hero = () => {

  const words = [
    "Scale Faster.",
    "Grow Smarter.",
    "Send Better.",
    "Move Faster.",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {

    const currentWord = words[wordIndex];

    const speed = deleting ? 55 : 100;

    const timer = setTimeout(() => {

      if (!deleting) {

        setDisplayText(
          currentWord.substring(0, displayText.length + 1)
        );

        if (displayText.length === currentWord.length) {
          setTimeout(() => setDeleting(true), 1200);
        }

      } else {

        setDisplayText(
          currentWord.substring(0, displayText.length - 1)
        );

        if (displayText.length === 0) {
          setDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }

      }

    }, speed);

    return () => clearTimeout(timer);

  }, [displayText, deleting, wordIndex]);


  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        px-5
        pb-16
        pt-32
        sm:px-6
        sm:pb-20
        sm:pt-36
        lg:px-8
        lg:pt-40
      "
    >

      {/* BACKGROUND GLOWS */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-10
          h-[350px]
          w-[350px]
          -translate-x-1/2
          rounded-full
          bg-orange-500/10
          blur-[110px]
          sm:h-[550px]
          sm:w-[550px]
          lg:h-[650px]
          lg:w-[650px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/3
          h-72
          w-72
          rounded-full
          bg-yellow-500/5
          blur-[100px]
        "
      />


      <div className="relative mx-auto max-w-7xl">

        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-16
          "
        >

          {/* LEFT CONTENT */}

          <div className="text-center lg:text-left">

            {/* BADGE */}

            <div
              className="
                mx-auto
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-orange-500/20
                bg-orange-500/5
                px-4
                py-2
                text-[11px]
                font-semibold
                tracking-wide
                text-orange-400
                shadow-lg
                shadow-orange-500/5
                sm:mb-7
                sm:text-xs
                lg:mx-0
              "
            >

              <Sparkles
                size={14}
                className="animate-pulse"
              />

              Developer-first email infrastructure

            </div>


            {/* HEADING */}

            <h1
              className="
                text-[clamp(3rem,8vw,5.5rem)]
                font-black
                leading-[0.98]
                tracking-[-0.045em]
                text-white
              "
            >

              <span className="block">
                Send Emails.
              </span>

              <span
                className="
                  mt-2
                  block
                  min-h-[1em]
                  bg-gradient-to-r
                  from-orange-500
                  via-orange-400
                  to-yellow-300
                  bg-clip-text
                  text-transparent
                "
              >
                {displayText}
                <span
                  className="
                    ml-1
                    inline-block
                    h-[0.8em]
                    w-[3px]
                    translate-y-[0.08em]
                    animate-pulse
                    bg-orange-400
                  "
                />
              </span>

            </h1>


            {/* DESCRIPTION */}

            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-stone-400
                sm:mt-7
                sm:text-base
                lg:mx-0
                lg:text-lg
              "
            >
              Build reliable email experiences with a powerful API,
              dynamic templates, secure infrastructure and real-time
              delivery insights.
            </p>


            {/* BUTTONS */}

            <div
              className="
                mt-8
                flex
                flex-col
                justify-center
                gap-3
                sm:flex-row
                lg:justify-start
              "
            >

              <Link
                to="/register"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[var(--primary)]
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-xl
                  shadow-orange-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[var(--primary-dark)]
                  hover:shadow-orange-500/30
                "
              >

                Start Sending

                <ArrowRight
                  size={18}
                  className="
                    transition
                    duration-300
                    group-hover:translate-x-1
                  "
                />

              </Link>


              <a
                href="#api"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.02]
                  px-7
                  py-3.5
                  text-sm
                  font-bold
                  text-stone-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-500/40
                  hover:bg-white/5
                "
              >

                <Code2 size={18} />

                View API

              </a>

            </div>


            {/* TRUST POINTS */}

            <div
              className="
                mt-8
                flex
                flex-wrap
                justify-center
                gap-x-5
                gap-y-3
                text-[11px]
                text-stone-500
                sm:text-xs
                lg:justify-start
              "
            >

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-green-500"
                />
                Secure API
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-green-500"
                />
                Dynamic Templates
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2
                  size={14}
                  className="text-green-500"
                />
                Email Logs
              </span>

            </div>

          </div>


          {/* RIGHT DASHBOARD */}

          <div
            className="
              relative
              mx-auto
              w-full
              max-w-xl
              lg:max-w-none
            "
          >

            {/* DELIVERY FLOATING CARD */}

            <div
              className="
                absolute
                -right-2
                -top-7
                z-20
                hidden
                animate-[float_4s_ease-in-out_infinite]
                rounded-2xl
                border
                border-green-500/20
                bg-stone-900/90
                px-4
                py-3
                shadow-2xl
                backdrop-blur-xl
                sm:block
              "
            >

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-green-500/10 p-2">
                  <CheckCircle2
                    size={18}
                    className="text-green-500"
                  />
                </div>

                <div>
                  <p className="text-[10px] text-stone-500">
                    Delivery
                  </p>

                  <p className="text-xs font-semibold text-white">
                    Email delivered
                  </p>
                </div>

              </div>

            </div>


            {/* MAIN CARD */}

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-stone-900/80
                p-4
                shadow-2xl
                shadow-black/50
                backdrop-blur-xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-orange-500/20
                sm:p-6
              "
            >

              {/* CARD GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-48
                  w-48
                  rounded-full
                  bg-orange-500/10
                  blur-3xl
                "
              />


              {/* TOP BAR */}

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/10
                  pb-4
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-xl
                      bg-orange-500/10
                    "
                  >

                    <img
                      src="/gungif3.gif"
                      alt="MyMail"
                      className="h-full w-full object-cover"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold text-white">
                      MyMail
                    </p>

                    <p className="text-[11px] text-stone-500">
                      Email Delivery
                    </p>

                  </div>

                </div>


                <div className="flex items-center gap-2">

                  <span className="relative flex h-2 w-2">

                    <span
                      className="
                        absolute
                        inline-flex
                        h-full
                        w-full
                        animate-ping
                        rounded-full
                        bg-green-400
                        opacity-75
                      "
                    />

                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />

                  </span>

                  <span className="text-[11px] text-stone-500">
                    Operational
                  </span>

                </div>

              </div>


              {/* EMAIL CONTENT */}

              <div className="relative mt-5 space-y-4">

                {/* SENDING */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-black/20
                    p-4
                    transition
                    duration-300
                    hover:border-orange-500/20
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-orange-500/10 p-2.5">
                      <Send
                        size={17}
                        className="text-orange-400"
                      />
                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="text-[10px] text-stone-500">
                        Sending
                      </p>

                      <p className="truncate text-xs font-medium text-white sm:text-sm">
                        welcome@customer.com
                      </p>

                    </div>

                    <span
                      className="
                        rounded-full
                        bg-green-500/10
                        px-2.5
                        py-1
                        text-[9px]
                        font-bold
                        text-green-400
                      "
                    >
                      SENT
                    </span>

                  </div>

                </div>


                {/* API RESPONSE */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-orange-500/20
                    bg-orange-500/5
                    p-4
                  "
                >

                  <div className="mb-3 flex items-center gap-2">

                    <Code2
                      size={15}
                      className="text-orange-400"
                    />

                    <span className="text-[11px] font-medium text-stone-400">
                      API Response
                    </span>

                  </div>


                  <div
                    className="
                      overflow-x-auto
                      rounded-xl
                      bg-black/30
                      p-4
                      font-mono
                      text-[10px]
                      leading-6
                      sm:text-xs
                    "
                  >

                    <p className="text-stone-500">
                      {"{"}
                    </p>

                    <p className="pl-4 text-green-400">
                      "status":
                      <span className="text-white">
                        "success"
                      </span>
                    </p>

                    <p className="pl-4 text-green-400">
                      "message":
                      <span className="text-white">
                        "Email sent successfully"
                      </span>
                    </p>

                    <p className="text-stone-500">
                      {"}"}
                    </p>

                  </div>

                </div>


                {/* STATS */}

                <div className="grid grid-cols-3 gap-2 sm:gap-3">

                  <div className="rounded-xl bg-black/20 p-3">
                    <p className="text-[9px] text-stone-500">
                      Sent
                    </p>

                    <p className="mt-1 text-base font-bold text-white sm:text-lg">
                      24.8K
                    </p>
                  </div>


                  <div className="rounded-xl bg-black/20 p-3">

                    <p className="text-[9px] text-stone-500">
                      Delivered
                    </p>

                    <p className="mt-1 text-base font-bold text-green-400 sm:text-lg">
                      99.9%
                    </p>

                  </div>


                  <div className="rounded-xl bg-black/20 p-3">

                    <p className="text-[9px] text-stone-500">
                      Response
                    </p>

                    <p className="mt-1 text-base font-bold text-orange-400 sm:text-lg">
                      200
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* SECURITY FLOAT */}

            <div
              className="
                absolute
                -bottom-5
                -left-4
                hidden
                animate-[float_5s_ease-in-out_infinite]
                rounded-2xl
                border
                border-white/10
                bg-stone-900
                p-3
                shadow-xl
                sm:block
              "
            >

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-blue-500/10 p-2">
                  <ShieldCheck
                    size={18}
                    className="text-blue-400"
                  />
                </div>

                <div>

                  <p className="text-[10px] text-stone-500">
                    Security
                  </p>

                  <p className="text-xs font-semibold text-white">
                    API Protected
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* BOTTOM METRICS */}

        <div
          className="
            mx-auto
            mt-14
            grid
            max-w-4xl
            grid-cols-2
            gap-3
            border-t
            border-white/5
            pt-8
            sm:mt-16
            sm:grid-cols-4
            sm:gap-4
            sm:pt-10
          "
        >

          {[
            ["99.9%", "Delivery reliability"],
            ["<100ms", "API response"],
            ["24/7", "Infrastructure"],
            ["Secure", "API authentication"],
          ].map(([value, label]) => (

            <div
              key={label}
              className="
                text-center
                transition
                duration-300
                hover:-translate-y-1
              "
            >

              <p className="text-lg font-black tracking-tight text-white sm:text-2xl">
                {value}
              </p>

              <p className="mt-1 text-[10px] text-stone-500 sm:text-xs">
                {label}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* FLOAT ANIMATION */}

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>

    </section>
  );
};

export default Hero;
