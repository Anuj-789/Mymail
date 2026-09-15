import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { toast } from "react-hot-toast";

import TemplateForm from "../components/TemplateForm";

import TemplateEditor from "../components/TemplateEditor";

import VariableInsert from "../components/VariableInsert";

import LiveTemplatePreview from "../components/LiveTemplatePreview";

import api from "@/services/api";

const EditTemplate = () => {
  const navigate = useNavigate();

  const { projectId, id } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    templateName: "",
    subject: "",
    templateType: "custom",
  });

  const [htmlContent, setHtmlContent] = useState("");

  const [cssContent, setCssContent] = useState("");

  const [variables, setVariables] = useState([]);


  /*
      Fetch Template
  */

  const fetchTemplate = async () => {
    try {
      const res = await api.get(
        `/templates/projects/${projectId}/templates/${id}`,
      );

      const template = res.data.template;

      setFormData({
        templateName: template.templateName || "",
        subject: template.subject || "",
        templateType: template.templateType || "custom",
      });

      setHtmlContent(template.htmlContent || "");

      setCssContent(template.cssContent || "");

      setVariables(template.variables || []);

    } catch (error) {

      console.log(error);

      toast.error("Failed to load template");

    }
  };


  useEffect(() => {
    fetchTemplate();
  }, []);



  /*
      Auto Detect Variables
  */

  const extractVariables = (html) => {

    const matches = html.match(/{{(.*?)}}/g);

    if (!matches) {

      return [];

    }


    return [
      ...new Set(
        matches.map((item) =>
          item.replace("{{", "")
          .replace("}}", "")
          .trim()
        ),
      ),
    ];

  };


  const handleHtmlChange = (value) => {

    setHtmlContent(value);

    const detected = extractVariables(value);

    setVariables(detected);

  };



  /*
      Update Template
  */

  const handleUpdate = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      await api.put(

        `/templates/projects/${projectId}/templates/${id}`,

        {
          ...formData,

          htmlContent,

          cssContent,
        },

      );


      toast.success(
        "Template updated successfully",
        {
          duration:3000,
        }
      );


      fetchTemplate();


    } catch (error) {


      console.log(error);


      toast.error(
        "Template update failed"
      );


    } finally {


      setLoading(false);


    }

  };



  return (

    <div className="space-y-6">


      {/* HEADER */}

      <div className="flex items-center gap-3">

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

            Edit Template

          </h1>


          <p
            className="
            text-stone-400
            "
          >

            Customize your email template

          </p>


        </div>


      </div>




      {/* MAIN AREA */}


      <div

        className="
        grid
        grid-cols-1
        xl:grid-cols-12
        gap-6
        items-start
        "

      >


        {/* LEFT */}

        <div

          className="
          xl:col-span-3
          space-y-6
          "

        >


          <TemplateForm

            formData={formData}

            setFormData={setFormData}

            onSubmit={handleUpdate}

            loading={loading}

            buttonText="Update Template"

          />



          <VariableInsert

            variables={variables}

            htmlContent={htmlContent}

            setHtmlContent={handleHtmlChange}

          />


        </div>





        {/* EDITOR */}


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






        {/* PREVIEW */}


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


export default EditTemplate;