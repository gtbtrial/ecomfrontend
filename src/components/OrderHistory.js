import axios from "axios";
import {  useEffect, useState } from "react"
import { Link} from "react-router-dom"
import { useSelector } from "react-redux";
function OrderHistory() {
    const [ordersdata,setordersdata]=useState([]);
    const {isLoggedIn,uinfo} = useSelector((state)=>state.usersl);
    async function fetchorders()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getuserorders?un=` + uinfo.username)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setordersdata(resp.data.ordersdata)
                }
                else
                {
                    setordersdata([]);
                }
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
        if(isLoggedIn===true)
        {
            fetchorders();
        }
    },[isLoggedIn])

    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">List of Orders</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        ordersdata.length>0?
                        <>
                            <h2>List of Orders</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Address</th>
                                        <th>Bill Amount</th>
                                        <th>Username</th>
                                        <th>Date</th>
                                        <th>Payment Mode</th>
                                        <th>Status</th>
                                    </tr>
                                </tbody>
                            {
                                ordersdata.map((item,index)=>
                                <tr key={index}>
                                    <td><Link to={`/orderitems?oid=${item._id}`}>{item._id}</Link></td>
                                    <td>{item.saddress}</td>
                                    <td>{item.billamt}</td>
                                    <td>{item.username}</td>
                                    <td>{item.OrderDate}</td>
                                    <td>{item.PayMode}</td>
                                    <td>{item.status}</td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {ordersdata.length} orders found
                        </>:<h2>No orders found</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default OrderHistory