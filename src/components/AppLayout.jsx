// import AppNav from "./AppNav";
import Sidebar from "./Sidebar";
import styles from "./AppLayout.module.css";
import Map from "./Map";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import User from "./User";

function AppLayout()
{
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!isAuthenticated)
        {
            navigate("/login")
        }
    } , [isAuthenticated , navigate]);
    return(
        <div className={styles.app}>
            <User></User>
            <Sidebar></Sidebar>
            <Map></Map>
        </div>
    );
}

export default AppLayout;