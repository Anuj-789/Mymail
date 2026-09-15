import { useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);

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
      name: "Documentation",
      href: "/documentation",
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

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        px-2
        pt-2
        sm:px-5
        sm:pt-3
        lg:px-8
      "
    >
      <nav
        className="
          mx-auto
          max-w-7xl
          rounded-2xl
          border
          border-white/10
          bg-stone-950/75
          px-3
          py-2.5
          shadow-2xl
          shadow-black/20
          backdrop-blur-xl
          sm:px-6
          sm:py-3
        "
      >
        <div className="flex items-center justify-between">

          {/* LOGO */}

          <Link
            to="/"
            onClick={handleLinkClick}
            className="
              group
              flex
              min-w-0
              items-center
              gap-2.5
              sm:gap-3
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
                overflow-hidden
                rounded-xl
                transition
                duration-300
                group-hover:scale-105
                sm:h-12
                sm:w-12
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

            <div className="min-w-0">
              <h1
                className="
                  whitespace-nowrap
                  text-base
                  font-bold
                  leading-tight
                  tracking-tight
                  text-white
                  sm:text-xl
                "
              >
                My
                <span className="text-[var(--primary)]">
                  Mail
                </span>
              </h1>

              <p
                className="
                  mt-0.5
                  whitespace-nowrap
                  text-[8px]
                  leading-none
                  text-stone-500
                  sm:text-[10px]
                "
              >
                Developed by:- 360
              </p>
            </div>
          </Link>


          {/* DESKTOP LINKS */}

          <div
            className="
              hidden
              items-center
              gap-6
              xl:gap-7
              lg:flex
            "
          >
            {links.map((link) => {
              const isRoute = link.href.startsWith("/");

              if (isRoute) {
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="
                      text-sm
                      font-medium
                      text-stone-400
                      transition
                      duration-300
                      hover:text-orange-400
                    "
                  >
                    {link.name}
                  </Link>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    text-sm
                    font-medium
                    text-stone-400
                    transition
                    duration-300
                    hover:text-orange-400
                  "
                >
                  {link.name}
                </a>
              );
            })}
          </div>


          {/* DESKTOP ACTIONS */}

          <div
            className="
              hidden
              items-center
              gap-4
              lg:flex
            "
          >
            <Link
              to="/login"
              className="
                text-sm
                font-medium
                text-stone-300
                transition
                hover:text-white
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                group
                flex
                items-center
                gap-2
                rounded-xl
                bg-[var(--primary)]
                px-5
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/20
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[var(--primary-dark)]
              "
            >
              Get Started

              <ArrowRight
                size={16}
                className="
                  transition
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>


          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="
              shrink-0
              rounded-lg
              p-2
              text-stone-300
              transition
              hover:bg-white/5
              hover:text-white
              lg:hidden
            "
          >
            {open ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

        </div>


        {/* MOBILE MENU */}

        {open && (
          <div
            className="
              mt-3
              border-t
              border-white/10
              pt-3
              lg:hidden
            "
          >

            {/* MOBILE LINKS */}

            <div className="space-y-1">
              {links.map((link) => {
                const isRoute = link.href.startsWith("/");

                if (isRoute) {
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={handleLinkClick}
                      className="
                        block
                        rounded-xl
                        px-4
                        py-2.5
                        text-sm
                        text-stone-300
                        transition
                        hover:bg-white/5
                        hover:text-orange-400
                      "
                    >
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="
                      block
                      rounded-xl
                      px-4
                      py-2.5
                      text-sm
                      text-stone-300
                      transition
                      hover:bg-white/5
                      hover:text-orange-400
                    "
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>


            {/* MOBILE ACTIONS */}

            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-3
                border-t
                border-white/10
                pt-3
              "
            >
              <Link
                to="/login"
                onClick={handleLinkClick}
                className="
                  rounded-xl
                  border
                  border-white/10
                  py-2.5
                  text-center
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:border-orange-500/30
                  hover:bg-white/5
                "
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={handleLinkClick}
                className="
                  rounded-xl
                  bg-[var(--primary)]
                  py-2.5
                  text-center
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-orange-500/10
                  transition
                  hover:bg-[var(--primary-dark)]
                "
              >
                Get Started
              </Link>
            </div>

          </div>
        )}

      </nav>
    </header>
  );
};

export default LandingNavbar;
