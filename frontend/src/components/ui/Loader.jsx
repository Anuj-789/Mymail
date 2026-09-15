const Loader = ({ pageName = "Page" }) => {
  return (
    <div
      className="
        flex
        min-h-[400px]
        w-full
        items-center
        justify-center
        px-4
        py-10
        sm:min-h-[500px]
        sm:px-6
        lg:px-8
      "
    >
      <div
        className="
          flex
          w-full
          max-w-xs
          flex-col
          items-center
          justify-center
          text-center
        "
      >
        {/* =========================
            LOADING GIF
        ========================= */}

        <div
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            sm:h-28
            sm:w-28
            md:h-32
            md:w-32
          "
        >
          <img
            src="/gungif3.gif"
            alt="Loading"
            className="
              h-full
              w-full
              object-contain
            "
          />
        </div>

        {/* =========================
            PAGE NAME
        ========================= */}

        <div className="mt-4 sm:mt-5">
          <p
            className="
              text-sm
              font-semibold
              text-white
              sm:text-base
            "
          >
            Loading {pageName}
            <span className="loading-dots">
              ...
            </span>
          </p>

          <p
            className="
              mt-1.5
              text-xs
              text-stone-500
              sm:text-sm
            "
          >
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;