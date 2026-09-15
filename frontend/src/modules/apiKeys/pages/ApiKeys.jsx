import { useEffect, useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import GenerateKeyModal from "../components/GenerateKeyModal";
import ApiKeyTable from "../components/ApiKeyTable";

import {
  fetchProjects,
} from "@/features/project/projectThunk";

import {
  selectProjects,
} from "@/features/project/projectSelectors";

import {
  fetchApiKeys,
  generateApiKey,
  regenerateApiKey,
  updateApiKeyStatus,
} from "@/features/apiKey/apiKeyThunk";

import {
  selectApiKeys,
  selectApiKeyLoading,
} from "@/features/apiKey/apiKeySelectors";

import { toast } from "react-hot-toast";

import Loader from "@/components/ui/Loader";


const ApiKeys = () => {

  const dispatch = useDispatch();


  const apiKeys =
    useSelector(selectApiKeys);

  const projects =
    useSelector(selectProjects);

  const loading =
    useSelector(selectApiKeyLoading);


  const [open, setOpen] =
    useState(false);

  const [generatedKey, setGeneratedKey] =
    useState(null);

  const [selectedKey, setSelectedKey] =
    useState(null);



  /* =========================
     FETCH PROJECTS
  ========================= */

  useEffect(() => {

    dispatch(
      fetchProjects()
    );

  }, [dispatch]);



  /* =========================
     FETCH API KEYS
  ========================= */

  useEffect(() => {

    if (projects.length) {

      projects.forEach((project) => {

        dispatch(
          fetchApiKeys(project._id)
        );

      });

    }

  }, [projects, dispatch]);



  /* =========================
     HELPERS
  ========================= */

  const getProjectId = (key) => {

    if (!key) return null;


    if (
      key.projectId &&
      typeof key.projectId === "object"
    ) {

      return key.projectId._id;

    }


    return key.projectId || null;

  };



  const getProjectName = (key) => {

    if (
      key.projectId &&
      typeof key.projectId === "object"
    ) {

      return key.projectId.projectName;

    }


    const projectId =
      getProjectId(key);


    const project =
      projects.find(
        (item) =>
          item._id === projectId
      );


    return (
      project?.projectName ||
      "Project"
    );

  };



  /* =========================
     GENERATE API KEY
  ========================= */

  const handleGenerate =
    async (projectId) => {

      try {

        const response =
          await dispatch(
            generateApiKey(projectId)
          ).unwrap();


        setGeneratedKey(response);


        toast.success(
          "API Key generated successfully"
        );


        setOpen(false);


        dispatch(
          fetchApiKeys(projectId)
        );

      } catch (error) {

        toast.error(
          error ||
          "Failed to generate key"
        );

      }

    };



  /* =========================
     REGENERATE API KEY
  ========================= */

  const handleRegenerate =
    async () => {

      try {

        const projectId =
          getProjectId(selectedKey);


        if (!projectId) {

          toast.error(
            "Project id missing"
          );

          return;

        }


        const response =
          await dispatch(
            regenerateApiKey(projectId)
          ).unwrap();


        setSelectedKey(null);

        setGeneratedKey(response);


        toast.success(
          "API Key regenerated"
        );


        dispatch(
          fetchApiKeys(projectId)
        );

      } catch (error) {

        toast.error(
          error ||
          "Regenerate failed"
        );

      }

    };



  /* =========================
     UPDATE STATUS
  ========================= */

  const handleStatus =
    async () => {

      try {

        const projectId =
          getProjectId(selectedKey);


        if (!projectId) {

          toast.error(
            "Project id missing"
          );

          return;

        }


        const status =
          selectedKey.status === "active"
            ? "inactive"
            : "active";


        await dispatch(
          updateApiKeyStatus({
            projectId,
            status,
          })
        ).unwrap();


        toast.success(
          `API Key ${status}`
        );


        setSelectedKey({
          ...selectedKey,
          status,
        });


        dispatch(
          fetchApiKeys(projectId)
        );

      } catch (error) {

        toast.error(
          error ||
          "Status update failed"
        );

      }

    };



  /* =========================
     COPY KEY
  ========================= */

  const copyKey = () => {

    navigator.clipboard.writeText(
      generatedKey
    );


    toast.success(
      "API Key copied"
    );

  };



  return (

    <div className="space-y-6">


      {/* =========================
          ACTION BAR
      ========================= */}

      <div
        className="
          flex
          justify-end
        "
      >

        <button
          type="button"
          onClick={() =>
            setOpen(true)
          }
          className="
            w-full
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
            sm:w-auto
          "
        >

          + Create API Key

        </button>

      </div>



      {/* =========================
          LOADING / TABLE
      ========================= */}

      {loading ? (

        <Loader pageName="API Keys" />

      ) : (

        <ApiKeyTable
          data={apiKeys}
          projects={projects}
          onShow={(key) =>
            setSelectedKey(key)
          }
        />

      )}



      {/* =========================
          GENERATE MODAL
      ========================= */}

      <GenerateKeyModal
        open={open}
        onClose={() =>
          setOpen(false)
        }
        projects={projects}
        loading={loading}
        onGenerate={handleGenerate}
      />



      {/* =========================
          GENERATED KEY MODAL
      ========================= */}

      {generatedKey && (

        <div
          onClick={() =>
            setGeneratedKey(null)
          }
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              w-full
              max-w-lg
              rounded-2xl
              border
              border-orange-500/30
              bg-stone-900
              p-5
              shadow-2xl
              sm:p-6
            "
          >

            <h2 className="text-xl font-bold text-white">
              API Key Generated
            </h2>


            <p className="mt-2 text-sm text-stone-400">
              Copy this key now. You won't see it again.
            </p>


            <div
              className="
                mt-5
                break-all
                rounded-xl
                border
                border-stone-800
                bg-stone-950
                p-4
                text-sm
                text-orange-400
              "
            >
              {generatedKey}
            </div>


            <button
              type="button"
              onClick={copyKey}
              className="
                mt-5
                w-full
                rounded-xl
                bg-orange-500
                py-3
                font-semibold
                text-black
                transition
                hover:bg-orange-400
              "
            >
              Copy API Key
            </button>


            <button
              type="button"
              onClick={() =>
                setGeneratedKey(null)
              }
              className="
                mt-3
                w-full
                rounded-xl
                border
                border-stone-700
                py-3
                text-white
                transition
                hover:bg-stone-800
              "
            >
              Close
            </button>

          </div>

        </div>

      )}



      {/* =========================
          API KEY DETAILS
      ========================= */}

      {selectedKey && (

        <div
          onClick={() =>
            setSelectedKey(null)
          }
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            p-4
            backdrop-blur-sm
          "
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            className="
              w-full
              max-w-lg
              rounded-2xl
              border
              border-stone-800
              bg-stone-900
              p-5
              shadow-2xl
              sm:p-6
            "
          >

            <h2 className="text-xl font-bold text-white">
              API Key Details
            </h2>


            <div className="mt-5 space-y-4">

              <div>

                <p className="text-sm text-stone-400">
                  Project
                </p>

                <p className="mt-1 text-white">
                  {getProjectName(
                    selectedKey
                  )}
                </p>

              </div>


              <div>

                <p className="text-sm text-stone-400">
                  Prefix
                </p>

                <p className="mt-1 text-orange-400">
                  {selectedKey.keyPrefix}
                </p>

              </div>


              <div>

                <p className="text-sm text-stone-400">
                  Status
                </p>

                <p className="mt-1 text-white">
                  {selectedKey.status}
                </p>

              </div>


              <div>

                <p className="text-sm text-stone-400">
                  Usage
                </p>

                <p className="mt-1 text-white">
                  {selectedKey.usageCount || 0}
                </p>

              </div>

            </div>



            <div
              className="
                mt-6
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <button
                type="button"
                onClick={handleRegenerate}
                className="
                  flex-1
                  rounded-xl
                  bg-orange-500
                  py-3
                  font-semibold
                  text-black
                  transition
                  hover:bg-orange-400
                "
              >
                Regenerate
              </button>


              <button
                type="button"
                onClick={handleStatus}
                className="
                  flex-1
                  rounded-xl
                  border
                  border-stone-700
                  py-3
                  text-white
                  transition
                  hover:bg-stone-800
                "
              >
                {selectedKey.status === "active"
                  ? "Deactivate"
                  : "Activate"}
              </button>

            </div>


            <button
              type="button"
              onClick={() =>
                setSelectedKey(null)
              }
              className="
                mt-4
                w-full
                rounded-xl
                border
                border-stone-700
                py-3
                text-white
                transition
                hover:bg-stone-800
              "
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

};


export default ApiKeys;