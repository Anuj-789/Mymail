import { useEffect } from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { ArrowLeft } from "lucide-react";

import { toast } from "react-hot-toast";

import ProjectForm from "../components/ProjectForm";

import {
  fetchProject,
  updateProject,
} from "@/features/project/projectThunk";

import {
  selectProject,
  selectProjectLoading,
} from "@/features/project/projectSelectors";


const EditProject = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const project = useSelector(selectProject);

  const loading = useSelector(
    selectProjectLoading
  );


  useEffect(() => {

    if (id) {
      dispatch(fetchProject(id));
    }

  }, [id, dispatch]);


  const handleSubmit = async (data) => {

    try {

      await dispatch(
        updateProject({
          id,
          data,
        })
      ).unwrap();


      toast.success(
        "Project updated successfully"
      );


      // Directly Projects page
      navigate(
        "/dashboard/projects",
        { replace: true }
      );

    } catch (error) {

      toast.error(
        error?.message ||
        error ||
        "Update failed"
      );

    }
  };


  /* =========================
     LOADING
  ========================= */

  if (loading || !project) {

    return (
      <div
        className="
          flex
          min-h-[400px]
          flex-col
          items-center
          justify-center
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


  return (
    <div className="space-y-8">

      {/* HEADER */}

      <section
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
            Edit Project
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-stone-400
            "
          >
            Update your project details
          </p>

        </div>

      </section>


      {/* FORM */}

      <section
        className="
          max-w-3xl
          rounded-2xl
          border
          border-stone-800
          bg-stone-900
          p-6
          sm:p-8
        "
      >

        <ProjectForm
          defaultValues={{
            projectName:
              project.projectName,

            description:
              project.description || "",
          }}
          onSubmit={handleSubmit}
          loading={loading}
        />

      </section>

    </div>
  );
};


export default EditProject;