import { Save } from "lucide-react";

const TemplateForm = ({
  formData,
  setFormData,
  onSubmit,
  loading,
  buttonText = "Save",
}) => {
  const handleChange = (key, value) => {
    setFormData({
      ...formData,

      [key]: value,
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="
      bg-stone-900
      border
      border-stone-800
      rounded-2xl
      p-5
      space-y-5
      "
    >
      <div>
        <label
          className="
          text-sm
          text-stone-400
          block
          mb-2
          "
        >
          Template Name
        </label>

        <input
          value={formData.templateName}
          onChange={(e) => handleChange("templateName", e.target.value)}
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
          "
          placeholder="Welcome Email"
        />
      </div>

      <div>
        <label
          className="
          text-sm
          text-stone-400
          block
          mb-2
          "
        >
          Subject
        </label>

        <input
          value={formData.subject}
          onChange={(e) => handleChange("subject", e.target.value)}
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
          "
          placeholder="Welcome to {{appName}}"
        />
      </div>

      <div>
        <label
          className="
          text-sm
          text-stone-400
          block
          mb-2
          "
        >
          Template Type
        </label>

        <select
          value={formData.templateType}
          onChange={(e) => handleChange("templateType", e.target.value)}
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
          "
        >
          <option value="custom">Custom</option>

          <option value="welcome">Welcome</option>

          <option value="marketing">Marketing</option>

          <option value="notification">Notification</option>
        </select>
      </div>

      <button
        disabled={loading}
        className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        bg-orange-500
        text-black
        py-3
        rounded-xl
        font-semibold
        hover:bg-orange-400
        disabled:opacity-50
        "
      >
        <Save size={17} />

        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  );
};

export default TemplateForm;
