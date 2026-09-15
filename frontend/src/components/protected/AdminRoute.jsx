import {
  Navigate,
  Outlet
} from "react-router-dom";


import {
  useSelector
} from "react-redux";





const AdminRoute = ({children})=>{


const {
 user,
 token,
 loading
}=useSelector(
(state)=>state.auth
);






if(loading){

return (

<div

className="
min-h-screen
flex
items-center
justify-center
text-[var(--text)]
"

>

Loading...

</div>

);

}






const isAdmin =
Boolean(
token &&
user &&
user.role === "admin"
);






if(!isAdmin){


return (

<Navigate

to="/"

replace

/>

);

}




return children || <Outlet/>;



};



export default AdminRoute;