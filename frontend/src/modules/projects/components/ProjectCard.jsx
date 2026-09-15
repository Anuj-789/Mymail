import {
  FolderKanban,
  Mail,
} from "lucide-react";

import { useNavigate } from "react-router-dom";


const ProjectCard = ({
  projects = [],
}) => {

  const navigate = useNavigate();


  return (
    <div
      className="
        space-y-4
        p-4
        md:hidden
      "
    >

      {projects.map((project) => (

        <div
          key={project._id}
          role="button"
          tabIndex={0}
          onClick={() =>
            navigate(
              `/dashboard/projects/${project._id}`
            )
          }
          onKeyDown={(event) => {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              navigate(
                `/dashboard/projects/${project._id}`
              );
            }

          }}
          className="
            group
            cursor-pointer
            rounded-2xl
            border
            border-stone-800
            bg-stone-950
            p-5
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-orange-500/30
            hover:bg-stone-900
            hover:shadow-xl
            hover:shadow-orange-500/5
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500/40
          "
        >

          <div
            className="
              flex
              items-start
              gap-3
            "
          >

            <div
              className="
                rounded-xl
                bg-orange-500/10
                p-3
                text-orange-400
                transition
                duration-300
                group-hover:bg-orange-500/20
                group-hover:scale-105
              "
            >
              <FolderKanban size={22} />
            </div>


            <div className="min-w-0 flex-1">

              <h3
                className="
                  truncate
                  text-sm
                  font-semibold
                  text-white
                "
              >
                {project.projectName ||
                  project.name}
              </h3>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  text-stone-500
                "
              >
                {project.description ||
                  "No description"}
              </p>

            </div>

          </div>


          <div
            className="
              mt-5
              flex
              items-center
              justify-between
            "
          >

            <span
              className="
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


            <div
              className="
                flex
                items-center
                gap-2
                text-xs
                text-stone-400
              "
            >
              <Mail size={14} />

              {project.emailCount || 0}

              Emails
            </div>

          </div>

        </div>

      ))}

    </div>
  );
};


export default ProjectCard;