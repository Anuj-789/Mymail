import LoginForm from "../components/LoginForm";

import { Link } from "react-router-dom";


const Login = () => {


  return (

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


      <h1
        className="
        text-3xl

        font-bold

        text-[var(--text)]

        "
      >

        Welcome Back 👋

      </h1>


      <p
        className="
        mt-2

        text-[var(--muted)]

        "
      >

        Login to your MyMail account

      </p>


      <div className="
        mt-8
        "
      >

        <LoginForm />

      </div>


      <p
        className="
        mt-6

        text-center

        text-[var(--muted)]

        "
      >

        Don't have an account?


        <Link
          to="/register"
          className="
          ml-2

          text-orange-400

          "
        >

          Create Account

        </Link>


      </p>


    </div>

  )


}


export default Login;
