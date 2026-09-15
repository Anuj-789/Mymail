
import {
  Menu,
  UserCircle,
  LogOut,
  X,
  AlertTriangle,
  LayoutDashboard,
  FolderKanban,
  KeyRound,
  FileText,
  Send,
  Mail,
  User,
  BookOpen,
} from "lucide-react";

import { useState } from "react";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  selectUser,
} from "@/features/auth/authSelectors";

import {
  logoutUser,
} from "@/features/auth/authThunk";


const Header = ({
  setSidebarOpen,
}) => {

  const [openProfile, setOpenProfile] =
    useState(false);

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const user = useSelector(selectUser);


  /* =====================================================
     PAGE TITLE + ICON
  ===================================================== */

  const getPageInfo = () => {

    const path = location.pathname;


    if (path === "/dashboard") {
      return {
        title: "Dashboard",
        subtitle: "Welcome back to MyMail",
        icon: LayoutDashboard,
      };
    }


    if (path === "/dashboard/projects") {
      return {
        title: "Projects",
        subtitle: "Manage your email projects",
        icon: FolderKanban,
      };
    }


    if (path === "/dashboard/projects/create") {
      return {
        title: "Create Project",
        subtitle: "Create and configure a new project",
        icon: FolderKanban,
      };
    }


    if (path.includes("/dashboard/projects/")) {
      return {
        title: "Project",
        subtitle: "Manage your project",
        icon: FolderKanban,
      };
    }


    if (path === "/dashboard/api-keys") {
      return {
        title: "API Keys",
        subtitle: "Manage your email sending API keys",
        icon: KeyRound,
      };
    }


    if (path === "/dashboard/templates") {
      return {
        title: "Templates",
        subtitle:
          "Create, customize and manage your email templates",
        icon: FileText,
      };
    }


    if (path.includes("/dashboard/templates/")) {
      return {
        title: "Template",
        subtitle:
          "Create and customize your email template",
        icon: FileText,
      };
    }


    if (path === "/dashboard/send-email") {
      return {
        title: "Send Email",
        subtitle:
          "Send emails using your projects and templates",
        icon: Send,
      };
    }


    if (path === "/dashboard/email-logs") {
      return {
        title: "Email Logs",
        subtitle:
          "Track and monitor your email activity",
        icon: Mail,
      };
    }


    if (path === "/dashboard/profile") {
      return {
        title: "Profile",
        subtitle:
          "Manage your account and profile settings",
        icon: User,
      };
    }


    if (path === "/dashboard/documentation") {
      return {
        title: "Documentation",
        subtitle:
          "Learn how to use MyMail",
        icon: BookOpen,
      };
    }


    return {
      title: "MyMail",
      subtitle: "Email management platform",
      icon: Mail,
    };

  };


  const pageInfo = getPageInfo();

  const PageIcon = pageInfo.icon;


  /* =====================================================
     PROFILE
  ===================================================== */

  const handleProfile = () => {

    setOpenProfile(false);

    navigate("/dashboard/profile");

  };


  /* =====================================================
     LOGOUT CONFIRMATION
  ===================================================== */

  const handleLogoutClick = () => {

    setOpenProfile(false);

    setShowLogoutModal(true);

  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {

    if (loggingOut) return;

    setLoggingOut(true);

    try {

      await dispatch(
        logoutUser()
      ).unwrap();

    } catch (error) {

      console.error(
        "Logout failed:",
        error
      );

    } finally {

      setShowLogoutModal(false);

      setLoggingOut(false);

      navigate("/", {
        replace: true,
      });

    }

  };


  return (
    <>

      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          flex
          h-20
          items-center
          justify-between
          border-b
          border-stone-800
          bg-stone-900
          px-4
          text-white
          transition-colors
          duration-300
          sm:px-6
          lg:px-8
        "
      >

        {/* LEFT */}

        <div
          className="
            flex
            min-w-0
            items-center
            gap-3
            sm:gap-4
          "
        >

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              shrink-0
              rounded-xl
              p-2.5
              text-stone-400
              transition-all
              duration-200
              hover:bg-orange-500/10
              hover:text-orange-400
              active:scale-95
              lg:hidden
            "
          >

            <Menu size={22} />

          </button>


          {/* PAGE ICON */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-orange-500/20
              bg-orange-500/10
              text-orange-400
              shadow-sm
              shadow-orange-500/5
            "
          >

            <PageIcon
              size={19}
              strokeWidth={2}
            />

          </div>


          {/* PAGE INFO */}

          <div className="min-w-0">

            <h2
              key={pageInfo.title}
              className="
                truncate
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                sm:text-xl
              "
            >

              {pageInfo.title}

            </h2>


            <p
              key={pageInfo.subtitle}
              className="
                hidden
                truncate
                text-sm
                text-stone-400
                transition-all
                duration-300
                sm:block
              "
            >

              {pageInfo.subtitle}

            </p>

          </div>

        </div>


        {/* RIGHT */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            sm:gap-3
          "
        >

          {/* =================================================
              PROFILE
          ================================================= */}

          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setOpenProfile(
                  (previous) =>
                    !previous
                )
              }
              title="Profile"
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-orange-500
                font-semibold
                text-white
                shadow-lg
                shadow-orange-500/10
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-orange-400
                active:translate-y-0
              "
            >

              {user?.name
                ? user.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </button>


            {/* PROFILE DROPDOWN */}

            {openProfile && (

              <div
                className="
                  absolute
                  right-0
                  top-14
                  z-50
                  w-48
                  origin-top-right
                  rounded-xl
                  border
                  border-stone-800
                  bg-stone-900
                  p-2
                  shadow-2xl
                  animate-[dropdownIn_0.18s_ease-out]
                "
              >

                <button
                  type="button"
                  onClick={handleProfile}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-white
                    transition-all
                    duration-200
                    hover:bg-orange-500/10
                    hover:text-orange-400
                  "
                >

                  <UserCircle size={18} />

                  <span>
                    Profile
                  </span>

                </button>


                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    py-2.5
                    text-left
                    text-sm
                    text-red-400
                    transition-all
                    duration-200
                    hover:bg-red-500/10
                    hover:text-red-300
                  "
                >

                  <LogOut size={18} />

                  <span>
                    Logout
                  </span>

                </button>

              </div>

            )}

          </div>

        </div>

      </header>


      {/* =================================================
          LOGOUT MODAL
      ================================================= */}

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
              bg-stone-900
              p-6
              shadow-2xl
              animate-[scaleIn_0.25s_ease-out]
            "
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={() =>
                setShowLogoutModal(false)
              }
              disabled={loggingOut}
              className="
                absolute
                right-4
                top-4
                rounded-lg
                p-2
                text-stone-400
                transition
                hover:bg-orange-500/10
                hover:text-white
              "
            >

              <X size={18} />

            </button>


            {/* WARNING */}

            <div
              className="
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


            {/* CONTENT */}

            <div>

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
                  text-stone-400
                "
              >

                You will be signed out of your
                MyMail account and redirected to
                the home page.

              </p>

            </div>


            {/* BUTTONS */}

            <div
              className="
                mt-7
                flex
                flex-col-reverse
                gap-3
                sm:flex-row
                sm:justify-end
              "
            >

              <button
                type="button"
                onClick={() =>
                  setShowLogoutModal(false)
                }
                disabled={loggingOut}
                className="
                  rounded-xl
                  border
                  border-stone-800
                  bg-stone-950
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:border-orange-500/40
                  hover:text-orange-400
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                Cancel

              </button>


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
                  transition
                  hover:bg-red-400
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


      {/* =================================================
          ANIMATIONS
      ================================================= */}

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
              transform: scale(0.94)
                translateY(8px);
            }

            to {
              opacity: 1;
              transform: scale(1)
                translateY(0);
            }

          }


          @keyframes dropdownIn {

            from {
              opacity: 0;
              transform: scale(0.96)
                translateY(-5px);
            }

            to {
              opacity: 1;
              transform: scale(1)
                translateY(0);
            }

          }

        `}
      </style>

    </>
  );
};


export default Header;
