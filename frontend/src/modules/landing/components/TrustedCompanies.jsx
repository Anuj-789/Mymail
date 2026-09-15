const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Stripe",
  "Vercel",
  "GitHub",
];

const TrustedCompanies = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-10 text-center text-sm font-semibold uppercase tracking-[5px] text-slate-400">
          Trusted By Developers Worldwide
        </p>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="rounded-xl border border-slate-200 bg-slate-50 py-6 text-center font-bold text-slate-500 transition hover:border-indigo-500 hover:bg-white hover:text-indigo-600"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
