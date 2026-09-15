import {
  Navigate,
  Outlet
} from "react-router-dom";


import {
  useSelector
} from "react-redux";




const ProtectedRoute = ({children}) => {


const {
  token,
  user,
  loading
} = useSelector(
(state)=>state.auth
);





if(loading){

return (

<div className="
min-h-screen
flex
items-center
justify-center
text-[var(--text)]
">

Loading...

</div>

);

}





const isAuthenticated =
Boolean(token && user);





if(!isAuthenticated){

return (

<Navigate

to="/login"

replace

/>

);

}





return children || <Outlet/>;



};



export default ProtectedRoute;