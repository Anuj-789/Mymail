const StatsCard = ({
  title,
  value,
  icon: Icon,
  color = "orange",
}) => {
  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-stone-800
        bg-stone-900
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-orange-500/30
        hover:bg-stone-900/80
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            className="
              text-sm
              font-medium
              text-stone-500
            "
          >
            {title}
          </p>

          <h2
            className="
              mt-3
              text-3xl
              font-bold
              tracking-tight
              text-white
            "
          >
            {value}
          </h2>
        </div>

        <div
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-orange-500/10
            text-orange-400
            transition
            group-hover:bg-orange-500/15
          "
        >
          {Icon && <Icon size={21} />}
        </div>
      </div>

      <div
        className="
          mt-5
          h-px
          bg-stone-800
        "
      />

      <p
        className="
          mt-3
          text-xs
          text-stone-600
        "
      >
        Updated from your latest activity
      </p>
    </div>
  );
};

export default StatsCard;