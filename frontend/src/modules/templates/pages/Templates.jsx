import { useEffect, useState } from "react";

import {
  Plus,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  toast,
} from "react-hot-toast";

import ProjectSelector from "../components/ProjectSelector";
import SystemTemplateCard from "../components/SystemTemplateCard";
import TemplateCard from "../components/TemplateCard";
import TemplateTabs from "../components/TemplateTabs";
import TemplatePreviewFrame from "../components/TemplatePreviewFrame";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import api from "@/services/api";

import Loader from "@/components/ui/Loader";


const Templates = () => {

  const navigate =
    useNavigate();


  const [projects, setProjects] =
    useState([]);


  const [selectedProject, setSelectedProject] =
    useState("");


  const [activeTab, setActiveTab] =
    useState("system");


  const [systemTemplates, setSystemTemplates] =
    useState([]);


  const [myTemplates, setMyTemplates] =
    useState([]);


  const [preview, setPreview] =
    useState("");


  const [showPreview, setShowPreview] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [deleteModal, setDeleteModal] =
    useState(false);


  const [deleteId, setDeleteId] =
    useState(null);



  /* =========================
     FETCH PROJECTS
  ========================= */

  const fetchProjects =
    async () => {

      try {

        const res =
          await api.get(
            "/projects/available"
          );


        const availableProjects =
          res.data.projects || [];


        setProjects(
          availableProjects
        );


        const savedProject =
          localStorage.getItem(
            "selectedProject"
          );


        const exists =
          availableProjects.find(
            (project) =>
              project._id ===
              savedProject
          );


        if (exists) {

          setSelectedProject(
            savedProject
          );

        } else {

          localStorage.removeItem(
            "selectedProject"
          );

          setSelectedProject("");

        }

      } catch (error) {

        console.log(error);

      }

    };



  /* =========================
     SYSTEM TEMPLATES
  ========================= */

  const fetchSystemTemplates =
    async () => {

      try {

        const res =
          await api.get(
            "/templates/system"
          );


        setSystemTemplates(
          res.data.templates || []
        );

      } catch (error) {

        console.log(error);

      }

    };



  /* =========================
     MY TEMPLATES
  ========================= */

  const fetchMyTemplates =
    async () => {

      try {

        const res =
          await api.get(
            "/templates/my-templates"
          );


        setMyTemplates(
          res.data.templates || []
        );

      } catch (error) {

        console.log(error);

      }

    };



  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {

    fetchProjects();

    fetchSystemTemplates();

    fetchMyTemplates();

  }, []);



  /* =========================
     SAVE PROJECT
  ========================= */

  useEffect(() => {

    if (selectedProject) {

      localStorage.setItem(
        "selectedProject",
        selectedProject
      );

    }

  }, [selectedProject]);



  /* =========================
     PREVIEW
  ========================= */

  const handlePreview =
    async (type) => {

      try {

        setLoading(true);


        const res =
          await api.get(
            `/templates/system/${type}`
          );


        setPreview(
          res.data.template.htmlContent
        );


        setShowPreview(true);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };



  /* =========================
     USE TEMPLATE
  ========================= */

  const handleUseTemplate =
    async (type) => {

      if (!selectedProject) {

        toast.error(
          "Please select a project first"
        );

        return;

      }


      try {

        setLoading(true);


        const res =
          await api.post(

            `/templates/system/${type}/clone`,

            {
              projectId:
                selectedProject,
            }

          );


        navigate(

          `/dashboard/templates/${selectedProject}/edit/${res.data.template._id}`

        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };



  /* =========================
     DELETE
  ========================= */

  const handleDelete =
    (data) => {

      setDeleteId(data);

      setDeleteModal(true);

    };



  const confirmDelete =
    async () => {

      if (!deleteId) return;


      try {

        setLoading(true);


        await api.delete(

          `/templates/projects/${deleteId.projectId}/templates/${deleteId.id}`

        );


        toast.success(
          "Template deleted successfully"
        );


        setDeleteModal(false);

        setDeleteId(null);


        fetchMyTemplates();

        fetchProjects();

      } catch (error) {

        console.log(error);


        toast.error(
          "Delete failed"
        );

      } finally {

        setLoading(false);

      }

    };



  /* =========================
     CREATE OWN
  ========================= */

  const handleCreateOwn =
    () => {

      if (!selectedProject) {

        toast.error(
          "Please select a project first"
        );

        return;

      }


      navigate(
        `/dashboard/templates/${selectedProject}/create`
      );

    };



  return (

    <div className="space-y-6">


      {/* =========================
          ACTION AREA
          PAGE TITLE REMOVED
      ========================= */}

      <div
        className="
          flex
          justify-end
        "
      >

        {activeTab === "create" && (

          <button
            onClick={handleCreateOwn}
            className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-5
              py-3
              font-semibold
              text-black
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-orange-400
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

            Create Own Template

          </button>

        )}

      </div>



      {/* =========================
          PROJECT SELECTOR
      ========================= */}

      <ProjectSelector
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={
          setSelectedProject
        }
      />



      {/* =========================
          TABS
      ========================= */}

      <TemplateTabs
        activeTab={activeTab}
        setActiveTab={(tab) => {

          if (
            tab === "create" &&
            !selectedProject
          ) {

            toast.error(
              "Please select project first"
            );

            return;

          }


          setActiveTab(tab);

        }}
      />



      {/* =========================
          SYSTEM TEMPLATES
      ========================= */}

      {activeTab === "system" && (

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {systemTemplates.map(
            (template) => (

              <SystemTemplateCard
                key={
                  template.templateType
                }
                template={template}
                onPreview={
                  handlePreview
                }
                onUse={
                  handleUseTemplate
                }
              />

            )
          )}

        </div>

      )}



      {/* =========================
          CUSTOM TEMPLATES
      ========================= */}

      {activeTab === "custom" && (

        <div
          className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
            xl:grid-cols-3
          "
        >

          {myTemplates.map(
            (template) => (

              <TemplateCard
                key={template._id}
                template={template}

                onPreview={() =>
                  navigate(
                    `/dashboard/templates/${template.projectId._id}/preview/${template._id}`
                  )
                }

                onEdit={(id) =>
                  navigate(
                    `/dashboard/templates/${template.projectId._id}/edit/${id}`
                  )
                }

                onDelete={
                  handleDelete
                }
              />

            )
          )}

        </div>

      )}



      {/* =========================
          CREATE TAB
      ========================= */}

      {activeTab === "create" && (

        <div
          className="
            rounded-2xl
            border
            border-stone-800
            bg-stone-900/50
            p-8
            text-center
          "
        >

          <h3 className="text-lg font-semibold text-white">
            Create Your Own Template
          </h3>

          <p className="mt-2 text-sm text-stone-400">
            Start building a custom email template
            for your selected project.
          </p>

        </div>

      )}



      {/* =========================
          PREVIEW
      ========================= */}

      {showPreview && preview && (

        <TemplatePreviewFrame
          preview={preview}
          closePreview={() => {

            setShowPreview(false);

            setPreview("");

          }}
        />

      )}



      {/* =========================
          DELETE MODAL
      ========================= */}

      <DeleteConfirmModal
        open={deleteModal}

        onClose={() => {

          setDeleteModal(false);

          setDeleteId(null);

        }}

        onConfirm={confirmDelete}

        loading={loading}

        title="Delete Template"

        message="
          Are you sure you want to delete this template?
          This action cannot be undone.
        "
      />



      {/* =========================
          LOADER
      ========================= */}

      {loading && (
        <Loader
          pageName="Templates"
        />
      )}

    </div>

  );

};


export default Templates;