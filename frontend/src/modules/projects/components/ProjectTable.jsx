import {
  FolderKanban,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";


const ProjectTable = ({
  projects = [],
}) => {

  const navigate = useNavigate();


  return (
    <div
      className="
        hidden
        overflow-hidden
        rounded-2xl
        border
        border-stone-800
        bg-stone-900
        md:block
      "
    >

      <table className="w-full">

        <thead
          className="
            border-b
            border-stone-800
          "
        >

          <tr>

            <th
              className="
                px-6
                py-4
                text-left
                text-xs
                font-medium
                uppercase
                text-stone-500
              "
            >
              Project
            </th>


            <th
              className="
                px-6
                py-4
                text-left
                text-xs
                font-medium
                uppercase
                text-stone-500
              "
            >
              Status
            </th>


            <th
              className="
                px-6
                py-4
                text-right
                text-xs
                font-medium
                uppercase
                text-stone-500
              "
            >
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {projects.map((project) => (

            <tr
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
                cursor-pointer
                border-b
                border-stone-800
                transition-all
                duration-200
                hover:bg-stone-800/60
                focus:bg-stone-800/60
                focus:outline-none
              "
            >

              <td className="px-6 py-4">

                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      rounded-lg
                      bg-orange-500/10
                      p-2
                      text-orange-400
                    "
                  >
                    <FolderKanban size={18} />
                  </div>


                  <div>

                    <p
                      className="
                        text-sm
                        font-medium
                        text-white
                      "
                    >
                      {project.projectName ||
                        project.name}
                    </p>

                    <p
                      className="
                        max-w-xs
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

              </td>


              <td className="px-6 py-4">

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

              </td>


              <td
                className="
                  px-6
                  py-4
                  text-right
                "
              >

                <span
                  className="
                    text-xs
                    text-stone-500
                    transition
                    group-hover:text-orange-400
                  "
                >
                  View →
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};


export default ProjectTable;