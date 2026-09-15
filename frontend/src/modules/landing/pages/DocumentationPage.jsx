import LandingNavbar from "../components/LandingNavbar";
import Documentation from "../components/Documentation";

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-stone-950 text-white">

      <LandingNavbar />

      <main className="pt-24">
        <Documentation />
      </main>

    </div>
  );
};

export default DocumentationPage;
