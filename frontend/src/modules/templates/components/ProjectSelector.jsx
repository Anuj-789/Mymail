import { FolderKanban } from "lucide-react";

const ProjectSelector = ({ projects, selectedProject, setSelectedProject }) => {
  const selectedProjectData = projects.find(
    (project) => project._id === selectedProject,
  );

  return (
    <div
      className="
      bg-stone-900
      border
      border-stone-800
      rounded-2xl
      p-5
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        mb-4
        "
      >
        <div
          className="
          h-10
          w-10
          rounded-xl
          bg-orange-500/10
          flex
          items-center
          justify-center
          text-orange-400
          "
        >
          <FolderKanban size={20} />
        </div>

        <div>
          <h2
            className="
            text-white
            font-semibold
            "
          >
            Select Project
          </h2>

          <p
            className="
            text-sm
            text-stone-400
            "
          >
            Choose project for your template
          </p>
        </div>
      </div>

      {projects.length > 0 ? (
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="
          w-full
          bg-stone-950
          border
          border-stone-700
          rounded-xl
          px-4
          py-3
          text-white
          outline-none
          focus:border-orange-500
          transition
          "
        >
          <option value="">Select a project</option>

          {projects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.projectName || "Unnamed Project"}
            </option>
          ))}
        </select>
      ) : (
        <div
          className="
            bg-stone-950
            border
            border-stone-800
            rounded-xl
            p-4
            text-sm
            text-stone-400
            "
        >
          All projects already have templates created. Can create a new project to add a template.
        </div>
      )}

      {selectedProject && selectedProjectData && (
        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            text-sm
            text-green-400
            "
        >
          <span>✓</span>
          {selectedProjectData.projectName} selected
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
