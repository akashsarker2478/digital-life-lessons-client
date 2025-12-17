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
import Pricing from "../Pages/Dashbord/Payment/Pricing";
import PaymentSuccess from "../Pages/Dashbord/Payment/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashbord/Payment/PaymentCancelled";
import PublicLessons from "../Pages/Public Lesson/PublicLessons";
import LessonDetails from "../Pages/Lessons Details/LessonDetails";
import AuthorProfile from "../Pages/Author Profile/AuthorProfile";
import NotFound from "../Component/Error Page/NotFound";
import AdminRoute from "../ADMIN/Admin Route/AdminRoute";
import AdminDashboard from "../ADMIN/Admin Dasahboard/AdminDashboard";
import AdminDashboardLayout from "../ADMIN/Dashbord Layout/AdminDashbordLayout";
import ManageUsers from "../ADMIN/Manage users/ManageUsers";
import ManageLessons from "../ADMIN/Manage Lessons/ManageLessons";
import ReportedLessons from "../ADMIN/ReportedLessons/ReportedLessons";
import AdminProfile from "../ADMIN/Admin Dasahboard/AdminProfile";



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
       {
        path:'/public-lesson',
        element:<PublicLessons></PublicLessons>
       },
       {
        path:'/lesson/:id',
        element:<PrivateRoute>
            <LessonDetails></LessonDetails>
        </PrivateRoute>
       },
       {
        path: "/author/:email",
        element:<AuthorProfile></AuthorProfile>
       }
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
        hydrateFallbackElement:<Loading></Loading>,
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
           },
           {
            path:'pricing',
            element:<Pricing></Pricing>
           },
           {
            path:'payment-success',
            element:<PaymentSuccess></PaymentSuccess>
           },
           {
            path:'payment-cancelled',
            element:<PaymentCancelled></PaymentCancelled>
           },
         
         
        ]
    },
     {
            path:'/dashboard/admin',
            element:<AdminRoute>
                <AdminDashboardLayout></AdminDashboardLayout>
            </AdminRoute>,
            hydrateFallbackElement:<Loading></Loading>,
            children:[
               {
                 path:'admin-dashboard',
                 element:<AdminDashboard></AdminDashboard>
               },
               {
                path:'manage-users',
                element:<ManageUsers></ManageUsers>
               },
               {
                path:'manage-lessons',
                element:<ManageLessons></ManageLessons>
               },
               {
                path:'reported-lessons',
                element:<ReportedLessons></ReportedLessons>
               },
               {
                path:'admin-profile',
                element:<AdminProfile></AdminProfile>
               },
              {
                 path: "add-lesson", 
                 element: <AddLesson /> ,
              }

            ]
           },
           {
                 path:'*',
               element:<NotFound></NotFound>
           }
])