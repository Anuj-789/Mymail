import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import toast from "react-hot-toast";

import TemplateForm from "../components/TemplateForm";
import TemplateEditor from "../components/TemplateEditor";
import VariableInsert from "../components/VariableInsert";
import LiveTemplatePreview from "../components/LiveTemplatePreview";

import api from "@/services/api";

const CreateTemplate = () => {
  const navigate = useNavigate();

  const { projectId } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    templateName: "",
    subject: "",
    templateType: "custom",
  });

  const [htmlContent, setHtmlContent] = useState("");

  const [cssContent, setCssContent] = useState("");

  const [variables, setVariables] = useState([]);

  const extractVariables = (html) => {
    const matches = html.match(/{{(.*?)}}/g);

    if (!matches) return [];

    return [
      ...new Set(
        matches.map(
          (item) =>
            item
              .replace("{{", "")
              .replace("}}", "")
              .trim()
        )
      ),
    ];
  };

  const handleHtmlChange = (value) => {
    setHtmlContent(value);

    setVariables(
      extractVariables(value)
    );
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.templateName.trim()) {
      toast.error("Please enter template name");
      return;
    }

    if (!formData.subject.trim()) {
      toast.error("Please enter email subject");
      return;
    }

    if (!htmlContent.trim()) {
      toast.error("Please add HTML content");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        `/templates/projects/${projectId}/templates`,
        {
          ...formData,
          htmlContent,
          cssContent,
        }
      );

      toast.success(
        "Template created successfully"
      );

      navigate("/dashboard/templates");

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Template creation failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* =========================
          PAGE HEADER
      ========================= */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        {/* BACK BUTTON */}

        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-stone-800
            bg-stone-900
            text-stone-300
            transition-all
            duration-200
            hover:border-orange-500/30
            hover:bg-orange-500/10
            hover:text-orange-400
            active:scale-95
          "
        >
          <ArrowLeft size={20} />
        </button>

        {/* TITLE */}

        <div>
          <h1
            className="
              text-2xl
              font-bold
              text-white
              sm:text-3xl
            "
          >
            Create Template
          </h1>

          <p className="mt-1 text-sm text-stone-500">
            Create and customize your email template
          </p>
        </div>

      </div>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div
        className="
          grid
          grid-cols-1
          items-start
          gap-6
          xl:grid-cols-12
        "
      >

        {/* =========================
            LEFT
        ========================= */}

        <div
          className="
            space-y-6
            xl:col-span-3
          "
        >

          <TemplateForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleCreate}
            loading={loading}
            buttonText="Create Template"
          />

          <VariableInsert
            variables={variables}
            htmlContent={htmlContent}
            setHtmlContent={handleHtmlChange}
          />

        </div>

        {/* =========================
            EDITOR
        ========================= */}

        <div
          className="
            xl:col-span-5
          "
        >

          <TemplateEditor
            htmlContent={htmlContent}
            setHtmlContent={handleHtmlChange}
            cssContent={cssContent}
            setCssContent={setCssContent}
          />

        </div>

        {/* =========================
            PREVIEW
        ========================= */}

        <div
          className="
            xl:col-span-4
          "
        >

          <div
            className="
              h-[420px]
              w-full
            "
          >

            <LiveTemplatePreview
              htmlContent={htmlContent}
              cssContent={cssContent}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default CreateTemplate;