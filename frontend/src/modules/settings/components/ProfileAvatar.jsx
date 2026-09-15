const ProfileAvatar = ({ user }) => {


  const getInitial = () => {

    return user?.name?.charAt(0)?.toUpperCase() || "U";

  };




  return (

    <div
      className="
      flex
      flex-col
      lg:flex-row
      lg:items-center
      lg:justify-between
      gap-8
      "
    >





      {/* Left Profile Section */}


      <div
        className="
        flex
        flex-col
        sm:flex-row
        items-center
        sm:items-start
        gap-6
        "
      >



        {/* Avatar */}


        <div
          className="
          w-28
          h-28
          rounded-full
          overflow-hidden
          bg-gradient-to-br
          from-orange-600
          to-yellow-400
          flex
          items-center
          justify-center
          text-white
          text-4xl
          font-bold
          shadow-lg
          shadow-orange-500/20
          "
        >


          {
            user?.profileImage

            ?

            <img
              src={user.profileImage}
              alt="profile"
              className="
              w-full
              h-full
              object-cover
              "
            />

            :

            getInitial()

          }


        </div>








        {/* User Info */}


        <div
          className="
          text-center
          sm:text-left
          "
        >


          <h2
            className="
            text-2xl
            font-bold
            text-white
            "
          >

            {user?.name}

          </h2>



          <p
            className="
            text-gray-400
            mt-1
            "
          >

            {user?.email}

          </p>





          <div
            className="
            flex
            gap-3
            mt-4
            justify-center
            sm:justify-start
            "
          >



            <span
              className="
              px-4
              py-1
              rounded-full
              text-xs
              bg-green-500/10
              text-green-400
              border
              border-green-500/20
              "
            >

              Active Account

            </span>





            <span
              className="
              px-4
              py-1
              rounded-full
              text-xs
              bg-orange-500/10
              text-orange-400
              border
              border-orange-500/20
              "
            >

              MyMail User

            </span>




          </div>




        </div>



      </div>









      {/* Desktop Only GIF */}


      <div
        className="
        hidden
        lg:flex
        items-center
        justify-center
        "
      >


        <img

          src="/progilelogogif2.gif"

          alt="profile animation"

          className="
          w-30
          xl:w-52
          h-auto
          object-contain
          opacity-90
          rounded-[80%]
          "

        />


      </div>







    </div>

  );


};



export default ProfileAvatar;