import {
  Quote,
  Star,
  Sparkles,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

const Testimonials = () => {

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const testimonials = [
    {
      quote:
        "MyMail gives our application a clean way to handle transactional emails without building the entire infrastructure ourselves.",
      name: "Rahul Sharma",
      role: "Startup Founder",
    },
    {
      quote:
        "The project, API key and template workflow makes integration straightforward for our development team.",
      name: "Arjun Mehta",
      role: "Software Engineer",
    },
    {
      quote:
        "Having email logs and reusable templates in the same platform makes debugging and managing email workflows much easier.",
      name: "Priya Verma",
      role: "Product Developer",
    },
  ];


  /* SCROLL REVEAL */

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };

  }, []);


  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        border-y
        border-white/5
        py-14
        sm:py-16
        lg:py-20
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[300px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/[0.04]
          blur-[110px]
        "
      />


      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">

        {/* HEADER */}

        <div
          className={`
            mx-auto
            max-w-2xl
            text-center
            transition-all
            duration-700
            ease-out
            ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }
          `}
        >

          <div
            className="
              mb-3
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-orange-500/20
              bg-orange-500/5
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.2em]
              text-orange-400
              sm:text-xs
            "
          >

            <Sparkles size={13} />

            Developer Stories

          </div>


          <h2
            className="
              text-3xl
              font-black
              tracking-tight
              text-white
              sm:text-4xl
            "
          >

            Built for developers.

            <span className="text-orange-400">
              {" "}Loved for simplicity.
            </span>

          </h2>


          <p
            className="
              mx-auto
              mt-3
              max-w-xl
              text-xs
              leading-6
              text-stone-500
              sm:text-sm
            "
          >
            See why developers choose MyMail for simple,
            reliable email infrastructure.
          </p>

        </div>


        {/* TESTIMONIAL CARDS */}

        <div
          className="
            mt-9
            grid
            gap-4
            md:grid-cols-3
          "
        >

          {testimonials.map((item, index) => (

            <div
              key={item.name}
              style={{
                transitionDelay: visible
                  ? `${index * 150}ms`
                  : "0ms",
              }}
              className={`
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-white/[0.025]
                p-5
                backdrop-blur-sm
                transition-all
                duration-700
                ease-out

                ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }

                hover:-translate-y-1.5
                hover:border-orange-500/30
                hover:bg-white/[0.045]
                hover:shadow-xl
                hover:shadow-orange-500/5
              `}
            >

              {/* CARD GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-12
                  -top-12
                  h-28
                  w-28
                  rounded-full
                  bg-orange-500/10
                  opacity-0
                  blur-3xl
                  transition
                  duration-500
                  group-hover:opacity-100
                "
              />


              {/* TOP */}

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                "
              >

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-orange-500/20
                    bg-orange-500/10
                  "
                >

                  <Quote
                    size={17}
                    className="text-orange-400"
                  />

                </div>


                <div className="flex gap-0.5">

                  {[1, 2, 3, 4, 5].map((star) => (

                    <Star
                      key={star}
                      size={12}
                      className="
                        fill-orange-400
                        text-orange-400
                      "
                    />

                  ))}

                </div>

              </div>


              {/* QUOTE */}

              <p
                className="
                  relative
                  mt-5
                  text-[13px]
                  leading-6
                  text-stone-400
                "
              >
                "{item.quote}"
              </p>


              {/* USER */}

              <div
                className="
                  relative
                  mt-5
                  flex
                  items-center
                  gap-3
                  border-t
                  border-white/10
                  pt-4
                "
              >

                {/* AVATAR */}

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    from-orange-500
                    to-yellow-400
                    text-xs
                    font-black
                    text-black
                    shadow-lg
                    shadow-orange-500/10
                  "
                >
                  {item.name.charAt(0)}
                </div>


                <div className="min-w-0">

                  <p
                    className="
                      truncate
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    {item.name}
                  </p>

                  <p
                    className="
                      mt-0.5
                      truncate
                      text-[10px]
                      text-stone-500
                    "
                  >
                    {item.role}
                  </p>

                </div>

              </div>


              {/* BOTTOM ACCENT */}

              <div
                className="
                  absolute
                  bottom-0
                  left-5
                  h-[2px]
                  w-0
                  bg-gradient-to-r
                  from-orange-500
                  to-yellow-400
                  transition-all
                  duration-500
                  group-hover:w-16
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;
