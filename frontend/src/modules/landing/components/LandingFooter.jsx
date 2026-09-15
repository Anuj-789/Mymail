import {
  ArrowUp,
  ArrowRight,
  Mail,
} from "lucide-react";

import { Link } from "react-router-dom";

const LandingFooter = () => {

  const links = [
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "How It Works",
      href: "#how-it-works",
    },
    {
      name: "API",
      href: "#api",
    },
    {
      name: "Pricing",
      href: "#pricing",
    },
    {
      name: "FAQ",
      href: "#faq",
    },
  ];


  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/5
        bg-stone-950
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-56
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-orange-500/[0.04]
          blur-[100px]
        "
      />


      <div
        className="
          relative
          mx-auto
          max-w-7xl
          px-5
          py-10
          sm:px-6
          sm:py-12
          lg:px-8
        "
      >

        {/* MAIN FOOTER */}

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[1.2fr_1fr_auto]
            lg:items-center
          "
        >

          {/* BRAND */}

          <Link
            to="/"
            className="
              group
              flex
              w-fit
              items-center
              gap-3
            "
          >

            {/* LOGO */}

            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                border-orange-500/20
                bg-orange-500/10
                shadow-lg
                shadow-orange-500/5
                transition-all
                duration-300
                group-hover:scale-105
                group-hover:border-orange-500/40
              "
            >

              <img
                src="/gungif3.gif"
                alt="MyMail"
                className="
                  h-full
                  w-full
                  object-cover
                "
              />

            </div>


            {/* BRAND TEXT */}

            <div>

              <h3
                className="
                  text-lg
                  font-black
                  tracking-tight
                  text-white
                "
              >
                My
                <span className="text-orange-400">
                  Mail
                </span>
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-stone-500
                  sm:text-xs
                "
              >
                Email infrastructure for developers
              </p>

            </div>

          </Link>


          {/* NAVIGATION */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2.5
              lg:justify-center
            "
          >

            {links.map((link) => (

              <a
                key={link.name}
                href={link.href}
                className="
                  group/link
                  relative
                  text-xs
                  font-medium
                  text-stone-500
                  transition
                  duration-300
                  hover:text-orange-400
                  sm:text-sm
                "
              >

                {link.name}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-orange-400
                    transition-all
                    duration-300
                    group-hover/link:w-full
                  "
                />

              </a>

            ))}

          </div>


          {/* BACK TO TOP */}

          <a
            href="#"
            aria-label="Back to top"
            className="
              group
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/[0.02]
              text-stone-400
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-orange-500/40
              hover:bg-orange-500/10
              hover:text-orange-400
              hover:shadow-lg
              hover:shadow-orange-500/10
              lg:ml-auto
            "
          >

            <ArrowUp
              size={17}
              className="
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
              "
            />

          </a>

        </div>


        {/* DIVIDER */}

        <div
          className="
            my-8
            h-px
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
          "
        />


        {/* BOTTOM */}

        <div
          className="
            flex
            flex-col
            gap-4
            text-center
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-left
          "
        >

          {/* COPYRIGHT */}

          <p
            className="
              text-[10px]
              text-stone-600
              sm:text-xs
            "
          >
            © {new Date().getFullYear()} MyMail.
            <span className="ml-1">
              All rights reserved.
            </span>
          </p>


          {/* DEVELOPER */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-[10px]
              text-stone-600
              sm:text-xs
            "
          >

           

            <span>
              Developed by:-
            </span>

            <span
              className="
                font-semibold
                text-stone-400
                transition
                hover:text-orange-400
              "
            >
              360 [Anuj Kumar]
            </span>

          </div>


          {/* STATUS */}

          <div
            className="
              flex
              items-center
              justify-center
              gap-2
              text-[10px]
              text-stone-600
              sm:text-xs
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-green-500
                shadow-sm
                shadow-green-500
              "
            />

            All systems operational

          </div>

        </div>

      </div>

    </footer>
  );
};

export default LandingFooter;
