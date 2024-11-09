import {  useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function OrderSummary() {
    const [orderinfo,setorderinfo]=useState({});
    const {isLoggedIn,uinfo} = useSelector((state)=>state.usersl);
    async function fetchorderid()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getorderid?un=` + uinfo.username)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setorderinfo(resp.data.orderdata);
                }
                else
                {
                   toast.error("Error while fetching details")
                }
            }
            else
            {
                toast.error("Some error occured");
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
            fetchorderid();
        }
    },[isLoggedIn])
    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>Thanks for shopping on our website. Your order number is {orderinfo._id}</h2>
                </div>
            </div>
        </>
    )
}
export default OrderSummary;