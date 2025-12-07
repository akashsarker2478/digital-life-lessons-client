import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/Home Layout/HomeLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login page/Login";
import SignUp from "../Pages/Sign up/SignUp";
import AuthLayout from "../Layouts/Auth layout/AuthLayout";


export const router = createBrowserRouter([
    {
    path: "/",
    element: <HomeLayouts></HomeLayouts>,
    children:[
        {
            index:true,
            element:<Home></Home>   
       },
    ]
    },
    {
        path:'/',
        element:<AuthLayout></AuthLayout>,
        children:[
            {
        path:'/login',
        element:<Login></Login>
       },
       {
        path:'/signUp',
        element:<SignUp></SignUp>
       }
        ]
    }
   
])