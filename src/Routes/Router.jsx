import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/Home Layout/HomeLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login page/Login";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <HomeLayouts></HomeLayouts>,
    children:[
        {
            index:true,
            element:<Home></Home>   
       },
       {
        path:'/login',
        element:<Login></Login>
       }
    ]
    }
])