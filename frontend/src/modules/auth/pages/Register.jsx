import RegisterForm from "../components/RegisterForm";

import {Link} from "react-router-dom";


const Register=()=>{


return(

<div
className="
w-full

max-w-md
"
>

<Link
to="/"
className="
inline-block
mb-6
text-[var(--muted)]
hover:text-orange-400
"
>
← Back
</Link>


<h1 className="
text-3xl
font-bold
text-[var(--text)]
">

Create Account 🚀

</h1>


<p className="
mt-2
text-[var(--muted)]
">

Start building with MyMail

</p>


<div className="mt-8">

<RegisterForm/>

</div>



<p className="
mt-6
text-center
text-[var(--muted)]
">

Already have account?


<Link

to="/login"

className="
ml-2
text-orange-400
"

>

Login

</Link>


</p>


</div>


)

}


export default Register;