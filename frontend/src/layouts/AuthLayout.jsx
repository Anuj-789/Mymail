import { Outlet } from "react-router-dom";

import { ShieldCheck, Zap } from "lucide-react";

const AuthLayout = () => {
  return (
    <div
      className="
min-h-screen

grid

lg:grid-cols-2

bg-[var(--background)]

"
    >
      {/* LEFT BRAND SECTION */}

      <div
        className="
hidden

lg:flex

flex-col

justify-center

px-16

relative

overflow-hidden

bg-[var(--card)]

border-r

border-[var(--border)]

"
      >
        <div
          className="
absolute

w-96

h-96

bg-orange-500/20

blur-[120px]

rounded-full

top-20

left-10

"
        />

        <div
          className="
relative
"
        >
          <div
            className="
flex
items-center
gap-3
mb-8
"
          >
            <img
              src="/gungif3.gif"
              alt="MyMail Logo"
              className="
w-12
h-12
rounded-xl
object-cover
"
            />

            <h1
              className="
text-3xl
font-bold
text-[var(--text)]
"
            >
              My
              <span
                className="
text-[var(--primary)]
"
              >
                Mail
              </span>
            </h1>
          </div>

          <h2
            className="
text-5xl

font-bold

leading-tight

text-[var(--text)]

"
          >
            Build. Send. Scale.
          </h2>

          <p
            className="
mt-5

text-lg

text-[var(--muted)]

max-w-md

"
          >
            Powerful email infrastructure for modern applications.
          </p>

          <div
            className="
mt-10
space-y-5
"
          >
            <div
              className="
flex
items-center
gap-4
"
            >
              <Zap className="text-[var(--primary)]" />

              <span
                className="
text-[var(--text)]
"
              >
                Fast Email Delivery
              </span>
            </div>

            <div
              className="
flex
items-center
gap-4
"
            >
              <ShieldCheck className="text-[var(--primary)]" />

              <span
                className="
text-[var(--text)]
"
              >
                Secure API Infrastructure
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}

      <div
        className="
flex

items-center

justify-center

p-6

"
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
