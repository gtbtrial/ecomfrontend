import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
function ManageSubCategory() {
    const [catid,setcatid]=useState("");
    const [subcatid,setsubcatid]=useState("");
    const [scname,setscname]=useState();
    const [pic,setpic]=useState(null);

    const [msg,setmsg]=useState();

    const [catdata,setcatdata]=useState([]);
    const [subcatdata,setsubcatdata]=useState([]);

    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    async function fetchallcat()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getallcat`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setcatdata(resp.data.catdata)
                }
                else
                {
                    setcatdata([]);
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
        fetchallcat();
    },[])

    useEffect(()=>
    {
       if(catid!=="" && editmode===false)
       {
            fetchsubcatbycat();
       }
       else
       {
            setsubcatdata([]);
       }
    },[catid])


    var fetchsubcatbycat=async()=>
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getsubcatbycat/${catid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setsubcatdata(resp.data.subcatinfo)
                }
                else
                {
                    setsubcatdata([]);
                    toast.error("No sub categories found");
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


    useEffect(()=>
    {
        if(sessionStorage.getItem("userdata")===null)
        {
            toast.error("Please login to access the page");
            navigate("/login");
        }
        else
        {   
            var uinfo =JSON.parse(sessionStorage.getItem("userdata"));
            if(uinfo.usertype!=="admin")
            {
                toast.error("Please login to access the page");
                navigate("/login");
            }
        }
    },[])

    async function addsubcategory(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("cid",catid)
            formdata.append("subcatname",scname)
            if(pic!==null)
            {
                formdata.append("picture",pic)
            }
            const resp =  await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/savesubcategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Sub Category added successfully")
                   oncancel();
                //    fetchallcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Category not added");
                }
            }
            else
            {
               alert("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }
    }
    async function updatedb()
    {
        try
        {
            const formdata = new FormData();
            formdata.append("cid",catid)//old catid or new catid
            formdata.append("scname",scname)//oldname or new name

            if(pic!==null)
            {
                formdata.append("picture",pic)
            }
            formdata.append("oldpicname",picname)
            formdata.append("scid",subcatid);
            const resp =  await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updatesubcategory`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Sub Category updated successfully")
                   oncancel();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Sub Category not updated");
                }
            }
            else
            {
               alert("Some error occured");
            }
        }
        catch(err)
        {
            alert(err.message)
        }

    }
    function ondel(id)
    {

    }
    function onupdate(subcatitem)
    {
        seteditmode(true)
        setscname(subcatitem.subcatname)
        setpicname(subcatitem.subcatpic)
        setsubcatid(subcatitem._id);
    }
    function oncancel()
    {
        seteditmode(false);
        setscname("")
        setcatid("");
        setsubcatid("");
        setpicname("")
        setpic(null)
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
        }
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Sub Category</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Sub Category</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={addsubcategory}>

            <select name="cat" className="form-control" onChange={(e)=>setcatid(e.target.value)} value={catid}>
                <option value="">Choose Category</option>
                {
                    catdata.map((item,index)=>
                    <option value={item._id} key={index}>{item.catname}</option>
                    )
                }
            </select>

            <input type="text" name="subcatname" value={scname} placeholder="Sub Category Name" required=" " onChange={(e)=>setscname(e.target.value)} /><br/>

            {
                editmode?
                <>
                    <img src={`uploads/${picname}`} height='100'/>
                    Choose new image, if required<br/><br/>
                </>:null
            }

            <input type="file" name="scatpic" ref={fileInputRef} onChange={(e)=>setpic(e.target.files[0])} /><br/>

            {editmode===false?<input type="submit" name="btn1" value="Add" />:null}
            {
                editmode?
                <>
                    <input type="button" className="btn btn-primary" name="btn2" value="Update" onClick={updatedb} /> &nbsp;
                    <input type="button" className="btn btn-primary" name="btn3" onClick={oncancel} value="Cancel" />
                </>:null
            }
            {msg}
                        </form>
                    </div><br/><br/>

                    {
                        subcatdata.length>0?
                        <>
                            <h2>Added Sub Categories</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Sub Category Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                subcatdata.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${item.subcatpic}`}  height='75'/></td>
                                    <td>{item.subcatname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>ondel(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {subcatdata.length} sub categories found
                        </>:null
                    }

                </div>
            </div>
        </>
    )
}
export default ManageSubCategory