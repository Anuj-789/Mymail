import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader";

import {
  FolderKanban,
  Mail,
  CheckCircle,
  AlertCircle,
  FileText,
  ArrowRight,
  BookOpen,
} from "lucide-react";

import { fetchDashboard } from "@/features/dashboard/dashboardThunk";

import {
  selectDashboard,
  selectDashboardLoading,
  selectDashboardError,
} from "@/features/dashboard/dashboardSelectors";

import StatsCard from "../components/StatsCard";
import RecentProjects from "../components/RecentProjects";
import RecentEmails from "../components/RecentEmails";
import WelcomeBanner from "../components/WelcomeBanner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dashboardData = useSelector(selectDashboard);
  const loading = useSelector(selectDashboardLoading);
  const error = useSelector(selectDashboardError);

  useEffect(() => {
    dispatch(fetchDashboard());
  }, [dispatch]);

  /* =====================================================
     LOADING
  ===================================================== */
if (loading) {
  return <Loader pageName="Dashboard" />;
}
  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-500/20
          bg-red-500/5
          p-6
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-red-500/10
              text-red-400
            "
          >
            <AlertCircle size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-red-400">
              Unable to load dashboard
            </h3>

            <p className="mt-1 text-sm text-stone-500">
              Something went wrong while fetching your
              dashboard data.
            </p>

            <button
              type="button"
              onClick={() => dispatch(fetchDashboard())}
              className="
                mt-4
                rounded-lg
                bg-red-500/10
                px-4
                py-2
                text-sm
                font-medium
                text-red-400
                transition
                hover:bg-red-500/20
              "
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     STATS
  ===================================================== */

  const stats = [
    {
      title: "Total Projects",
      value: dashboardData?.totalProjects ?? 0,
      icon: FolderKanban,
    },

    {
      title: "Total Emails",
      value: dashboardData?.totalEmails ?? 0,
      icon: Mail,
    },

    {
      title: "Success Rate",
      value: dashboardData?.successRate ?? "0%",
      icon: CheckCircle,
    },

    {
      title: "Failed Emails",
      value: dashboardData?.failedEmails ?? 0,
      icon: AlertCircle,
    },
  ];

  /* =====================================================
     RECENT DATA
  ===================================================== */

  const recentProjects =
    dashboardData?.recentProjects?.slice(0, 5) || [];

  const recentEmails =
    dashboardData?.recentEmails?.slice(0, 5) || [];

  return (
    <div className="space-y-8">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      {/* =================================================
          WELCOME BANNER
      ================================================= */}

      <WelcomeBanner />

      {/* =================================================
          STATS
      ================================================= */}

      <section
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >
        {stats.map((item) => (
          <StatsCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </section>

      {/* =================================================
          RECENT DATA
      ================================================= */}

      <section
        className="
          grid
          gap-6
          xl:grid-cols-2
        "
      >
        {/* Recent Projects */}

        <div className="space-y-3">
          <div
            className="
              flex
              items-center
              justify-between
              px-1
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Recent Projects
              </h2>

              <p className="mt-1 text-xs text-stone-500">
                Your latest projects
              </p>
            </div>

            {dashboardData?.recentProjects?.length > 5 && (
              <button
                type="button"
                onClick={() => navigate("/dashboard/projects")}
                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-orange-400
                  transition
                  hover:text-orange-300
                "
              >
                Show More
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          <RecentProjects projects={recentProjects} />
        </div>

        {/* Recent Emails */}

        <div className="space-y-3">
          <div
            className="
              flex
              items-center
              justify-between
              px-1
            "
          >
            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Recent Emails
              </h2>

              <p className="mt-1 text-xs text-stone-500">
                Latest email activity
              </p>
            </div>

            {dashboardData?.recentEmails?.length > 5 && (
              <button
                type="button"
                onClick={() => navigate("/dashboard/email-logs")}
                className="
                  flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-orange-400
                  transition
                  hover:text-orange-300
                "
              >
                Show More
                <ArrowRight size={15} />
              </button>
            )}
          </div>

          <RecentEmails emails={recentEmails} />
        </div>
      </section>

      {/* =================================================
          DOCUMENTATION CTA
      ================================================= */}

      <section
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-stone-800
          bg-stone-900
          p-6
          sm:p-7
        "
      >
        {/* Background decoration */}

        <div
          className="
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-orange-500/10
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex
            flex-col
            gap-5
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div className="flex items-start gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-orange-500/10
                text-orange-400
              "
            >
              <FileText size={21} />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-semibold
                  text-white
                "
              >
                Need help getting started?
              </h2>

              <p
                className="
                  mt-1
                  max-w-xl
                  text-sm
                  leading-6
                  text-stone-500
                "
              >
                Learn how to create projects, generate API
                keys, build templates and send emails using
                the platform.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/dashboard/documentation")
            }
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-orange-500
              px-5
              py-3
              text-sm
              font-semibold
              text-black
              transition
              hover:bg-orange-400
            "
          >
            Read Documentation

            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;