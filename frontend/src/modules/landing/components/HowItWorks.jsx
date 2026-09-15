import {
  UserPlus,
  FolderKanban,
  KeyRound,
  FileCode2,
  Send,
  ArrowRight,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const HowItWorks = () => {

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Create Account",
      desc: "Create your MyMail account and access your workspace.",
    },
    {
      number: "02",
      icon: FolderKanban,
      title: "Create Project",
      desc: "Create a separate project for your application or product.",
    },
    {
      number: "03",
      icon: KeyRound,
      title: "Generate API Key",
      desc: "Generate a secure development or production API key.",
    },
    {
      number: "04",
      icon: FileCode2,
      title: "Create Template",
      desc: "Build reusable templates with dynamic variables.",
    },
    {
      number: "05",
      icon: Send,
      title: "Send Email",
      desc: "Connect the API and start sending emails from your application.",
    },
  ];


  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.18,
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


  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="
        relative
        overflow-hidden
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
          top-20
          h-80
          w-80
          -translate-x-1/2
          rounded-full
          bg-orange-500/5
          blur-[120px]
        "
      />


      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* HEADER */}

        <div
          className={`
            mx-auto
            max-w-2xl
            text-center
            transition-all
            duration-1000
            ease-out
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }
          `}
        >

          <span
            className="
              inline-block
              text-[10px]
              font-bold
              uppercase
              tracking-[0.35em]
              text-orange-400
              sm:text-xs
            "
          >
            Simple workflow
          </span>


          <h2
            className="
              mt-3
              text-3xl
              font-black
              leading-tight
              tracking-[-0.03em]
              text-white
              sm:text-4xl
              lg:text-5xl
            "
          >

            From account to

            <span
              className="
                block
                bg-gradient-to-r
                from-orange-300
                via-orange-400
                to-yellow-300
                bg-clip-text
                text-transparent
              "
            >
              first email.
            </span>

          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-6
              text-stone-400
              sm:text-base
              sm:leading-7
            "
          >
            A simple workflow designed to get developers from setup
            to production as quickly as possible.
          </p>

        </div>


        {/* STEPS */}

        <div className="relative mt-12 sm:mt-14 lg:mt-16">

          {/* DESKTOP CONNECTING LINE */}

          <div
            className="
              pointer-events-none
              absolute
              left-[10%]
              right-[10%]
              top-10
              hidden
              h-px
              overflow-hidden
              bg-white/5
              lg:block
            "
          >

            <div
              className={`
                h-full
                bg-gradient-to-r
                from-orange-500
                via-orange-400
                to-orange-500
                transition-all
                duration-[1800ms]
                ease-out
                ${
                  visible
                    ? "w-full"
                    : "w-0"
                }
              `}
            />

          </div>


          <div
            className="
              grid
              gap-10
              sm:grid-cols-2
              lg:grid-cols-5
              lg:gap-5
            "
          >

            {steps.map((step, index) => {

              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  style={{
                    transitionDelay: visible
                      ? `${index * 220}ms`
                      : "0ms",
                  }}
                  className={`
                    group
                    relative
                    text-center
                    transition-all
                    duration-700
                    ease-out

                    ${
                      visible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-14 opacity-0"
                    }
                  `}
                >

                  {/* STEP ICON */}

                  <div className="relative mx-auto w-fit">

                    <div
                      className="
                        relative
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-white/10
                        bg-stone-900
                        text-orange-400
                        shadow-xl
                        shadow-black/20
                        transition-all
                        duration-500
                        group-hover:-translate-y-2
                        group-hover:scale-105
                        group-hover:border-orange-500/40
                        group-hover:shadow-orange-500/10
                      "
                    >

                      <Icon
                        size={27}
                        className="
                          transition-transform
                          duration-500
                          group-hover:scale-110
                        "
                      />

                    </div>


                    {/* NUMBER */}

                    <span
                      className="
                        absolute
                        -right-2
                        -top-2
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-stone-800
                        bg-orange-500
                        text-[10px]
                        font-black
                        text-black
                        shadow-lg
                        shadow-orange-500/20
                      "
                    >
                      {step.number}
                    </span>

                  </div>


                  {/* TITLE */}

                  <h3
                    className="
                      mt-5
                      text-base
                      font-bold
                      tracking-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-orange-300
                    "
                  >
                    {step.title}
                  </h3>


                  {/* DESCRIPTION */}

                  <p
                    className="
                      mx-auto
                      mt-2
                      max-w-[220px]
                      text-sm
                      leading-6
                      text-stone-500
                    "
                  >
                    {step.desc}
                  </p>


                  {/* MOBILE ARROW */}

                  {index < steps.length - 1 && (
                    <div
                      className="
                        mt-7
                        flex
                        justify-center
                        lg:hidden
                      "
                    >

                      <ArrowRight
                        size={18}
                        className="
                          animate-pulse
                          text-orange-500/50
                        "
                      />

                    </div>
                  )}

                </div>
              );

            })}

          </div>

        </div>

      </div>

    </section>
  );
};

export default HowItWorks;