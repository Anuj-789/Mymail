import {
  useState
} from "react";


import {
  useParams,
  useNavigate,
  Link
} from "react-router-dom";


import toast from "react-hot-toast";


import {
  resetPassword
} from "@/services/auth.api";


import PasswordInput from "../components/PasswordInput";




const ResetPassword =()=>{


  const {
    token
  } = useParams();



  const navigate = useNavigate();



  const [form,setForm] = useState({

    password:"",
    confirmPassword:""

  });



  const [loading,setLoading] = useState(false);






  const handleChange=(e)=>{


    setForm({

      ...form,

      [e.target.name]:e.target.value

    });


  };







  const submit=async(e)=>{


    e.preventDefault();




    if(form.password !== form.confirmPassword){


      toast.error(
        "Passwords do not match"
      );


      return;


    }





    try{


      setLoading(true);



      await resetPassword(

        token,

        form.password

      );



      toast.success(

        "Password updated successfully"

      );



      navigate("/login");



    }

    catch(error){


      toast.error(

        error.response?.data?.message ||

        "Reset failed"

      );


    }

    finally{


      setLoading(false);


    }



  };







  return (


    <div

      className="
      w-full
      max-w-md
      "

    >



      <h1

        className="
        text-3xl
        font-bold
        text-[var(--text)]
        "

      >

        Create New Password

      </h1>




      <p

        className="
        mt-2
        text-[var(--muted)]
        "

      >

        Enter your new password.

      </p>






      <form

        onSubmit={submit}

        className="
        mt-8
        space-y-5
        "

      >



        <PasswordInput

          name="password"

          label="New Password"

          value={form.password}

          onChange={handleChange}

          autoComplete="new-password"

        />





        <PasswordInput

          name="confirmPassword"

          label="Confirm Password"

          value={form.confirmPassword}

          onChange={handleChange}

          autoComplete="new-password"

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

            "Updating..."

            :

            "Update Password"

          }



        </button>






        <div className="text-center">


          <Link

            to="/login"

            className="
            text-orange-400
            hover:text-orange-500
            "

          >

            ← Back to Login

          </Link>


        </div>



      </form>



    </div>


  );


};



export default ResetPassword;