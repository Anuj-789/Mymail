import { Code2, Palette } from "lucide-react";
import { useEffect, useRef } from "react";

import api from "@/services/api";

const TemplateEditor = ({
  htmlContent,
  setHtmlContent,
  cssContent,
  setCssContent,
  setVariables,
}) => {
  const timer = useRef(null);

  useEffect(() => {
    if (!setVariables) return;

    clearTimeout(timer.current);

    timer.current = setTimeout(async () => {
      try {
        const res = await api.post("/templates/editor-variables", {
          htmlContent,
        });

        setVariables(res.data.variables || []);
      } catch (error) {
        console.log(error);
      }
    }, 800);

    return () => clearTimeout(timer.current);
  }, [htmlContent]);

  return (
    <div className="space-y-5">
      {/* HTML */}

      <div
        className="
        bg-stone-900
        border
        border-stone-800
        rounded-2xl
        p-5
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="text-orange-400" size={20} />

          <h3 className="text-white font-semibold">HTML Content</h3>
        </div>

        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="
          w-full
          min-h-[350px]
          bg-stone-950
          border
          border-stone-700
          rounded-xl
          p-4
          text-sm
          text-green-400
          font-mono
          resize-y
          outline-none
          focus:border-orange-500
          "
          placeholder="<html>Your email template</html>"
        />
      </div>

      {/* CSS */}

      <div
        className="
        bg-stone-900
        border
        border-stone-800
        rounded-2xl
        p-5
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <Palette className="text-orange-400" size={20} />

          <h3 className="text-white font-semibold">CSS Content</h3>
        </div>

        <textarea
          value={cssContent}
          onChange={(e) => setCssContent(e.target.value)}
          className="
          w-full
          min-h-[220px]
          bg-stone-950
          border
          border-stone-700
          rounded-xl
          p-4
          text-sm
          text-blue-400
          font-mono
          resize-y
          outline-none
          focus:border-orange-500
          "
          placeholder="body { font-family: Arial; }"
        />
      </div>
    </div>
  );
};

export default TemplateEditor;
