import { useRoutes } from "react-router-dom";
import { MyRoutes } from "./MyRoutes";

export default function Allroutes(){
    return useRoutes([MyRoutes])
}