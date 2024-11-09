import axios from "axios";
import { useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";
function Contactus() {
    const [pname,setpname]=useState();
    const [phone,setphone]=useState();
    const [email,setemail]=useState();
    const [message,setmessage]=useState();
    const [msg,setmsg]=useState();

    async function sendmessage(e)
    {
        e.preventDefault();
        const msgdata = {pname,phone,email,message};
        try
        {
            const resp =  await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/contactus`,msgdata)
            if(resp.status===200)
            {
                toast.info(resp.data.msg)
            }
            else
            {
                toast.error("Some error occured");
            }
        }
        catch(err)
        {
            
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Contact Us</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Contact Us</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={sendmessage}>
            <input type="text" name="pname" placeholder="Your Name" required=" " onChange={(e)=>setpname(e.target.value)} /><br/>
            <input type="email" name="pemail" placeholder="Email Address" required=" " onChange={(e)=>setemail(e.target.value)} /><br/>
            <input type="tel" name="phone" placeholder="Phone" required=" " onChange={(e)=>setphone(e.target.value)} /><br/>
            <textarea name="msg" placeholder="Your Message" required=" " className="form-control" onChange={(e)=>setmessage(e.target.value)}></textarea>
            <input type="submit" name="btn" value="Submit" /><br/>
            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contactus