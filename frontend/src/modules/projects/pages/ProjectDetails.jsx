
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  FolderKanban,
  Edit,
  Trash2,
  Mail,
  Calendar,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";

import {
  fetchProject,
  deleteProject,
} from "@/features/project/projectThunk";

import {
  selectProject,
  selectProjectLoading,
} from "@/features/project/projectSelectors";


const ProjectDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const project = useSelector(selectProject);
  const loading = useSelector(selectProjectLoading);

  const [deleteLoading, setDeleteLoading] = useState(false);


  useEffect(() => {
    if (id) {
      dispatch(fetchProject(id));
    }
  }, [id, dispatch]);


  const handleDelete = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {

      setDeleteLoading(true);

      await dispatch(
        deleteProject(id)
      ).unwrap();

      toast.success(
        "Project deleted successfully"
      );

      navigate(
        "/dashboard/projects",
        { replace: true }
      );

    } catch (error) {

      toast.error(
        error?.message ||
        error ||
        "Delete failed"
      );

    } finally {

      setDeleteLoading(false);

    }
  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[400px]
          flex-col
          items-center
          justify-center
          text-center
        "
      >

        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-stone-800
            border-t-orange-500
          "
        />

        <p
          className="
            mt-4
            text-sm
            text-stone-400
          "
        >
          Loading Project...
        </p>

      </div>
    );
  }


  if (!project) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-stone-800
          bg-stone-900
          p-6
          text-stone-400
        "
      >
        Project not found
      </div>
    );
  }


  return (
    <div className="space-y-8">

      {/* HEADER */}

      <section
        className="
          flex
          flex-col
          justify-between
          gap-4
          md:flex-row
          md:items-center
        "
      >

        <div
          className="
            flex
            items-center
            gap-4
          "
        >

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              rounded-xl
              border
              border-stone-800
              p-3
              text-stone-300
              transition
              hover:bg-stone-900
              hover:text-white
            "
          >
            <ArrowLeft size={20} />
          </button>


          <div>

            <h1
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              Project Details
            </h1>

            <p
              className="
                text-sm
                text-stone-400
              "
            >
              Manage your project information
            </p>

          </div>

        </div>


        <div
          className="
            flex
            flex-wrap
            gap-3
          "
        >

          <button
            type="button"
            onClick={() =>
              navigate(
                `/dashboard/projects/${id}/edit`
              )
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-4
              py-2
              text-sm
              font-medium
              text-black
              transition
              hover:bg-orange-400
            "
          >
            <Edit size={17} />

            Edit
          </button>


          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-red-500/20
              bg-red-500/10
              px-4
              py-2
              text-sm
              text-red-400
              transition
              hover:bg-red-500/20
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {deleteLoading ? (
              <div
                className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-red-400/30
                  border-t-red-400
                "
              />
            ) : (
              <Trash2 size={17} />
            )}

            {deleteLoading
              ? "Deleting..."
              : "Delete"}

          </button>

        </div>

      </section>


      {/* MAIN CARD */}

      <section
        className="
          rounded-2xl
          border
          border-stone-800
          bg-stone-900
          p-6
          sm:p-8
        "
      >

        <div
          className="
            flex
            flex-col
            items-start
            gap-4
            sm:flex-row
            sm:items-center
          "
        >

          <div
            className="
              rounded-xl
              bg-orange-500/10
              p-4
              text-orange-400
            "
          >
            <FolderKanban size={32} />
          </div>


          <div>

            <h2
              className="
                text-xl
                font-semibold
                text-white
              "
            >
              {project.projectName}
            </h2>

            <span
              className="
                mt-2
                inline-block
                rounded-full
                bg-green-500/10
                px-3
                py-1
                text-xs
                text-green-400
              "
            >
              {project.status || "Active"}
            </span>

          </div>

        </div>


        {/* STATS */}

        <div
          className="
            mt-8
            grid
            gap-5
            md:grid-cols-2
          "
        >

          <div
            className="
              rounded-xl
              bg-stone-800
              p-5
            "
          >

            <Mail
              size={22}
              className="text-orange-400"
            />

            <p
              className="
                mt-3
                text-sm
                text-stone-400
              "
            >
              Emails Sent
            </p>

            <h3
              className="
                mt-1
                text-2xl
                font-bold
                text-white
              "
            >
              {project.emailCount || 0}
            </h3>

          </div>


          <div
            className="
              rounded-xl
              bg-stone-800
              p-5
            "
          >

            <Calendar
              size={22}
              className="text-orange-400"
            />

            <p
              className="
                mt-3
                text-sm
                text-stone-400
              "
            >
              Created
            </p>

            <h3
              className="
                mt-1
                text-sm
                text-white
              "
            >
              {project.createdAt
                ? new Date(
                    project.createdAt
                  ).toLocaleDateString()
                : "-"}
            </h3>

          </div>

        </div>


        {/* DESCRIPTION */}

        <div className="mt-8">

          <h3
            className="
              text-sm
              font-semibold
              text-white
            "
          >
            Description
          </h3>

          <p
            className="
              mt-2
              text-sm
              leading-relaxed
              text-stone-400
            "
          >
            {project.description ||
              "No description added"}
          </p>

        </div>

      </section>

    </div>
  );
};


export default ProjectDetails;