import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/Home Layout/HomeLayouts";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login page/Login";
import SignUp from "../Pages/Sign up/SignUp";
import AuthLayout from "../Layouts/Auth layout/AuthLayout";
import DashboardLayout from "../Layouts/Dashbord Layout/DashboardLayout";
import UserDashboard from "../Pages/Dashbord/User/UserDashboard";
import AddLesson from "../Component/Add lesson Form/AddLesson";
import PrivateRoute from '../Routes/Private Route/PrivateRoute'
import Loading from "../Pages/Shared/Loading/Loading";
import MyLessons from "../Pages/Dashbord/My lessons/MyLessons";
import MyFavorites from "../Pages/Dashbord/My Favourite/MyFavorites";
import Profile from "../Pages/Dashbord/User Profile/Profile";


export const router = createBrowserRouter([
    {
    path: "/",
    element: <HomeLayouts></HomeLayouts>,
    hydrateFallbackElement:<Loading></Loading>,
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
        hydrateFallbackElement:<Loading></Loading>,
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
        path:'/dashboard',
        element:<PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children:[
            {
                path:'user-dashboard',
                element:<UserDashboard></UserDashboard>
            },
           {
             path:'my-lessons',
            element:<MyLessons></MyLessons>
           },
           {
             path:'add-lessons',
            element:<AddLesson></AddLesson>
           },
           {
            path:'my-favorites',
            element:<MyFavorites></MyFavorites>
           },
           {
            path:'profile',
            element:<Profile></Profile>
           }
         
        ]
    }
   
])