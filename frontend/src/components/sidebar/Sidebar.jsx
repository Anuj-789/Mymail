import {
  LayoutDashboard,
  FolderKanban,
  KeyRound,
  FileText,
  Send,
  Mail,
  User,
  BookOpen,
  LogOut,
  X,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useState } from "react";

import { logoutUser } from "@/features/auth/authThunk";

const Sidebar = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  /*
  =========================================================
  MENU GROUPS
  =========================================================
  */

  const menuGroups = [
    {
      title: "Main",
      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
          exact: true,
        },
      ],
    },

    {
      title: "Workspace",
      items: [
        {
          name: "Projects",
          path: "/dashboard/projects",
          icon: FolderKanban,
        },
        {
          name: "API Keys",
          path: "/dashboard/api-keys",
          icon: KeyRound,
        },
        {
          name: "Templates",
          path: "/dashboard/templates",
          icon: FileText,
        },
      ],
    },

    {
      title: "Email",
      items: [
        {
          name: "Send Email",
          path: "/dashboard/send-email",
          icon: Send,
        },
        {
          name: "Email Logs",
          path: "/dashboard/email-logs",
          icon: Mail,
        },
      ],
    },

    {
      title: "Account",
      items: [
        {
          name: "Profile",
          path: "/dashboard/profile",
          icon: User,
        },
        {
          name: "Documentation",
          path: "/dashboard/documentation",
          icon: BookOpen,
        },
      ],
    },
  ];

  /*
  =========================================================
  LOGOUT
  =========================================================
  */

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setShowLogoutModal(false);
      setLoggingOut(false);
      setOpen(false);

      navigate("/", {
        replace: true,
      });
    }
  };

  return (
    <>
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          group/sidebar

          fixed
          left-0
          top-0
          z-50

          flex
          h-screen
          flex-col

          border-r
          border-stone-800/80

          bg-stone-950/95
          backdrop-blur-xl

          shadow-[8px_0_40px_rgba(0,0,0,0.18)]

          transition-[width,transform]
          duration-300
          ease-out

          /* ================= MOBILE ================= */

          w-[280px]

          ${open ? "translate-x-0" : "-translate-x-full"}

          /* ================= DESKTOP ================= */

          lg:static
          lg:translate-x-0
          lg:w-[76px]
          lg:hover:w-[280px]
        `}
      >
        {/* =================================================
            LOGO SECTION
        ================================================= */}

        <div
          className="
            relative
            flex
            h-20
            shrink-0
            items-center
            border-b
            border-stone-800/80
            px-3
            transition-all
            duration-300
            lg:px-3
            lg:group-hover/sidebar:px-5
          "
        >
          {/* Orange Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-16
              w-16
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-orange-500/10
              blur-2xl
            "
          />

          {/* =================================================
              GIF / LOGO
          ================================================= */}

          <div
            className="
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-orange-500/20
              bg-stone-900
              shadow-lg
              shadow-orange-500/5
              transition-transform
              duration-300
              group-hover/sidebar:scale-105
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

          {/* =================================================
              BRAND
          ================================================= */}

          <div
            className="
              ml-3
              min-w-0
              overflow-hidden
              whitespace-nowrap

              /* MOBILE = ALWAYS VISIBLE */

              opacity-100
              translate-x-0

              /* DESKTOP = HIDDEN UNTIL HOVER */

              lg:opacity-0
              lg:translate-x-[-8px]

              lg:group-hover/sidebar:translate-x-0
              lg:group-hover/sidebar:opacity-100

              transition-all
              duration-300
            "
          >
            {/* MyMail */}

            <div className="flex items-center leading-none">
              <span
                className="
                  text-[23px]
                  font-extrabold
                  tracking-[-0.045em]
                  text-orange-400
                "
              >
                my
              </span>

              <span
                className="
                  text-[23px]
                  font-extrabold
                  tracking-[-0.045em]
                  text-stone-100
                "
              >
                mail
              </span>
            </div>

            {/* Powered By */}

            <div
              className="
                mt-1.5
                flex
                items-center
                gap-1
              "
            >
              <span
                className="
                  text-[9px]
                  font-medium
                  tracking-wide
                  text-stone-500
                "
              >
                Powered by:
              </span>

              <span
                className="
                  text-[10px]
                  font-bold
                  tracking-wide
                  text-orange-400
                "
              >
                360
              </span>
            </div>
          </div>

          {/* =================================================
              MOBILE CLOSE
          ================================================= */}

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="
              ml-auto
              rounded-lg
              p-2
              text-stone-500
              transition
              hover:bg-stone-900
              hover:text-white
              lg:hidden
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav
          className="
            flex-1
            space-y-6
            overflow-x-hidden
            overflow-y-auto
            px-2
            py-5

            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-stone-800
          "
        >
          {menuGroups.map((group) => (
            <div key={group.title}>
              {/* =================================================
                  GROUP TITLE
              ================================================= */}

              <div
                className="
                  mb-2
                  flex
                  h-5
                  items-center
                  px-3
                  transition-all
                  duration-300
                "
              >
                {/* Mobile + Desktop Expanded */}

                <span
                  className="
                    whitespace-nowrap
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-stone-600

                    opacity-100

                    lg:opacity-0
                    lg:group-hover/sidebar:opacity-100

                    transition-opacity
                    duration-200
                  "
                >
                  {group.title}
                </span>

                {/* Desktop Collapsed Indicator */}

                <span
                  className="
                    absolute
                    left-[35px]
                    h-1
                    w-1
                    rounded-full
                    bg-stone-700

                    opacity-0

                    lg:opacity-100
                    lg:group-hover/sidebar:opacity-0

                    transition-opacity
                  "
                />
              </div>

              {/* =================================================
                  ITEMS
              ================================================= */}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.exact}
                      onClick={() => setOpen(false)}
                      title={item.name}
                      className={({ isActive }) =>
                        `
                        relative
                        flex
                        h-11
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        border
                        px-3

                        overflow-hidden

                        text-sm
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? `
                              border-orange-500/20
                              bg-gradient-to-r
                              from-orange-500/15
                              via-orange-500/10
                              to-transparent
                              text-orange-400
                              shadow-[inset_3px_0_0_rgba(249,115,22,1)]
                            `
                            : `
                              border-transparent
                              text-stone-500
                              hover:bg-stone-900
                              hover:text-stone-200
                              hover:translate-x-0.5
                            `
                        }
                        `
                      }
                    >
                      {/* =================================================
                          ICON
                      ================================================= */}

                      <span
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                        "
                      >
                        <Icon
                          size={19}
                          strokeWidth={2}
                          className="
                            transition-transform
                            duration-200
                            group-hover/sidebar:scale-105
                          "
                        />
                      </span>

                      {/* =================================================
                          NAME

                          MOBILE  = ALWAYS VISIBLE
                          DESKTOP = VISIBLE ON SIDEBAR HOVER
                      ================================================= */}

                      <span
                        className="
                          whitespace-nowrap
                          text-[14px]
                          font-semibold
                          tracking-[-0.01em]

                          opacity-100
                          translate-x-0

                          lg:opacity-0
                          lg:translate-x-[-6px]

                          lg:group-hover/sidebar:translate-x-0
                          lg:group-hover/sidebar:opacity-100

                          transition-all
                          duration-300
                        "
                      >
                        {item.name}
                      </span>

                      {/* =================================================
                          ARROW
                      ================================================= */}

                      <ChevronRight
                        size={15}
                        className="
                          ml-auto
                          shrink-0
                          text-stone-700

                          opacity-100
                          translate-x-0

                          lg:opacity-0
                          lg:translate-x-[-5px]

                          lg:group-hover/sidebar:translate-x-0
                          lg:group-hover/sidebar:opacity-100

                          transition-all
                          duration-200
                        "
                      />
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* =================================================
            LOGOUT
        ================================================= */}

        <div
          className="
            shrink-0
            border-t
            border-stone-800/80
            p-2

            transition-all
            duration-300

            lg:group-hover/sidebar:p-4
          "
        >
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            title="Logout"
            className="
              group/logout
              flex
              h-11
              w-full
              items-center
              gap-3
              overflow-hidden
              rounded-xl
              border
              border-stone-800
              bg-stone-900/70
              px-3
              text-red-400
              transition-all
              duration-200

              hover:border-red-500/20
              hover:bg-red-500/10
              hover:text-red-300
            "
          >
            {/* Logout Icon */}

            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
              "
            >
              <LogOut
                size={18}
                className="
                  transition-transform
                  duration-200
                  group-hover/logout:-translate-x-0.5
                "
              />
            </span>

            {/* Logout Text */}

            <span
              className="
                whitespace-nowrap
                text-sm
                font-semibold

                opacity-100
                translate-x-0

                lg:opacity-0
                lg:translate-x-[-6px]

                lg:group-hover/sidebar:translate-x-0
                lg:group-hover/sidebar:opacity-100

                transition-all
                duration-300
              "
            >
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* =====================================================
          LOGOUT CONFIRMATION MODAL
      ===================================================== */}

      {showLogoutModal && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            px-4
            backdrop-blur-sm
            animate-[fadeIn_0.2s_ease-out]
          "
        >
          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-2xl
              border
              border-stone-800
              bg-stone-950
              p-6
              shadow-2xl
              animate-[scaleIn_0.25s_ease-out]
            "
          >
            {/* Orange Top Glow */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-24
                w-48
                -translate-x-1/2
                rounded-full
                bg-orange-500/10
                blur-3xl
              "
            />

            {/* Close */}

            <button
              type="button"
              onClick={() => setShowLogoutModal(false)}
              disabled={loggingOut}
              className="
                absolute
                right-4
                top-4
                rounded-lg
                p-2
                text-stone-500
                transition
                hover:bg-stone-900
                hover:text-white
              "
            >
              <X size={18} />
            </button>

            {/* Icon */}

            <div
              className="
                relative
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-orange-500/20
                bg-orange-500/10
                text-orange-400
                animate-[pulse_2s_ease-in-out_infinite]
              "
            >
              <AlertTriangle size={26} />
            </div>

            {/* Content */}

            <div className="relative">
              <h2
                className="
                  text-xl
                  font-semibold
                  text-white
                "
              >
                Are you sure you want to logout?
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  leading-6
                  text-stone-500
                "
              >
                You will be signed out of your MyMail
                account and redirected to the home page.
              </p>
            </div>

            {/* Buttons */}

            <div
              className="
                relative
                mt-7
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >
              {/* CANCEL */}

              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                disabled={loggingOut}
                className="
                  rounded-xl
                  border
                  border-stone-800
                  bg-stone-900
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-stone-300
                  transition
                  hover:bg-stone-800
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              {/* LOGOUT */}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-red-500
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:bg-red-400
                  hover:shadow-lg
                  hover:shadow-red-500/10
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loggingOut ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut size={16} />
                    Logout
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.94) translateY(8px);
            }

            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;