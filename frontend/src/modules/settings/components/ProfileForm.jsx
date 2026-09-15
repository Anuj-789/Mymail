import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";


import {
    updateProfile
} from "@/features/profile/profileThunk";


import {
    selectProfileLoading,
    selectProfileMessage,
    selectProfileError
} from "@/features/profile/profileSelectors";





const ProfileForm = ({user})=>{


    const dispatch = useDispatch();



    const loading = useSelector(
        selectProfileLoading
    );


    const message = useSelector(
        selectProfileMessage
    );


    const error = useSelector(
        selectProfileError
    );




    const {

        register,

        handleSubmit,

        reset

    } = useForm();







    useEffect(()=>{


        if(user){

            reset({

                name:user.name || "",

                phone:user.phone || "",

                profileImage:user.profileImage || ""

            });

        }


    },[user,reset]);







    useEffect(()=>{


        if(message){

            toast.success(message);

        }


        if(error){

            toast.error(error);

        }


    },[message,error]);







    const onSubmit=(data)=>{


        dispatch(
            updateProfile(data)
        );


    };








    return (


        <form

        onSubmit={
            handleSubmit(onSubmit)
        }

        className="
        space-y-6
        "

        >






            <div

            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            "

            >








                {/* Name */}


                <div>


                    <label
                    className="
                    text-sm
                    text-gray-300
                    "
                    >

                        Full Name

                    </label>



                    <input

                    {...register("name")}

                    placeholder="Enter your name"

                    className="
                    w-full
                    mt-2
                    bg-[#0c0a09]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-orange-500
                    transition
                    "

                    />


                </div>









                {/* Email */}



                <div>


                    <label
                    className="
                    text-sm
                    text-gray-300
                    "
                    >

                        Email Address

                    </label>



                    <input

                    value={
                        user?.email || ""
                    }

                    disabled


                    className="
                    w-full
                    mt-2
                    bg-[#090807]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-gray-500
                    cursor-not-allowed
                    "

                    />


                </div>









                {/* Phone */}



                <div>


                    <label
                    className="
                    text-sm
                    text-gray-300
                    "
                    >

                        Phone Number

                    </label>




                    <input


                    {...register("phone")}


                    placeholder="Enter phone number"


                    className="
                    w-full
                    mt-2
                    bg-[#0c0a09]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-orange-500
                    transition
                    "


                    />


                </div>









                {/* Image */}



                <div>


                    <label
                    className="
                    text-sm
                    text-gray-300
                    "
                    >

                        Profile Image URL

                    </label>



                    <input


                    {...register("profileImage")}


                    placeholder="https://image-url.com"


                    className="
                    w-full
                    mt-2
                    bg-[#0c0a09]
                    border
                    border-[#292524]
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-orange-500
                    transition
                    "


                    />


                </div>







            </div>









            <div

            className="
            flex
            justify-end
            "

            >


                <button


                disabled={loading}


                type="submit"


                className="
                w-full
                sm:w-auto
                px-8
                py-3
                rounded-xl
                font-medium
                text-white
                bg-gradient-to-r
                from-orange-600
                to-orange-400
                hover:from-orange-500
                hover:to-orange-300
                transition
                disabled:opacity-50
                "

                >


                    {

                    loading

                    ?

                    "Saving..."

                    :

                    "Save Changes"

                    }


                </button>



            </div>





        </form>


    );

};



export default ProfileForm;