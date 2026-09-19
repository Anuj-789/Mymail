import {
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import toast from "react-hot-toast";

import {
  registerUser
} from "@/features/auth/authThunk";

import PasswordInput from "./PasswordInput";


const RegisterForm = () => {

  const dispatch = useDispatch();

  const {
    loading
  } = useSelector(
    (state) => state.auth
  );


  const [form, setForm] = useState({

    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""

  });


  const [registered, setRegistered] = useState(false);


  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };


  const submit = async (e) => {

    e.preventDefault();


    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {

      toast.error(
        "Please fill all required fields"
      );

      return;

    }


    if (
      form.password !==
      form.confirmPassword
    ) {

      toast.error(
        "Passwords do not match"
      );

      return;

    }


    try {

      const result = await dispatch(

        registerUser({

          name: form.name,

          email: form.email,

          phone: form.phone,

          password: form.password

        })

      );


      if (
        registerUser.fulfilled.match(result)
      ) {

        toast.success(
          "Verification link sent to your email"
        );

        setRegistered(true);

      }

      else {

        toast.error(

          result.payload ||

          "Registration failed"

        );

      }


    }

    catch (error) {

      toast.error(
        "Something went wrong"
      );

    }

  };


  // ==============================
  // EMAIL VERIFICATION MESSAGE
  // ==============================

  if (registered) {

    return (

      <div
        className="
        rounded-3xl
        bg-[var(--card)]
        border
        border-[var(--border)]
        p-8
        text-center
        "
      >

        <div
          className="
          w-16
          h-16
          mx-auto
          rounded-full
          bg-orange-500/10
          flex
          items-center
          justify-center
          text-3xl
          "
        >

          ✉️

        </div>


        <h2
          className="
          mt-6
          text-2xl
          font-bold
          text-[var(--text)]
          "
        >

          Check Your Email

        </h2>


        <p
          className="
          mt-3
          text-[var(--muted)]
          leading-relaxed
          "
        >

          We've sent a verification link to

          <br />

          <span
            className="
            text-orange-400
            font-medium
            "
          >

            {form.email}

          </span>

        </p>


        <p
          className="
          mt-3
          text-sm
          text-[var(--muted)]
          "
        >

          Please check your inbox and click
          the verification link to activate
          your account.

        </p>


        <div
          className="
          mt-6
          p-4
          rounded-xl
          bg-[var(--background)]
          border
          border-[var(--border)]
          text-sm
          text-[var(--muted)]
          "
        >

          💡 Don't see the email?

          <br />

          Check your spam or junk folder.

        </div>

      </div>

    );

  }


  return (

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

  );

};


export default RegisterForm;