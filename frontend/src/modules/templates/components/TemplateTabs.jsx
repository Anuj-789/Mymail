const TemplateTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "system",
      label: "System Templates",
    },

    {
      id: "custom",
      label: "My Templates",
    },

    {
      id: "create",
      label: "Create Own",
    },
  ];

  return (
    <div
      className="
      flex
      flex-wrap
      gap-3
      bg-stone-900
      border
      border-stone-800
      p-2
      rounded-2xl
      "
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
              px-5
              py-2.5
              rounded-xl
              text-sm
              font-medium
              transition

              ${
                activeTab === tab.id
                  ? "bg-orange-500 text-black"
                  : "text-stone-400 hover:text-white hover:bg-stone-800"
              }

              `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TemplateTabs;
