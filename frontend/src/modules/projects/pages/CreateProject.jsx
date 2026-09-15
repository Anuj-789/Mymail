import { useNavigate } from "react-router-dom";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { ArrowLeft } from "lucide-react";

import ProjectForm from "../components/ProjectForm";

import { createProject } from "@/features/project/projectThunk";

import {
  selectProjectLoading,
} from "@/features/project/projectSelectors";

import { toast } from "react-hot-toast";


const CreateProject = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const loading = useSelector(
    selectProjectLoading
  );


  const handleSubmit = async (data) => {

    try {

      await dispatch(
        createProject(data)
      ).unwrap();


      toast.success(
        "Project created successfully"
      );


      navigate(
        "/dashboard/projects",
        { replace: true }
      );

    } catch (error) {

      toast.error(
        error?.message ||
        error ||
        "Failed to create project"
      );

    }
  };


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
            Create Project
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-stone-400
            "
          >
            Setup a new email workspace
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
          onSubmit={handleSubmit}
          loading={loading}
        />

      </section>

    </div>
  );
};


export default CreateProject;