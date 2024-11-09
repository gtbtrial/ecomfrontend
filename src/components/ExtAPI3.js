import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ExtAPI3() {
    const [ctname,setctname] = useState();
    const [winfo,setwinfo] = useState({});
    async function fetchinfo() {
        try 
        {
            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ctname}&appid=0cef9ce50886d905c871f0dd52775df4&units=metric`);
            if (resp.status === 200) 
            {
                
                setwinfo(resp.data);
            } 
            else 
            {
                alert("Some error occurred");
            }
        } 
        catch (err) 
        {
            alert(err.message);
        }
    }

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Weather Info</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                    <input type="text" name="cityname" placeholder="City Name" onChange={(e)=>setctname(e.target.value)}/><br/>
                        <button name="btn" onClick={fetchinfo} className="btn btn-primary">Show Weather</button><br/><br/>
                        {
                        Object.keys(winfo).length>0?
                        <>
                            Current Temp : {winfo.main.temp}<br/>
                            Feels Like : {winfo.main.feels_like}<br/>
                            Wind Speed : {winfo.wind.speed}<br/>
                            Overall : {winfo.weather[0].main}
                            Description : {winfo.weather[0].description}
                        </>:null
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExtAPI3;
