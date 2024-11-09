import axios from "axios";
import { useEffect, useState} from "react";
import { useSearchParams } from "react-router-dom";


function Activate() {
    const [params] = useSearchParams();
    const code = params.get("actcode");
    const [msg,setmsg] = useState();
    useEffect(()=>
    {
        if(code!=="")
        {
            activateaccount();
        }
    },[code])
    
    async function activateaccount()
    {
        try
        {
            const resp =  await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/activateaccount?code=${code}`)
            if(resp.status===200)
            {
                setmsg(resp.data.msg)
            }
            else
            {
                alert("Some error occured")
            }
        }
        catch(err)
        {
            alert(err.message);
        }
    }

    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>{msg}</h2>
                 </div>
            </div>
        </>
    )
}
export default Activate;