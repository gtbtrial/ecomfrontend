import axios from "axios";
import { useEffect, useState } from "react"
import { Link} from "react-router-dom"
function ExtAPI() {
    const [membsdata,setmembsdata]=useState([]);
    async function fetchusers()
    {
        try
        {
            const resp =  await axios.get(`https://jsonplaceholder.typicode.com/users`)
            if(resp.status===200)
            {
                setmembsdata(resp.data)
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
    useEffect(()=>
    {
        fetchusers();
    },[])

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">User's List from Third Party API</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        membsdata.length>0?
                        <>
                            <h2>List of Users</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                    </tr>
                                </tbody>
                            {
                                membsdata.map((item,index)=>
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address.street}, {item.address.suite}, {item.address.city}, {item.address.zipcode}</td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {membsdata.length} members found
                        </>:<h2>No users found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ExtAPI