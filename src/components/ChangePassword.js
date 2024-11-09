import axios from "axios";
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../userSlice";
function ChangePassword() {
    const [currpass,setcurrpass]=useState();
    const [newpass,setnewpass]=useState();
    const [cnewpass,setcnewpass]=useState();
    const [msg,setmsg]=useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {uinfo} = useSelector((state)=>state.usersl);


    async function onlogin(e)
    {
        e.preventDefault();
        const uname = uinfo.username;
        const apidata = {currpass,newpass,uname};
        try
        {
            if(newpass===cnewpass)
            {
                const resp =  await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/changepassword`,apidata)
                if(resp.status===200)
                {
                    if(resp.data.statuscode===0)
                    {
                        toast.info("Current Password Incorrect")
                    }
                    else if(resp.data.statuscode===1)
                    {
                        toast.success("Password changed successfully");
                        dispatch(logout())
                        sessionStorage.clear();
                        navigate("/homepage");
                    }
                }
                else
                {
                    setmsg("Some error occured");
                }
            }
            else
            {
                toast.warning("New Password and confirm new password does not match")
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
                        <li className="active">Change Password</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Change Password</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
            <input type="password" name="pass" placeholder="Current Password" required=" " onChange={(e)=>setcurrpass(e.target.value)}/>
            <input type="password" name="pass" placeholder="New Password" required=" " onChange={(e)=>setnewpass(e.target.value)}/>
            <input type="password" name="pass" placeholder="Confirm New Password" required=" " onChange={(e)=>setcnewpass(e.target.value)}/>
            <input type="submit" name="btn" value="Change Password" /><br/>
            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChangePassword