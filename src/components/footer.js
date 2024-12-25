import { useLocation } from "react-router-dom";

export const Footer=()=>{
    const loca =useLocation();
    if (loca.pathname === "/login") {return <></>}
    return (<footer>
        Make by <span style={{color:"red"}}>❤</span>
    </footer>)
}