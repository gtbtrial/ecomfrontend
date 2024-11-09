import axios from "axios";
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";
function ResetPassword() {
    const [pass,setpass]=useState();
    const [cpass,setcpass]=useState();
    const [msg,setmsg]=useState();
    const [params] = useSearchParams();
    const id = params.get("code");
    async function changepass(e)
    {
        e.preventDefault();
        if(pass===cpass)
        {
            const resetdata = {id,pass};
            try
            {
                const resp =  await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/resetpass`,resetdata)
                if(resp.status===200)
                {
                    toast.info(resp.data.msg)
                }
                else
                {
                    toast.warn("Some error occured");
                }
            }
            catch(err)
            {
                toast.warn("Some error occured " + err.message);
            }
        }
        else
        {
            toast.warn("Password and confirm password doesn't match");
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Reset Password</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Reset Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={changepass}>
            <input type="password" name="pass" placeholder="New Password" required=" " onChange={(e)=>setpass(e.target.value)}/>
            <input type="password" name="cpass" placeholder="Confirm New Password" required=" " onChange={(e)=>setcpass(e.target.value)}/>


            <input type="submit" name="btn" value="Reset Password" /><br/>
            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ResetPassword