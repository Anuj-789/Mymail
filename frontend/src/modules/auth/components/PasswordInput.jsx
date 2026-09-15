import { useState } from "react";

import {
  Eye,
  EyeOff
} from "lucide-react";


const PasswordInput = ({
  id = "password",
  name = "password",
  value,
  onChange,
  placeholder = "Password",
  label,
  error,
  register,
  disabled = false,
  autoComplete = "current-password"
}) => {


  const [show, setShow] = useState(false);



  return (

    <div className="space-y-2">


      {
        label &&

        <label

          htmlFor={id}

          className="
          block
          text-sm
          font-medium
          text-[var(--text)]
          "

        >

          {label}

        </label>
      }



      <div className="relative">


        <input


          id={id}

          name={name}

          type={show ? "text" : "password"}

          value={value}

          onChange={onChange}

          placeholder={placeholder}

          autoComplete={autoComplete}

          disabled={disabled}

          aria-invalid={!!error}


          {...register}


          className={`

          w-full

          px-4

          py-3

          pr-12

          rounded-xl

          bg-[var(--card)]

          border

          text-[var(--text)]

          placeholder:text-[var(--muted)]

          outline-none

          transition


          ${
            error

            ?

            "border-red-500 focus:border-red-500"

            :

            "border-[var(--border)] focus:border-orange-500"

          }


          ${
            disabled

            ?

            "opacity-50 cursor-not-allowed"

            :

            ""

          }


          `}


        />





        <button


          type="button"


          onClick={() => setShow(!show)}


          disabled={disabled}


          className="

          absolute

          right-4

          top-1/2

          -translate-y-1/2

          text-[var(--muted)]

          hover:text-orange-500

          transition

          "


        >


          {

            show

            ?

            <EyeOff size={20}/>

            :

            <Eye size={20}/>

          }


        </button>



      </div>





      {
        error &&

        <p

          className="
          text-sm
          text-red-500
          "

        >

          {error.message}

        </p>

      }



    </div>


  );

};


export default PasswordInput;