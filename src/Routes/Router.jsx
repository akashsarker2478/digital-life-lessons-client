import { createBrowserRouter } from "react-router";
import HomeLayouts from "../Layouts/Home Layout/HomeLayouts";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <HomeLayouts></HomeLayouts>,
    children:[
        {
            index:true,
            element:<Home></Home>   
       }
    ]
    }
])