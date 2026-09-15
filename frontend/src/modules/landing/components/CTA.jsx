import {
  ArrowRight,
  Mail,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="px-6 py-20 sm:py-28">

      <div
        className="
          relative
          mx-auto
          max-w-6xl
          overflow-hidden
          rounded-[2rem]
          border
          border-orange-500/20
          bg-gradient-to-br
          from-orange-600
          via-orange-500
          to-amber-400
          px-6
          py-14
          text-center
          shadow-2xl
          shadow-orange-500/10
          sm:px-12
          sm:py-20
        "
      >

        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-white/20
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-64
            w-64
            rounded-full
            bg-black/10
            blur-3xl
          "
        />


        <div className="relative">

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-black/15
            "
          >
            <Mail
              size={27}
              className="text-white"
            />
          </div>


          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1.5 text-xs font-medium text-white">
            <Sparkles size={13} />
            Start building today
          </div>


          <h2
            className="
              mt-5
              text-3xl
              font-black
              tracking-tight
              text-white
              sm:text-5xl
            "
          >
            Ready to send smarter emails?
          </h2>


          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-white/80
              sm:text-base
            "
          >
            Create your MyMail account, configure your project
            and send your first email through the API.
          </p>


          <Link
            to="/register"
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-black
              px-7
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-xl
              transition
              duration-300
              hover:-translate-y-1
              hover:bg-stone-900
            "
          >

            Create Free Account

            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />

          </Link>

        </div>

      </div>

    </section>
  );
};

export default CTA;