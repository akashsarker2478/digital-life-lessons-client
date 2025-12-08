import { Navigate, useLocation } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Loading from "../../Pages/Shared/Loading/Loading";



const PrivateRoute = ({children}) => {
    const location = useLocation()
   const {user,loading} = UseAuth()
   
   if(user&&user?.email){
    return children;
   }
    if(loading){
        return <Loading></Loading>
    }
    return <Navigate state={location.pathname} to={"/login"}></Navigate>
};

export default PrivateRoute;