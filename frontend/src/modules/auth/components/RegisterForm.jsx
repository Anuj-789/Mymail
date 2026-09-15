import {
  useState
} from "react";


import {
  useDispatch,
  useSelector
} from "react-redux";


import {
  useNavigate
} from "react-router-dom";


import toast from "react-hot-toast";


import {
  registerUser
} from "@/features/auth/authThunk";


import PasswordInput from "./PasswordInput";




const RegisterForm = () => {



const dispatch = useDispatch();

const navigate = useNavigate();



const {
loading
}
=
useSelector(
(state)=>state.auth
);






const [form,setForm] = useState({

name:"",

email:"",

phone:"",

password:"",

confirmPassword:""

});







const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};









const submit=async(e)=>{


e.preventDefault();




if(
!form.name ||
!form.email ||
!form.password ||
!form.confirmPassword
){

toast.error(
"Please fill all required fields"
);

return;

}




if(form.password !== form.confirmPassword){


toast.error(
"Passwords do not match"
);

return;

}




try{



const result = await dispatch(

registerUser({

name:form.name,

email:form.email,

phone:form.phone,

password:form.password

})

);





if(registerUser.fulfilled.match(result)){



toast.success(

"Account created. Verify your email."

);



navigate("/login");



}

else{


toast.error(

result.payload ||

"Registration failed"

);


}




}

catch(error){


toast.error(
"Something went wrong"
);


}



};








return(


<form

onSubmit={submit}

className="
space-y-5
"

>






<input


name="name"


required


value={form.name}


onChange={handleChange}


placeholder="Full Name"


className="
auth-input
"

/>








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








<input


type="text"


name="phone"


value={form.phone}


onChange={handleChange}


placeholder="Phone Number (optional)"


className="
auth-input
"

/>








<PasswordInput


name="password"


value={form.password}


onChange={handleChange}


placeholder="Create Password"


/>








<PasswordInput


name="confirmPassword"


value={form.confirmPassword}


onChange={handleChange}


placeholder="Confirm Password"


/>








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

"Creating Account..."

:

"Create Account"

}



</button>








</form>


)


}



export default RegisterForm;