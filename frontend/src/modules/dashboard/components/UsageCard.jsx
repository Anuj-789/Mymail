const UsageCard = ({
  used = 0,
  limit = 0,
}) => {

  const percentage =
    limit > 0
      ? Math.min(
          (used / limit) * 100,
          100
        )
      : 0;


  return (

    <div

      className="
        rounded-2xl

        border
        border-[var(--border)]

        bg-[var(--card)]

        p-6
      "

    >

      <h2

        className="
          text-xl
          font-bold
          text-[var(--text)]
        "

      >

        Monthly Usage

      </h2>


      <p

        className="
          mt-1

          text-sm

          text-[var(--muted)]
        "

      >

        Email sending usage

      </p>


      {/* PROGRESS */}

      <div

        className="
          mt-6

          h-3

          overflow-hidden

          rounded-full

          bg-black/30
        "

      >

        <div

          className="
            h-full

            rounded-full

            bg-gradient-to-r
            from-orange-600
            to-yellow-400

            transition-all
            duration-500
          "

          style={{
            width: `${percentage}%`
          }}

        />

      </div>


      {/* VALUES */}

      <div

        className="
          mt-3

          flex
          items-center
          justify-between

          text-sm
        "

      >

        <span
          className="text-[var(--muted)]"
        >

          {used} sent

        </span>


        <span
          className="text-orange-400"
        >

          {limit} limit

        </span>

      </div>

    </div>

  );

};


export default UsageCard;