import { Eye, Copy, FileText } from "lucide-react";

const SystemTemplateCard = ({ template, onPreview, onUse }) => {
  return (
    <div
      className="
      bg-stone-900
      border
      border-stone-800
      rounded-2xl
      p-5
      flex
      flex-col
      justify-between
      hover:border-orange-500/30
      transition
      "
    >
      <div>
        <div
          className="
          h-12
          w-12
          rounded-xl
          bg-orange-500/10
          flex
          items-center
          justify-center
          text-orange-400
          mb-4
          "
        >
          <FileText size={24} />
        </div>

        <h3
          className="
          text-white
          font-semibold
          text-lg
          capitalize
          "
        >
          {template.templateName}
        </h3>

        <p
          className="
          text-sm
          text-stone-500
          mt-2
          break-all
          "
        >
          Type: {template.templateType}
        </p>
      </div>

      <div
        className="
        flex
        flex-col
        sm:flex-row
        gap-3
        mt-6
        "
      >
        <button
          onClick={() => onPreview(template.templateType)}
          className="
          flex-1
          flex
          items-center
          justify-center
          gap-2
          py-2.5
          rounded-xl
          bg-stone-950
          border
          border-stone-700
          text-stone-300
          hover:text-white
          hover:border-stone-500
          transition
          "
        >
          <Eye size={17} />
          Preview
        </button>

        <button
          onClick={() => onUse(template.templateType)}
          className="
          flex-1
          flex
          items-center
          justify-center
          gap-2
          py-2.5
          rounded-xl
          bg-orange-500
          text-black
          font-semibold
          hover:bg-orange-400
          transition
          "
        >
          <Copy size={17} />
          Use Template
        </button>
      </div>
    </div>
  );
};

export default SystemTemplateCard;
