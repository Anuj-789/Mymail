import { lazy } from "react";


const ApiKeys = lazy(
  () => import("./pages/ApiKeys")
);



const apiKeyRoutes = [

    {
        path:"/dashboard/api-keys",
        element:<ApiKeys/>
    }

];


export default apiKeyRoutes;