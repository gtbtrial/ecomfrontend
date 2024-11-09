import { useState } from "react";
import Cookies from "universal-cookie";

function Mycookies() {
    const [pname,setpname] = useState();
    // const cookie = new Cookies(null,{ path: '/',maxAge :86400})
    const cookie = new Cookies()
    // var saveinfo=()=>
    // {
    //     cookie.set("userinfo","Vishal")
    // }
    var saveinfo=()=>
    {
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); 
        cookie.set("userinfo","Vishal",{ path: '/', expires })
    }

    var readinfo=()=>
    {
        setpname(cookie.get("userinfo"));
    }
    var delinfo=()=>
    {
        cookie.remove("userinfo");
    }

    return (
        <>
            <div className="login">
                <div className="container">
                    <button onClick={saveinfo}>Save</button>
                    <button onClick={readinfo}>Read</button>
                    <button onClick={delinfo}>Delete</button>
                    {pname}
                </div>
            </div>
        </>
    )
}
export default Mycookies;