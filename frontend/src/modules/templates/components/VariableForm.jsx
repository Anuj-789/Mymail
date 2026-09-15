const VariableForm = ({
  variables=[],
  values,
  setValues
}) => {


  const handleChange=(key,value)=>{


    setValues({

      ...values,

      [key]:value

    });


  };



  return (

    <div
      className="
      bg-stone-900
      border
      border-stone-800
      rounded-2xl
      p-5
      space-y-4
      "
    >


      <h3
        className="
        text-white
        font-semibold
        "
      >

        Variable Values

      </h3>



      {
        variables.map((variable)=>(


          <div key={variable}>


            <label
              className="
              text-xs
              text-stone-400
              block
              mb-2
              "
            >

              {variable}

            </label>



            <input

              value={
                values[variable] || ""
              }


              onChange={(e)=>

                handleChange(
                  variable,
                  e.target.value
                )

              }


              className="
              w-full
              rounded-xl
              bg-stone-950
              border
              border-stone-700
              px-4
              py-3
              text-sm
              text-white
              outline-none
              focus:border-orange-500
              "

              placeholder={
                `Enter ${variable}`
              }

            />


          </div>


        ))
      }


    </div>

  );

};


export default VariableForm;