import { useDispatch } from "react-redux";

import {
  RefreshCcw,
  Power
} from "lucide-react";

import {
  regenerateApiKey,
  updateApiKeyStatus
} from "@/features/apiKey/apiKeyThunk";

import { toast } from "react-hot-toast";


const ApiKeyCard = ({
  data,
  onClose,
  onRegenerate
}) => {


const dispatch = useDispatch();



const projectId =
data.projectId?._id || data.projectId;





const handleRegenerate = async()=>{


try{


const newKey =
await dispatch(
  regenerateApiKey(projectId)
).unwrap();



toast.success(
"API Key regenerated"
);



// parent ko new key bhejna

if(onRegenerate){

onRegenerate(newKey);

}



}
catch(error){


toast.error(
error || "Regenerate failed"
);


}


};







const handleStatus = async()=>{


try{


const newStatus =
data.status === "active"
?
"inactive"
:
"active";



await dispatch(
updateApiKeyStatus({

projectId,

status:newStatus

})
).unwrap();




toast.success(
`API Key ${newStatus}`
);



}
catch(error){


toast.error(
error || "Status update failed"
);


}


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
bg-black/70
"

>


<div

className="
w-full
max-w-lg
rounded-2xl
border
border-stone-800
bg-stone-900
p-6
"

>



<h2
className="
text-xl
font-bold
text-white
"
>

API Key Details

</h2>






<div
className="
mt-6
space-y-4
"
>



<div>

<p className="text-stone-400">
Project
</p>


<p className="text-white">

{
data.projectId?.projectName ||
"Project"

}

</p>


</div>





<div>

<p className="text-stone-400">
Prefix
</p>


<p className="text-orange-400">

{data.keyPrefix}

</p>


</div>






<div>

<p className="text-stone-400">
Status
</p>


<p className="text-white">

{data.status}

</p>


</div>






<div>

<p className="text-stone-400">
Usage
</p>


<p className="text-white">

{data.usageCount || 0}

</p>


</div>







<div>

<p className="text-stone-400">
Created
</p>


<p className="text-white">

{
new Date(
data.createdAt
)
.toLocaleDateString()

}

</p>


</div>





</div>








<div

className="
mt-6
flex
gap-3
"

>


<button

onClick={handleRegenerate}

className="
flex-1
flex
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


<RefreshCcw size={17}/>


Regenerate


</button>








<button

onClick={handleStatus}

className="
flex-1
flex
items-center
justify-center
gap-2
rounded-xl
border
border-red-500/30
bg-red-500/10
py-3
text-red-400
"

>


<Power size={17}/>


{
data.status==="active"
?
"Deactivate"
:
"Activate"
}



</button>




</div>








<button

onClick={onClose}

className="
mt-4
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






</div>


</div>


)

};


export default ApiKeyCard;