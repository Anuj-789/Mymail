import PasswordForm from "../components/PasswordForm";



const ChangePassword =()=>{


return (

<div
className="
max-w-4xl
"
>


<div
className="
mb-8
"
>


<h1

className="
text-3xl
font-bold
text-[var(--text)]
"

>

Change Password

</h1>



<p

className="
mt-2
text-[var(--muted)]
"

>

Update your account password securely.

</p>



</div>





<div

className="
bg-[var(--card)]

border

border-[var(--border)]

rounded-3xl

p-8

shadow-xl

"

>


<PasswordForm/>


</div>




</div>

)


}



export default ChangePassword;