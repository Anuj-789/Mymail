import {
  ArrowRight,
  FolderPlus,
  CalendarDays,
  Clock,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchProfileAPI } from "@/features/profile/profileAPI";


const WelcomeBanner = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("User");

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );


  // =====================================================
  // FETCH USER PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetchProfileAPI();

        /*
          Backend response may be:

          {
            success: true,
            user: {...}
          }

          OR

          {
            success: true,
            data: {...}
          }
        */

        const profile =
          response?.user ||
          response?.data ||
          response?.profile ||
          response;

        if (profile?.name) {
          setUserName(profile.name);
        }

      } catch (error) {
        console.error(
          "Failed to load profile:",
          error
        );
      }
    };

    loadProfile();
  }, []);


  // =====================================================
  // LIVE DATE & TIME
  // =====================================================

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  // =====================================================
  // DATE
  // =====================================================

  const formattedDate =
    currentTime.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });


  // =====================================================
  // TIME
  // =====================================================

  const formattedTime =
    currentTime.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });


  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-orange-500/20
        bg-gradient-to-br
        from-orange-500/15
        via-stone-900
        to-stone-950
        p-6
        sm:p-8
      "
    >

      {/* =================================================
          DECORATIVE GLOW
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-20
          h-56
          w-56
          rounded-full
          bg-orange-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          left-1/3
          h-40
          w-40
          rounded-full
          bg-yellow-500/5
          blur-3xl
        "
      />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          relative
          flex
          flex-col
          gap-7
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div className="min-w-0">

          {/* Welcome */}

          <p
            className="
              text-sm
              font-semibold
              tracking-wide
              text-orange-400
            "
          >
            Welcome back 👋
          </p>


          {/* USER NAME */}

          <h2
            className="
              mt-2
              text-2xl
              font-extrabold
              tracking-tight
              text-white
              sm:text-3xl
            "
          >
            Hello,{" "}

            <span
              className="
                text-orange-400
              "
            >
              {userName}
            </span>
          </h2>


          {/* DESCRIPTION */}

          <p
            className="
              mt-3
              max-w-2xl
              text-sm
              font-medium
              leading-6
              text-stone-400
              sm:text-base
            "
          >
            Manage your email infrastructure, projects
            and delivery activity from your dashboard.
          </p>


          {/* =================================================
              DATE & TIME
          ================================================= */}

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-center
              gap-3
            "
          >

            {/* DATE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-stone-800
                bg-stone-900/70
                px-3
                py-2
                text-xs
                font-semibold
                text-stone-400
              "
            >

              <CalendarDays
                size={14}
                className="text-orange-400"
              />

              <span>
                {formattedDate}
              </span>

            </div>


            {/* TIME */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                border
                border-stone-800
                bg-stone-900/70
                px-3
                py-2
                text-xs
                font-semibold
                text-stone-400
              "
            >

              <Clock
                size={14}
                className="text-orange-400"
              />

              <span>
                {formattedTime}
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            md:flex-col
            lg:flex-row
            md:shrink-0
          "
        >

          {/* CREATE PROJECT */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/projects/create"
              )
            }
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-orange-500/30
              bg-orange-500
              px-5
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-orange-500/10
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-orange-400
              hover:shadow-orange-500/20
              active:translate-y-0
              sm:w-auto
            "
          >

            <FolderPlus size={17} />

            Create Project

          </button>


          {/* HOW TO USE */}

          <button
            type="button"
            onClick={() =>
              navigate(
                "/dashboard/documentation"
              )
            }
            className="
              inline-flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-orange-500/30
              bg-orange-500/10
              px-5
              py-3
              text-sm
              font-bold
              text-orange-300
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-orange-500/50
              hover:bg-orange-500/20
              active:translate-y-0
              sm:w-auto
            "
          >

            How to Use

            <ArrowRight size={17} />

          </button>

        </div>

      </div>

    </section>
  );
};


export default WelcomeBanner;