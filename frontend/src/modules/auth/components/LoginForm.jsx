import {
  useState
} from "react";


import {
  useDispatch,
  useSelector
} from "react-redux";


import {
  useNavigate,
  Link
} from "react-router-dom";


import toast from "react-hot-toast";


import {
  loginUser
} from "@/features/auth/authThunk";


import PasswordInput from "./PasswordInput";



const LoginForm = () => {


const dispatch = useDispatch();

const navigate = useNavigate();



const {
  loading
} = useSelector(
(state)=>state.auth
);



const [form,setForm] = useState({

email:"",

password:""

});





const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const submit=async(e)=>{


e.preventDefault();




if(!form.email || !form.password){

toast.error(
"Please fill all fields"
);

return;

}




try{


const result = await dispatch(
loginUser(form)
);




if(loginUser.fulfilled.match(result)){


toast.success(
"Login successful 🎉"
);


navigate("/dashboard");


}

else{


toast.error(

result.payload ||

"Login failed"

);


}



}

catch(error){


toast.error(
"Something went wrong"
);


}



};






return (

<form

onSubmit={submit}

className="
space-y-5
"

>





<input

type="email"

name="email"

required

value={form.email}

onChange={handleChange}

placeholder="Email Address"

className="
auth-input
"

/>







<PasswordInput

name="password"

value={form.password}

onChange={handleChange}

placeholder="Password"

/>







<div

className="
flex
justify-end
"

>


<Link

to="/forgot-password"

className="
text-sm
text-orange-400
hover:text-orange-500
transition
"

>

Forgot Password?

</Link>


</div>







<button

disabled={loading}

className="
w-full

py-3

rounded-xl

bg-[var(--primary)]

text-white

font-semibold

hover:bg-orange-600

transition

disabled:opacity-50

"

>


{

loading

?

"Logging in..."

:

"Login"

}



</button>







</form>


)

}



export default LoginForm;