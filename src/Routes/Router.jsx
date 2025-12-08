import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/Home Layout/HomeLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login page/Login";
import SignUp from "../Pages/Sign up/SignUp";
import AuthLayout from "../Layouts/Auth layout/AuthLayout";
import DashboardLayout from "../Layouts/Dashbord Layout/DashboardLayout";
import UserDashboard from "../Pages/Dashbord/User/UserDashboard";


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
    },
    {
        path:'/',
        element:<DashboardLayout></DashboardLayout>,
        children:[
           {
             path:'/user-dashboard',
            element:<UserDashboard></UserDashboard>
           }
        ]
    }
   
])