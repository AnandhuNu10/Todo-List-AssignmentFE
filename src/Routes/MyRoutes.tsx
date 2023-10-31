import { Outlet } from "react-router-dom";
import Navbar from "../HomePage/Home";
import LoginPage from "../LoginPage/LoginPage";

export let MyRoutes = {
    path:'',
    element:<Outlet/>,
    children:[
        {
            path:'login',
            element:<LoginPage/>
        },
        {
            path:'home',
            element:<Navbar/>
        }
    ]
}