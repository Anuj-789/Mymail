import {
  useEffect,
  useState
} from "react";


import {
  useParams,
  Link
} from "react-router-dom";


import toast from "react-hot-toast";


import {
  verifyEmail
} from "@/services/auth.api";




const VerifyEmail =()=>{


  const {
    token
  } = useParams();



  const [status,setStatus] = useState(
    "loading"
  );






  useEffect(()=>{


    const verify = async()=>{


      try{


        await verifyEmail(token);



        setStatus("success");


        toast.success(
          "Email verified successfully"
        );



      }

      catch(error){


        setStatus("error");


        toast.error(
          "Verification failed"
        );


      }


    };



    verify();



  },[token]);







  return (


    <div

      className="
      w-full
      max-w-md
      text-center
      "

    >



      <div

        className="
        rounded-3xl
        bg-[var(--card)]
        border
        border-[var(--border)]
        p-8
        "

      >



        <h1

          className="
          text-3xl
          font-bold
          text-[var(--text)]
          "

        >


          {

            status==="loading"

            &&

            "Verifying Email..."


          }



          {

            status==="success"

            &&

            "Email Verified 🎉"


          }



          {

            status==="error"

            &&

            "Invalid Link ❌"


          }



        </h1>






        <p

          className="
          mt-4
          text-[var(--muted)]
          "

        >


          {

            status==="success"

            ?

            "Your account is ready. Login now."

            :

            status==="error"

            ?

            "Verification link expired or invalid."

            :

            "Please wait..."

          }



        </p>







        <Link

          to="/login"

          className="
          inline-block
          mt-8
          text-orange-400
          hover:text-orange-500
          "

        >

          Go to Login →

        </Link>




      </div>



    </div>


  );


};



export default VerifyEmail;