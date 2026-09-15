import { useState } from "react";

import {
  Save,
  Loader2,
} from "lucide-react";


const ProjectForm = ({
  defaultValues = {
    projectName: "",
    description: "",
  },

  onSubmit,

  loading = false,

}) => {

  const [formData, setFormData] = useState({
    projectName:
      defaultValues.projectName || "",

    description:
      defaultValues.description || "",
  });


  const [errors, setErrors] = useState({});


  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData({
      ...formData,
      [name]: value,
    });


    setErrors({
      ...errors,
      [name]: "",
    });

  };


  const validate = () => {

    const newErrors = {};


    if (!formData.projectName.trim()) {

      newErrors.projectName =
        "Project name is required";

    }


    if (formData.projectName.length > 50) {

      newErrors.projectName =
        "Project name too long";

    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);

  };


  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* PROJECT NAME */}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-stone-300
          "
        >
          Project Name
        </label>


        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          placeholder="Enter project name"
          disabled={loading}
          className="
            w-full
            rounded-xl
            border
            border-stone-700
            bg-stone-950
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            focus:border-orange-500
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />


        {errors.projectName && (

          <p
            className="
              mt-2
              text-sm
              text-red-400
            "
          >
            {errors.projectName}
          </p>

        )}

      </div>


      {/* DESCRIPTION */}

      <div>

        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-stone-300
          "
        >
          Description
        </label>


        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          disabled={loading}
          placeholder="Describe your project"
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-stone-700
            bg-stone-950
            px-4
            py-3
            text-sm
            text-white
            outline-none
            transition
            focus:border-orange-500
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

      </div>


      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-xl
          bg-orange-500
          px-5
          py-3
          text-sm
          font-semibold
          text-black
          transition
          duration-200
          hover:bg-orange-400
          active:scale-[0.99]
          disabled:cursor-not-allowed
          disabled:opacity-70
        "
      >

        {loading ? (

          <>
            {/* GIF */}

            <div
              className="
                relative
                flex
                h-8
                w-8
                items-center
                justify-center
              "
            >

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border-2
                  border-black/20
                  border-t-black
                  animate-spin
                "
              />

              <img
                src="/gugif3.gif"
                alt="Loading"
                className="
                  h-6
                  w-6
                  rounded-full
                  object-cover
                "
              />

            </div>


            <span>
              Saving...
            </span>

          </>

        ) : (

          <>

            <Save size={18} />

            Save Project

          </>

        )}

      </button>

    </form>

  );

};


export default ProjectForm;