import {
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Pricing = () => {
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");

  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const plans = [
    {
      name: "Free",
      description: "Perfect for trying MyMail and small projects.",
      price: "₹0",
      period: "/month",
      features: [
        "100 emails / month",
        "Basic email templates",
        "Email delivery logs",
        "API access",
      ],
    },

    {
      name: "Starter",
      description: "For developers building and growing products.",
      price: "₹500",
      period: "/month",
      popular: true,
      features: [
        "10,000 emails / month",
        "Advanced email templates",
        "Email delivery analytics",
        "API key management",
        "Priority support",
      ],
    },

    {
      name: "Professional",
      description: "For production applications and growing teams.",
      price: "₹1,400",
      period: "/month",
      features: [
        "50,000 emails / month",
        "Advanced email templates",
        "Detailed email analytics",
        "API key management",
        "Priority support",
      ],
    },
  ];

  /* --------------------------------
     SCROLL DIRECTION
  -------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection("up");
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* --------------------------------
     INTERSECTION OBSERVER
  -------------------------------- */

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

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="
        relative
        overflow-hidden
        py-12
        sm:py-14
        lg:py-16
      "
    >
      {/* --------------------------------
          BACKGROUND GLOW
      -------------------------------- */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[350px]
          w-[650px]
          max-w-[90vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/5
          blur-[120px]
        "
      />

      <div
        className="
          relative
          mx-auto
          max-w-6xl
          px-5
          sm:px-6
        "
      >
        {/* --------------------------------
            HEADER
        -------------------------------- */}

        <div
          className={`
            mx-auto
            mb-8
            max-w-2xl
            text-center
            transition-all
            duration-700
            ease-out
            sm:mb-10

            ${
              visible
                ? "translate-y-0 opacity-100"
                : scrollDirection === "down"
                ? "translate-y-10 opacity-0"
                : "-translate-y-10 opacity-0"
            }
          `}
        >
          {/* BADGE */}

          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-500/20
              bg-orange-500/10
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
            <Sparkles size={13} />

            Simple Pricing
          </div>

          {/* TITLE */}

          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-[var(--text)]
              sm:text-4xl
            "
          >
            Plans that

            <span className="text-orange-400">
              {" "}scale with you
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-xs
              leading-6
              text-[var(--muted)]
              sm:text-sm
            "
          >
            Start for free, upgrade when you need more,
            and scale your email infrastructure with MyMail.
          </p>
        </div>

        {/* --------------------------------
            PRICING CARDS
        -------------------------------- */}

        <div
          className="
            grid
            items-stretch
            gap-4
            md:grid-cols-3
            md:gap-5
          "
        >
          {plans.map((plan, index) => {
            /*
              Desktop animation:

              Free          -> left
              Starter       -> center
              Professional  -> right

              On mobile all cards still get
              a subtle directional movement.
            */

            const hiddenAnimation =
              index === 0
                ? scrollDirection === "down"
                  ? "-translate-x-14"
                  : "translate-x-14"
                : index === 1
                ? scrollDirection === "down"
                  ? "translate-y-14"
                  : "-translate-y-14"
                : scrollDirection === "down"
                ? "translate-x-14"
                : "-translate-x-14";

            return (
              <div
                key={plan.name}
                style={{
                  transitionDelay: visible
                    ? `${index * 140}ms`
                    : "0ms",
                }}
                className={`
                  group
                  relative
                  flex
                  flex-col
                  overflow-visible
                  rounded-2xl
                  border
                  p-5
                  transition-all
                  duration-700
                  ease-out
                  sm:p-6

                  ${
                    visible
                      ? "translate-x-0 translate-y-0 opacity-100"
                      : `${hiddenAnimation} opacity-0`
                  }

                  ${
                    plan.popular
                      ? `
                        border-orange-500/60
                        bg-orange-500/[0.07]
                        shadow-xl
                        shadow-orange-500/10
                      `
                      : `
                        border-[var(--border)]
                        bg-[var(--card)]
                        hover:-translate-y-1
                        hover:border-orange-500/30
                        hover:shadow-xl
                        hover:shadow-orange-500/5
                      `
                  }
                `}
              >
                {/* --------------------------------
                    TOP GLOW
                -------------------------------- */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-orange-500/10
                    opacity-0
                    blur-3xl
                    transition
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* --------------------------------
                    POPULAR BADGE
                -------------------------------- */}

                {plan.popular && (
                  <div
                    className="
                      absolute
                      -top-3
                      left-1/2
                      z-10
                      -translate-x-1/2
                      whitespace-nowrap
                      rounded-full
                      bg-[var(--primary)]
                      px-3
                      py-1
                      text-[9px]
                      font-black
                      uppercase
                      tracking-wider
                      text-white
                      shadow-lg
                      shadow-orange-500/20
                    "
                  >
                    Most Popular
                  </div>
                )}

                {/* --------------------------------
                    PLAN INFO
                -------------------------------- */}

                <div className="relative">
                  <h3
                    className="
                      text-lg
                      font-bold
                      text-[var(--text)]
                    "
                  >
                    {plan.name}
                  </h3>

                  <p
                    className="
                      mt-1.5
                      min-h-[38px]
                      text-xs
                      leading-5
                      text-[var(--muted)]
                    "
                  >
                    {plan.description}
                  </p>
                </div>

                {/* --------------------------------
                    PRICE
                -------------------------------- */}

                <div
                  className="
                    mt-4
                    flex
                    items-end
                    gap-1
                  "
                >
                  <span
                    className={`
                      font-black
                      tracking-tight

                      ${
                        plan.popular
                          ? "text-orange-400"
                          : "text-[var(--text)]"
                      }

                      text-3xl
                    `}
                  >
                    {plan.price}
                  </span>

                  {plan.period && (
                    <span
                      className="
                        mb-1
                        text-[10px]
                        text-[var(--muted)]
                      "
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* --------------------------------
                    FEATURES
                -------------------------------- */}

                <ul
                  className="
                    mt-4
                    flex-1
                    space-y-2.5
                    border-t
                    border-[var(--border)]
                    pt-4
                  "
                >
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="
                        flex
                        items-start
                        gap-2.5
                        text-xs
                        text-[var(--muted)]
                      "
                    >
                      <span
                        className="
                          mt-0.5
                          flex
                          h-4
                          w-4
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-orange-500/10
                          text-orange-400
                        "
                      >
                        <Check
                          size={10}
                          strokeWidth={3}
                        />
                      </span>

                      <span>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* --------------------------------
                    BUTTON
                -------------------------------- */}

                <Link
                  to="/register"
                  className={`
                    group/button
                    relative
                    mt-5
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    py-2.5
                    text-xs
                    font-bold
                    transition-all
                    duration-300

                    ${
                      plan.name === "Free"
                        ? `
                          border
                          border-[var(--border)]
                          bg-[var(--background)]
                          text-[var(--text)]
                          hover:-translate-y-0.5
                          hover:border-orange-500/50
                          hover:text-orange-400
                        `
                        : plan.popular
                        ? `
                          bg-orange-500
                          text-white
                          shadow-lg
                          shadow-orange-500/20
                          hover:-translate-y-0.5
                          hover:bg-orange-400
                        `
                        : `
                          bg-[var(--primary)]
                          text-white
                          shadow-lg
                          shadow-orange-500/20
                          hover:-translate-y-0.5
                          hover:bg-[var(--primary-dark)]
                          hover:shadow-orange-500/30
                        `
                    }
                  `}
                >
                  {plan.name === "Free"
                    ? "Start Free"
                    : "Get Started"}

                  <ArrowRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover/button:translate-x-1
                    "
                  />
                </Link>
              </div>
            );
          })}
        </div>

        {/* --------------------------------
            BOTTOM NOTE
        -------------------------------- */}

        <p
          className={`
            mt-5
            text-center
            text-[10px]
            text-[var(--muted)]
            transition-all
            duration-700
            delay-500

            ${
              visible
                ? "translate-y-0 opacity-100"
                : scrollDirection === "down"
                ? "translate-y-5 opacity-0"
                : "-translate-y-5 opacity-0"
            }
          `}
        >
          No credit card required to get started.
        </p>
      </div>
    </section>
  );
};

export default Pricing;