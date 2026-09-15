import { useState } from "react";

import {
  X,
  KeyRound,
  Loader2,
  Copy,
  Check
} from "lucide-react";

import { toast } from "react-hot-toast";


const GenerateKeyModal = ({
  open,
  onClose,
  projects,
  onGenerate,
  loading
}) => {


const [selectedProject,setSelectedProject]=useState("");

const [generatedKey,setGeneratedKey]=useState("");

const [copied,setCopied]=useState(false);




if(!open) return null;






const handleGenerate = async()=>{


if(!selectedProject) return;



try{


const response =
await onGenerate(selectedProject);




if(response?.apiKey){


setGeneratedKey(
response.apiKey
);


}



}
catch(error){

console.log(error);

}



};






const handleCopy=()=>{


navigator.clipboard.writeText(
generatedKey
);


setCopied(true);


toast.success(
"API Key copied"
);


};






const handleClose=()=>{


setSelectedProject("");

setGeneratedKey("");

setCopied(false);


onClose();


};






return (

<div

className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
"

>


<div

className="
w-full
max-w-md
rounded-2xl
border
border-stone-800
bg-stone-950
p-6
"

>





<div

className="
flex
items-center
justify-between
mb-6
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
rounded-xl
bg-orange-500/10
p-3
text-orange-400
"

>

<KeyRound size={22}/>

</div>



<h2

className="
text-lg
font-semibold
text-white
"

>

Generate API Key

</h2>


</div>




<button

onClick={handleClose}

className="
text-stone-400
hover:text-white
"

>

<X size={20}/>

</button>



</div>







{
generatedKey ?


<>


<p

className="
text-sm
text-stone-400
"

>

API Key generated successfully.
Copy it now. You won't be able to see it again.

</p>





<div

className="
mt-5
rounded-xl
border
border-stone-800
bg-stone-900
p-4
break-all
text-sm
text-orange-400
"

>

{generatedKey}

</div>






<button

onClick={handleCopy}

className="
mt-5
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-orange-500
py-3
font-semibold
text-black
"

>

{

copied

?

<Check size={18}/>

:

<Copy size={18}/>

}



{

copied

?

"Copied"

:

"Copy API Key"

}


</button>





<button

onClick={handleClose}

className="
mt-3
w-full
rounded-xl
border
border-stone-700
py-3
text-white
"

>

Close

</button>


</>





:

<>


<p

className="
mb-4
text-sm
text-stone-400
"

>

Select project for API key

</p>





<select

value={selectedProject}

onChange={(e)=>setSelectedProject(e.target.value)}

className="
w-full
rounded-xl
border
border-stone-800
bg-stone-900
px-4
py-3
text-white
"

>


<option value="">

Select Project

</option>



{

projects.map(project=>(


<option

key={project._id}

value={project._id}

>

{project.projectName}

</option>


))

}


</select>







<button

disabled={!selectedProject || loading}

onClick={handleGenerate}

className="
mt-6
flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-orange-500
py-3
font-medium
text-black
disabled:opacity-50
"

>


{

loading

?

<Loader2 className="animate-spin"/>

:

<KeyRound size={18}/>

}



Generate API Key


</button>



</>


}



</div>


</div>

)


};


export default GenerateKeyModal;