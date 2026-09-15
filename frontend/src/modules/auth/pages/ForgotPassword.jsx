import {
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  forgotPassword
} from "@/services/auth.api";



const ForgotPassword = () => {


  const [email,setEmail] = useState("");

  const [loading,setLoading] = useState(false);





  const submit = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      await forgotPassword(email);



      toast.success(
        "Password reset link sent"
      );



      setEmail("");



    }

    catch(error){


      toast.error(

        error.response?.data?.message ||

        "Something went wrong"

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

        Forgot Password?

      </h1>



      <p

        className="
        mt-2
        text-[var(--muted)]
        "

      >

        Enter your email and we will send a reset link.

      </p>






      <form

        onSubmit={submit}

        className="
        mt-8
        space-y-5
        "

      >



        <div>


          <label

            className="
            block
            mb-2
            text-sm
            text-[var(--text)]
            "

          >

            Email Address

          </label>



          <input


            type="email"

            required

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

            placeholder="Enter your email"


            className="
            auth-input
            "


          />


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

            "Sending..."

            :

            "Send Reset Link"

          }


        </button>







        <div

          className="
          text-center
          "

        >

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



export default ForgotPassword;