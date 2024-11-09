import axios from "axios";
import { useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";
function ForgotPass() {
    const [uname,setuname]=useState();
    const [msg,setmsg]=useState();
    async function onforgot(e)
    {
        e.preventDefault();
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/forgotpass?un=${uname}`)
            if(resp.status===200)
            {
                
                toast.info(resp.data.msg)
                
            }
            else
            {
                setmsg("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/homepage"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Forgot Password</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Forgot Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onforgot}>
            <input type="email" name="un" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)} />
            <input type="submit" name="btn" value="Submit" /><br/>
            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgotPass