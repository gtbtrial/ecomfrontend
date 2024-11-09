import axios from "axios";
import {  useEffect, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
function ShowCart() {
    const [cartdata,setcartdata]=useState([]);
    const [billamt,setbillamt]=useState();
    const navigate = useNavigate();
    const {isLoggedIn,uinfo} = useSelector((state)=>state.usersl);
    async function fetchcart()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getcart?un=${uinfo.username}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setcartdata(resp.data.cartinfo)
                    sessionStorage.setItem("cartdata",JSON.stringify(resp.data.cartinfo));
                }
                else
                {
                    setcartdata([]);
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
            fetchcart();
        }
    },[isLoggedIn])

    useEffect(()=>
    {
        var gtotal=0;
        for(var x=0;x<cartdata.length;x++)
        {
            gtotal=gtotal+cartdata[x].TotalCost;
        }
        setbillamt(gtotal);
    },[cartdata])

    async function oncartdel(id)
    {
        var userresp=window.confirm("Are you sure to delete");
        if(userresp===true)
        {
            const resp =  await axios.delete(`${process.env.REACT_APP_APIPREFIX}/api/delcartitem/${id}`);
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    alert("Item  removed from cart");
                    fetchcart();
                }
                else if(resp.data.statuscode===0)
                {
                    alert("Error while removing");
                }
            }
            else
            {
                alert("Some error occured")
            }
        }
    }
    function oncheckout()
    {
        sessionStorage.setItem("tbill",billamt);
        navigate("/checkout");
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Your Cart</li>
                    </ol>
                </div>
            </div>
            <div className="login">
                <div className="container">
                    {
                        cartdata.length>0?
                        <>
                            <h2>Your shopping cart</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Name</th>
                                        <th>Rate</th>
                                        <th>Quantity</th>
                                        <th>Total Cost</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                cartdata.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${item.picture}`} height='75'/></td>
                                    <td>{item.ProdName}</td>
                                    <td>{item.Rate}</td>
                                    <td>{item.Qty}</td>
                                    <td>{item.TotalCost}</td>
                                    <td><button className="btn btn-danger" onClick={()=>oncartdel(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {cartdata.length} item(s) available in your cart<br/><br/>
                            Rs.{billamt}/- is your total bill <br/><br/>
                            <button name="btn" className="btn btn-primary" onClick={oncheckout}>Checkout</button>
                        </>:<h2>No products added yet in cart</h2>
                    }
                </div>
            </div>
        </>
    )
}
export default ShowCart