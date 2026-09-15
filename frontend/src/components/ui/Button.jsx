const Button = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  variant = "primary",
}) => {


  const variants = {

    primary: `
      bg-[#f97316]
      text-white
      hover:bg-[#ea580c]
    `,


    secondary: `
      border
      border-[#292524]
      bg-[#1c1917]
      text-[#fafaf9]
      hover:bg-[#292524]
    `,


    danger: `
      bg-red-500/10
      text-red-400
      hover:bg-red-500/20
    `,

  };



  return (

    <button

      type={type}

      onClick={onClick}

      disabled={disabled}

      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-5
        py-3
        text-sm
        font-semibold
        transition
        duration-200

        disabled:cursor-not-allowed
        disabled:opacity-50

        ${variants[variant]}

        ${className}
      `}

    >

      {children}

    </button>

  );

};


export default Button;