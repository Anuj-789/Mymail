import { Eye } from "lucide-react";


const ApiKeyTable = ({ data, onShow, projects }) => {


  const getProjectName = (key) => {

    const projectId =
      typeof key.projectId === "object"
        ? key.projectId?._id
        : key.projectId;


    const project = projects?.find(
      (p) => p._id === projectId
    );


    return project?.projectName || "Project";

  };



  return (

    <div
      className="
      rounded-2xl
      border
      border-stone-800
      bg-stone-900
      overflow-hidden
      "
    >


      <div className="overflow-x-auto">


        <table className="w-full">


          <thead>

            <tr
              className="
              border-b
              border-stone-800
              text-stone-400
              text-sm
              "
            >


              <th
                className="
                px-6
                py-4
                text-left
                font-medium
                "
              >
                Project
              </th>



              <th
                className="
                px-6
                py-4
                text-left
                font-medium
                "
              >
                Prefix
              </th>




              <th
                className="
                px-6
                py-4
                text-left
                font-medium
                "
              >
                Status
              </th>




              <th
                className="
                px-6
                py-4
                text-left
                font-medium
                "
              >
                Usage
              </th>




              <th
                className="
                px-6
                py-4
                text-center
                font-medium
                "
              >
                Action
              </th>



            </tr>


          </thead>





          <tbody>


            {
              data.map((key)=>(


                <tr

                  key={key._id}

                  className="
                  border-b
                  border-stone-800
                  text-white
                  hover:bg-stone-800/50
                  transition
                  "

                >




                  <td
                    className="
                    px-6
                    py-5
                    "
                  >

                    <div
                      className="
                      font-medium
                      text-white
                      "
                    >

                      {getProjectName(key)}

                    </div>


                    <div
                      className="
                      text-xs
                      text-stone-500
                      mt-1
                      "
                    >

                      Production Key

                    </div>


                  </td>







                  <td
                    className="
                    px-6
                    py-5
                    "
                  >

                    <span
                      className="
                      text-orange-400
                      font-mono
                      text-sm
                      "
                    >

                      {key.keyPrefix}

                    </span>


                  </td>








                  <td
                    className="
                    px-6
                    py-5
                    "
                  >

                    <span

                      className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold

                      ${
                        key.status === "active"

                        ?

                        "bg-green-500/10 text-green-400"

                        :

                        "bg-red-500/10 text-red-400"

                      }
                      `}

                    >

                      {key.status}


                    </span>


                  </td>








                  <td
                    className="
                    px-6
                    py-5
                    text-stone-300
                    "
                  >

                    {key.usageCount || 0}


                  </td>








                  <td
                    className="
                    px-6
                    py-5
                    text-center
                    "
                  >


                    <button

                      onClick={() => onShow(key)}

                      className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-orange-500
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-black
                      hover:bg-orange-400
                      transition
                      "

                    >

                      <Eye size={16}/>

                      View


                    </button>



                  </td>





                </tr>


              ))
            }



          </tbody>



        </table>


      </div>



    </div>

  );


};


export default ApiKeyTable;