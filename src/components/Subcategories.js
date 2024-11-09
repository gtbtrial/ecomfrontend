import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams} from "react-router-dom";
import { toast } from "react-toastify";

function Subcategories() {
    const {cid} = useParams();
    const [subcatdata,setsubcatdata]=useState([]);
    useEffect(()=>
    {
        if(cid!=="")
        {
            fetchsubcatbycat();
        }
    },[cid])
    var fetchsubcatbycat=async()=>
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getsubcatbycat/${cid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setsubcatdata(resp.data.subcatinfo)
                }
                else
                {
                    setsubcatdata([]);
                }
            }
            else
            {
                toast.warning("Some error occured")
            }
        }
        catch(err)
        {
            toast.error(err.message);
        }
    }
    return (
        <>
            <div className="login">
                <div className="container">
                    {
                        subcatdata.length>0?
                        subcatdata.map((item, index) =>
                            <div className="col-md-4 top_brand_left" key={index}>
                                <div className="hover14 column">
                                    <div className="agile_top_brand_left_grid">
                                        <div className="agile_top_brand_left_grid1">
                                            <figure>
                                                <div className="snipcart-item block" >
                                                    <div className="snipcart-thumb">
                                                        <Link to={`/products?scid=${item._id}`}>
                                                            <img title=" " alt=" " src={`/uploads/${item.subcatpic}`} height='150'/><br/>
                                                            <p>{item.subcatname}</p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ):<h2>No subcategories found</h2>
                    }


                </div>
            </div>
        </>
    )
}
export default Subcategories;