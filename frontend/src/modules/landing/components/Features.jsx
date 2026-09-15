import {
  Mail,
  Zap,
  ShieldCheck,
  BarChart3,
  Code2,
  Layers,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const Features = () => {

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const features = [
    {
      icon: Mail,
      title: "Powerful Email API",
      desc: "Send transactional emails through a clean and developer-friendly API.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Built for fast API responses and reliable email delivery.",
    },
    {
      icon: ShieldCheck,
      title: "Secure by Design",
      desc: "JWT authentication, protected API keys and secure project access.",
    },
    {
      icon: BarChart3,
      title: "Email Analytics",
      desc: "Monitor sent, delivered and failed emails through detailed logs.",
    },
    {
      icon: Code2,
      title: "Developer First",
      desc: "Simple integration designed to get your application sending quickly.",
    },
    {
      icon: Layers,
      title: "Dynamic Templates",
      desc: "Create reusable templates with dynamic variables for personalized emails.",
    },
  ];

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
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
      id="features"
      className="
        relative
        overflow-hidden
        border-y
        border-white/5
        bg-stone-950
        py-14
        sm:py-16
        lg:py-20
      "
    >

      {/* Background Glow */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-orange-500/10
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
            Everything you need
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
            Email infrastructure
            <span
              className="
                block
                bg-gradient-to-r
                from-orange-300
                via-orange-400
                to-orange-500
                bg-clip-text
                text-transparent
              "
            >
              without the complexity.
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
            Everything required to build, send, monitor and manage
            application emails from one platform.
          </p>

        </div>


        {/* FEATURE GRID */}

        <div
          className="
            mt-9
            grid
            gap-4
            sm:mt-11
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                style={{
                  transitionDelay: visible
                    ? `${index * 100}ms`
                    : "0ms",
                }}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.025]
                  p-5
                  shadow-xl
                  shadow-black/10
                  transition-all
                  duration-700
                  ease-out

                  ${
                    visible
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-12 scale-[0.96] opacity-0"
                  }

                  hover:-translate-y-2
                  hover:border-orange-500/30
                  hover:bg-white/[0.05]
                  hover:shadow-orange-500/5
                `}
              >

                {/* Hover Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-12
                    -top-12
                    h-36
                    w-36
                    rounded-full
                    bg-orange-500/10
                    opacity-0
                    blur-3xl
                    transition-all
                    duration-500
                    group-hover:scale-150
                    group-hover:opacity-100
                  "
                />


                {/* Icon */}

                <div
                  className="
                    relative
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-orange-500/20
                    bg-orange-500/10
                    text-orange-400
                    transition-all
                    duration-500
                    group-hover:rotate-6
                    group-hover:scale-110
                    group-hover:bg-orange-500/20
                    group-hover:shadow-lg
                    group-hover:shadow-orange-500/10
                  "
                >
                  <Icon size={21} />
                </div>


                {/* Title */}

                <h3
                  className="
                    relative
                    mt-5
                    text-base
                    font-bold
                    tracking-tight
                    text-white
                    sm:text-lg
                  "
                >
                  {feature.title}
                </h3>


                {/* Description */}

                <p
                  className="
                    relative
                    mt-2
                    text-sm
                    leading-6
                    text-stone-400
                  "
                >
                  {feature.desc}
                </p>


                {/* Animated Line */}

                <div
                  className="
                    mt-5
                    h-px
                    w-0
                    bg-gradient-to-r
                    from-orange-500
                    to-transparent
                    transition-all
                    duration-500
                    group-hover:w-20
                  "
                />

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default Features;
