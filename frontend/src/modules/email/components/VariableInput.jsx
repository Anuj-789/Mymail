import React from "react";

const VariableInput = ({ variables = [], values = {}, onChange }) => {
  if (!variables.length) {
    return (
      <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4">
        <p className="text-sm text-stone-400">
          This template does not contain any variables.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-stone-100">
          Template Variables
        </h3>

        <p className="mt-1 text-xs text-stone-500">
          Enter values for the variables used in your selected template.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {variables.map((variable) => (
          <div key={variable}>
            <label
              htmlFor={`variable-${variable}`}
              className="mb-2 block text-sm font-medium text-stone-300"
            >
              {variable}
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-orange-400">
                {"{{"}
              </span>

              <input
                id={`variable-${variable}`}
                type="text"
                value={values[variable] || ""}
                onChange={(e) => onChange(variable, e.target.value)}
                placeholder={`Enter ${variable}`}
                className="w-full rounded-xl border border-stone-700 bg-stone-950 px-10 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-orange-400">
                {"}}"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariableInput;