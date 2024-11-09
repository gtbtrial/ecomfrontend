import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
function Register() {
    const [name,setname] = useState();
    const [phone,setphone] = useState();
    const [uname,setuname] = useState();
    const [pass,setpass] = useState();
    const [cpass,setcpass] = useState();
    const [msg,setmsg] = useState();
    const [terms,setterms] = useState(false);
	const [verrors, setverrors] = useState({});
    const validateForm = () => {
		const errors = {};

    // Check if 'name' is defined and then check its length
    if (!name || name.length < 3) {
        errors.name = 'Name must be at least 3 characters long';
    }

    // Check if 'phone' is defined before using the regex
    if (!phone || !/^\d{10}$/.test(phone)) {
        errors.phone = 'Phone must be a 10-digit number';
    }

    // Check if 'uname' (email) is defined before using the regex
    if (!uname || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(uname)) {
        errors.email = 'Invalid email format';
    }

    // Check if 'pass' is defined before using the regex
    if (!pass || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}/.test(pass)) {
        errors.password = 
            'Password must contain at least 1 uppercase, 1 number, 1 special character, and be at least 6 characters long';
    }

    // Check if 'pass' and 'cpass' are defined and match
    if (!cpass || pass !== cpass) {
        errors.confirmPassword = 'Passwords do not match';
    }

    // Set validation errors
    setverrors(errors);

    // Return false if there are any errors, otherwise return true
    return Object.keys(errors).length !== 0 ? false : true;
	};

    async function onregister(e)
    {
        e.preventDefault();//it will prevent form from getting submi
        if(validateForm()===true)
        {
            if(terms===true)
            {
                if(pass===cpass)
                {
                    setmsg("");
                    const regdata={name,phone,uname,pass}
                    try
                    {
                        // const resp =  await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/Register`,regdata)
                        var resp = await fetch(`${process.env.REACT_APP_APIPREFIX}/api/signup`,
                        {
                            method:"post",
                            body: JSON.stringify(regdata),
                            headers:{'Content-type':'application/json'}
                        })

                        if(resp.status===200)
                        {
                            var result = await resp.json();
                            toast.info(result.msg)
                        }
                        else
                        {
                            toast.info(result.msg)
                        }
                    }
                    catch(err)
                    {
                        setmsg(err.message);
                    }
                }
                else{
                    setmsg("Password and confirm password doesn't match")
                }
            }
            else{
                setmsg("Please accept terms & conditions")
            }
        }
    }
    return (
        <>
                <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Register Page</li>
                    </ol>
                </div>
            </div>
            <div className="register">
                <div className="container">
                    <h2>Register Here</h2>
                    <div className="login-form-grids">
                        <h5>profile information</h5>
                        <form name="form1" onSubmit={onregister}>
                            <input type="text" name="pname" onChange={(e)=>setname(e.target.value)} placeholder="Name..." />
                            {verrors.name?<span>{verrors.name}</span>:null}
                            <br/>
                            <input type="tel" name="phone" onChange={(e)=>setphone(e.target.value)} placeholder="Phone..." />
                            {verrors.phone?<span>{verrors.phone}</span>:null}
                        <h6>Login information</h6>
                            <input type="email" name="un" onChange={(e)=>setuname(e.target.value)} placeholder="Email Address(Username)"/>
                            {verrors.email?<span>{verrors.email}</span>:null}

                            <input type="password" name="pass" onChange={(e)=>setpass(e.target.value)} placeholder="Password"/>
                            {verrors.password?<span>{verrors.password}</span>:null}

                            <input type="password" name="cpass" onChange={(e)=>setcpass(e.target.value)}placeholder="Password Confirmation"/>
                            {verrors.confirmPassword?<span>{verrors.confirmPassword}</span>:null}
                            <div className="register-check-box">
                                <div className="check">
                                    <label className="checkbox">
                                        <input type="checkbox" name="cbx1" onChange={(e)=>setterms(e.target.checked)}/><i> </i>I accept the terms and conditions</label>
                                </div>
                            </div>
                            <input type="submit" name="btn" value="Register"/>
                            {msg}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Register