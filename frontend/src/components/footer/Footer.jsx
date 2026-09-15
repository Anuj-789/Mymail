const Footer = () => {
  return (
    <footer
      id="contact"
      className="border-t bg-slate-950 py-20 text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-4">

        <div>

          <h2 className="mb-4 text-3xl font-bold">
            MyMail
          </h2>

          <p className="text-slate-400">
            Modern Email Infrastructure for Developers &
            Businesses.
          </p>

        </div>

        <div>

          <h3 className="mb-4 font-semibold">
            Product
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>Features</li>

            <li>Pricing</li>

            <li>API</li>

          </ul>

        </div>

        <div>

          <h3 className="mb-4 font-semibold">
            Company
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>About</li>

            <li>Contact</li>

            <li>Support</li>

          </ul>

        </div>

        <div>

          <h3 className="mb-4 font-semibold">
            Legal
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>Privacy</li>

            <li>Terms</li>

          </ul>

        </div>

      </div>

      <div className="mt-16 border-t border-slate-800 pt-8 text-center text-slate-500">
        © 2026 MyMail. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;