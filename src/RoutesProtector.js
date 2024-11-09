import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

var RoutesProtector=(props)=>
    {
        const {isLoggedIn} = useSelector((state)=>state.usersl);

        const mynavigate = useNavigate();
        useEffect(()=>
        {
            if(isLoggedIn===false)
            {
                mynavigate("/login");
            }
        },[])
    
        return(
            <>
                <props.MyComp/>
            </>
        )
    }
    export default RoutesProtector;