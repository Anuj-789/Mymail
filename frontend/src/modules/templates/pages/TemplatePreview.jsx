import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Loader2 } from "lucide-react";

import api from "@/services/api";

const TemplatePreview = () => {
  const navigate = useNavigate();

  const { projectId, id } = useParams();

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const loadPreview = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        `/templates/projects/${projectId}/templates/${id}/preview`,

        {
          data: {},
        },
      );

      setPreview(res.data.preview);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreview();
  }, []);

  return (
    <div
      className="
      space-y-6
      "
    >
      <div
        className="
        flex
        items-center
        gap-3
        "
      >
        <button
          onClick={() => navigate(-1)}
          className="
          h-10
          w-10
          rounded-xl
          bg-stone-900
          border
          border-stone-800
          text-stone-400
          hover:text-white
          "
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <h1
            className="
            text-3xl
            font-bold
            text-white
            "
          >
            Template Preview
          </h1>

          <p
            className="
            text-stone-400
            "
          >
            Final email rendering
          </p>
        </div>
      </div>

      {loading && (
        <div
          className="
          flex
          items-center
          justify-center
          h-40
          "
        >
          <Loader2
            className="
            animate-spin
            text-orange-500
            "
          />
        </div>
      )}

      {preview && (
        <div
          className="
          bg-stone-900
          border
          border-stone-800
          rounded-2xl
          p-4
          "
        >
          <iframe
            title="email-preview"
            srcDoc={preview}
            className="
            w-full
            min-h-[700px]
            bg-white
            rounded-xl
            border-0
            "
          />
        </div>
      )}
    </div>
  );
};

export default TemplatePreview;
