
const Input = ({
    label,
    error,
    ...props
}) => {


    return (

        <div className="space-y-2">


            {
                label &&

                <label
                className="
                text-sm
                text-gray-300
                "
                >

                    {label}

                </label>

            }



            <input

            {...props}

            className="
            w-full
            bg-[#0c0a09]
            border
            border-[#292524]
            rounded-lg
            px-4
            py-3
            text-white
            outline-none
            transition
            focus:border-orange-500
            "

            />



            {
                error &&

                <p
                className="
                text-red-400
                text-sm
                "
                >

                    {error}

                </p>

            }



        </div>

    );

};


export default Input;