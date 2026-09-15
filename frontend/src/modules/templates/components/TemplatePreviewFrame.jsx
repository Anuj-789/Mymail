import { Monitor, X } from "lucide-react";

const TemplatePreviewFrame = ({ preview, closePreview }) => {
  return (
    <div
      className="
fixed
inset-0
z-[100]
bg-black/70
backdrop-blur-sm
flex
items-center
justify-center
p-4
"
    >
      <div
        className="
w-full
max-w-5xl
h-[90vh]
bg-stone-900
border
border-stone-800
rounded-2xl
overflow-hidden
flex
flex-col
"
      >
        <div
          className="
flex
items-center
justify-between
px-5
py-4
border-b
border-stone-800
"
        >
          <div
            className="
flex
items-center
gap-3
"
          >
            <div
              className="
h-9
w-9
rounded-lg
bg-orange-500/10
text-orange-400
flex
items-center
justify-center
"
            >
              <Monitor size={18} />
            </div>

            <div>
              <h3
                className="
text-white
font-semibold
"
              >
                Template Preview
              </h3>

              <p
                className="
text-xs
text-stone-500
"
              >
                Email rendering preview
              </p>
            </div>
          </div>

          <button
            onClick={() => closePreview && closePreview()}
            className="
h-9
w-9
rounded-lg
bg-stone-800
text-stone-300
hover:text-white
flex
items-center
justify-center
"
          >
            <X size={18} />
          </button>
        </div>

        <div
          className="
flex-1
bg-white
p-3
overflow-auto
"
        >
          <iframe
            title="template-preview"
            srcDoc={preview}
            className="
w-full
h-full
min-h-[600px]
border-0
rounded-xl
"
          />
        </div>
      </div>
    </div>
  );
};

export default TemplatePreviewFrame;
