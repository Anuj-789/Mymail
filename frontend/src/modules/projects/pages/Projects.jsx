import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  Plus,
  FolderKanban,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  fetchProjects,
} from "@/features/project/projectThunk";

import {
  selectProjects,
  selectProjectLoading,
  selectProjectError,
} from "@/features/project/projectSelectors";

import ProjectTable from "../components/ProjectTable";
import ProjectCard from "../components/ProjectCard";


const Projects = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  const projects =
    useSelector(selectProjects);

  const loading =
    useSelector(selectProjectLoading);

  const error =
    useSelector(selectProjectError);



  useEffect(() => {

    dispatch(
      fetchProjects()
    );

  }, [dispatch]);



  return (

    <div className="space-y-8">


      {/* =========================
          ACTION BAR
      ========================= */}

      <section
        className="
          flex
          justify-end
        "
      >

        <button
          type="button"
          onClick={() =>
            navigate(
              "/dashboard/projects/create"
            )
          }
          className="
            group
            flex
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
            shadow-lg
            shadow-orange-500/10
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-orange-400
            hover:shadow-orange-500/20
            active:translate-y-0
          "
        >

          <Plus
            size={18}
            className="
              transition-transform
              duration-200
              group-hover:rotate-90
            "
          />

          Create Project

        </button>

      </section>



      {/* =========================
          ERROR
      ========================= */}

      {error && (

        <div
          className="
            animate-in
            fade-in
            slide-in-from-top-2
            rounded-xl
            border
            border-red-500/30
            bg-red-500/10
            p-4
            text-sm
            text-red-400
          "
        >

          {error}

        </div>

      )}



      {/* =========================
          LOADING
          GIF ONLY FOR PROJECT LIST
      ========================= */}

      {loading ? (

        <div
          className="
            flex
            min-h-[420px]
            flex-col
            items-center
            justify-center
            px-4
          "
        >

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              text-center
              animate-in
              fade-in
            "
          >

            <img
              src="/gungif3.gif"
              alt="Loading Projects"
              className="
                h-28
                w-28
                object-contain
                sm:h-32
                sm:w-32
              "
            />

            <h3
              className="
                mt-4
                text-base
                font-semibold
                text-white
              "
            >
              Loading Projects
            </h3>

            <p
              className="
                mt-1
                text-sm
                text-stone-500
              "
            >
              Please wait while we fetch your projects...
            </p>

          </div>

        </div>

      ) : projects.length === 0 ? (

        /* =========================
           EMPTY STATE
        ========================= */

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-stone-800
            bg-stone-900
            p-10
            text-center
            transition-all
            duration-300
            hover:border-stone-700
          "
        >

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-orange-500/10
              text-orange-400
            "
          >

            <FolderKanban
              size={32}
            />

          </div>


          <h3
            className="
              mt-4
              text-lg
              font-semibold
              text-white
            "
          >
            No Projects Found
          </h3>


          <p
            className="
              mt-2
              text-sm
              text-stone-400
            "
          >
            Create your first project
          </p>

        </div>

      ) : (

        /* =========================
           PROJECT DATA
        ========================= */

        <>

          <ProjectTable
            projects={projects}
          />

          <ProjectCard
            projects={projects}
          />

        </>

      )}

    </div>

  );

};


export default Projects;