import { FolderKanban } from "lucide-react";

const RecentProjects = ({ projects = [] }) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-stone-800
        bg-stone-900
        p-5
      "
    >
      {projects.length === 0 ? (
        <div
          className="
            flex
            min-h-[220px]
            flex-col
            items-center
            justify-center
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-stone-800
              text-stone-500
            "
          >
            <FolderKanban size={21} />
          </div>

          <p className="mt-4 text-sm text-stone-400">
            No projects found
          </p>

          <p className="mt-1 text-xs text-stone-600">
            Your recent projects will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.slice(0, 5).map((project) => (
            <div
              key={project._id}
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                border-transparent
                bg-stone-800/50
                p-4
                transition
                hover:border-stone-700
                hover:bg-stone-800
              "
            >
              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-sm
                    font-medium
                    text-white
                  "
                >
                  {project.projectName}
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-stone-500
                  "
                >
                  Project
                </p>
              </div>

              <span
                className={`
                  shrink-0
                  rounded-full
                  px-3
                  py-1
                  text-[11px]
                  font-medium
                  ${
                    project.status === "active"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-stone-700 text-stone-400"
                  }
                `}
              >
                {project.status || "active"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProjects;