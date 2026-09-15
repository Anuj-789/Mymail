import { useState } from "react";

import {
  ChevronDown,
} from "lucide-react";

const FAQ = () => {

  const [open, setOpen] = useState(0);

  const faqs = [
    {
      q: "How fast are emails delivered?",
      a: "MyMail is designed for fast API processing and reliable transactional email delivery. Actual delivery time can depend on the receiving mail provider and email infrastructure.",
    },
    {
      q: "Can I use my own SMTP?",
      a: "Yes. MyMail can be extended to support custom SMTP configurations depending on your project and infrastructure requirements.",
    },
    {
      q: "Are API keys secure?",
      a: "Yes. API keys should be treated as sensitive credentials. MyMail uses protected API-key handling and project-based access so your applications can authenticate securely.",
    },
    {
      q: "Can I use dynamic email templates?",
      a: "Yes. You can create reusable templates and pass dynamic variables when sending emails through the API.",
    },
    {
      q: "Can I track sent emails?",
      a: "Yes. Email logs allow you to monitor email status such as sent, pending and failed requests.",
    },
  ];


  return (
    <section
      id="faq"
      className="py-24 sm:py-8"
    >

      <div className="mx-auto max-w-4xl px-6">

        <div className="text-center">

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            FAQ
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            Frequently asked
            <span className="text-orange-400">
              {" "}questions.
            </span>
          </h2>

        </div>


        <div className="mt-12 space-y-3">

          {faqs.map((faq, index) => {

            const isOpen = open === index;

            return (
              <div
                key={faq.q}
                className={`
                  overflow-hidden
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  ${
                    isOpen
                      ? "border-orange-500/30 bg-orange-500/[0.03]"
                      : "border-white/10 bg-white/[0.02]"
                  }
                `}
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpen(isOpen ? -1 : index)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-4
                    px-5
                    py-5
                    text-left
                  "
                >

                  <span className="text-sm font-semibold text-white sm:text-base">
                    {faq.q}
                  </span>

                  <ChevronDown
                    size={19}
                    className={`
                      shrink-0
                      text-orange-400
                      transition-transform
                      duration-300
                      ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>


                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >

                  <div className="overflow-hidden">

                    <p className="border-t border-white/5 px-5 pb-5 pt-4 text-sm leading-7 text-stone-400">
                      {faq.a}
                    </p>

                  </div>

                </div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
};

export default FAQ;