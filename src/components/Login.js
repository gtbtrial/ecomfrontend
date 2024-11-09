import axios from "axios";
import {  useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { login } from "../userSlice";
function Login() {
    const [uname,setuname]=useState();
    const [pass,setpass]=useState();
    const [msg,setmsg]=useState();
    const [loggedin,setloggedin]=useState(false);
    const dispatch = useDispatch();
    const [captverif,setcaptverif] = useState(false);

    const navigate = useNavigate();

    // const {setudata} = useContext(userContext);
    const cookie = new Cookies()

    function captchaChange(value) {
        if(value)
        {
            setcaptverif(true)
        }
        else
        {
            setcaptverif(false);
        }
      }

    async function onlogin(e)
    {
        e.preventDefault();
        if(captverif===true)
        {
            const logindata = {uname,pass};
            try
            {
                const resp =  await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/login`,logindata)
                if(resp.status===200)
                {
                    if(resp.data.statuscode===0)
                    {
                        setmsg("Incorrect Username/Password")
                    }
                    else if(resp.data.statuscode===1)
                    {
                        if(resp.data.pdata.activated===true)
                        {
                            dispatch(login(resp.data.pdata));
                            sessionStorage.setItem("userdata", JSON.stringify(resp.data.pdata));
                            if(loggedin===true)
                            {
                                const expires = new Date();
                                expires.setDate(expires.getDate() + 7); 
                                cookie.set("userinfo",resp.data.pdata,{ path: '/', expires })
                            }
                            if(resp.data.pdata.usertype==="admin")
                            {
                                sessionStorage.setItem("token",resp.data.token);
                                navigate("/adminhome");
                            }
                            else
                            {
                                navigate("/homepage");
                            }
                        }
                        else
                        {
                            toast.error("Your account is not activated. Please check your email and activate your account")
                        }
                    
                    }
                }
                else
                {
                    setmsg("Some error occured");
                }
            }
            catch(err)
            {
                
            }
        }
        else
        {
            toast.error("Please complete captcha test")
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Login Page</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <h2>Login Form</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={onlogin}>
            <input type="email" name="un" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)} />
            <input type="password" name="pass" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)}/><br/>

            <label><input type="checkbox" name="cb1" onChange={(e)=>setloggedin(e.target.checked)}/>Stay Logged In</label>

            <div class="forgot">
						<Link to="/forgotpassword">Forgot Password?</Link>
			</div>

             <ReCAPTCHA sitekey="6LcScl4qAAAAAFf48KPj-WtP5y-099CQ2XNu4yi1" onChange={captchaChange}/>

            <input type="submit" name="btn" value="Login" /><br/>
            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login