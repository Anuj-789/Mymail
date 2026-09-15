import { Copy, Variable } from "lucide-react";

const VariableInsert = ({ variables, htmlContent, setHtmlContent }) => {
  const insertVariable = (variable) => {
    const value = `{{${variable}}}`;

    setHtmlContent(htmlContent + value);
  };

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
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
          h-10
          w-10
          rounded-xl
          bg-orange-500/10
          text-orange-400
          flex
          items-center
          justify-center
          "
        >
          <Variable size={20} />
        </div>

        <div>
          <h3 className="text-white font-semibold">Variables</h3>

          <p className="text-xs text-stone-500">Auto detected variables</p>
        </div>
      </div>

      {variables?.length > 0 ? (
        <div
          className="
          flex
          flex-wrap
          gap-3
          "
        >
          {variables.map((variable) => (
            <button
              key={variable}
              onClick={() => insertVariable(variable)}
              className="
              flex
              items-center
              gap-2
              px-3
              py-2
              rounded-xl
              bg-stone-950
              border
              border-stone-700
              text-sm
              text-stone-300
              hover:border-orange-500
              hover:text-orange-400
              transition
              "
            >
              <Copy size={14} />

              {`{{${variable}}}`}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-sm text-stone-500">No variables available</p>
      )}
    </div>
  );
};

export default VariableInsert;
