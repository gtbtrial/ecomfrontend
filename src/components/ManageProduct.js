import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link} from "react-router-dom"
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
function ManageProduct() {
    const [catid,setcatid]=useState("");
    const [subcatid,setsubcatid]=useState("");

    const [pname,setpname]=useState();
    const [rate,setrate]=useState();
    const [dis,setdis]=useState();
    const [stock,setstock]=useState();
    const [descp,setdescp]=useState();
    const [picture,setpicture]=useState(null);
    const [msg,setmsg]=useState();

    const [catdata,setcatdata]=useState([]);
    const [subcatdata,setsubcatdata]=useState([]);
    const [prodsdata,setprodsdata]=useState([]);

    const [picname,setpicname]=useState();
    const [editmode,seteditmode]=useState(false);

    const [prodid,setprodid]=useState();

    const fileInputRef = useRef(null);

    const modules = {
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          ['link', 'image', 'video'],
          ['clean'], // remove formatting button
        ],
      };

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
        setsubcatdata([]);
        setprodsdata([]);
        if(catid!=="")
        {
            
            fetchsubcatbycat();
        }
    },[catid])

    useEffect(()=>
    {
        setprodsdata([])
        if(subcatid!=="")
        {
            
            fetchprodsbysubcat();
        }            
    },[subcatid])

    var fetchsubcatbycat=async()=>
    {
        try
        {
            setsubcatdata([]);
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/getsubcatbycat/${catid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setsubcatdata(resp.data.subcatinfo)
                }
                else
                {
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

    async function fetchprodsbycat()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchprodsbycatid?cid=${catid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setprodsdata(resp.data.proddata)
                }
                else
                {
                    setprodsdata([]);
                    toast.info("No products found");
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

    async function fetchprodsbysubcat()
    {
        try
        {
            const resp =  await axios.get(`${process.env.REACT_APP_APIPREFIX}/api/fetchprodsbysubcatid?scid=${subcatid}`)
            if(resp.status===200)
            {
                if(resp.data.statuscode===1)
                {
                    setprodsdata(resp.data.proddata)
                }
                else
                {
                    setprodsdata([]);
                    toast.info("No products found");
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

    async function addproduct(e)
    {
        e.preventDefault();
        try
        {
            const formdata = new FormData();
            formdata.append("catid",catid)
            formdata.append("subcatid",subcatid)
            formdata.append("pname",pname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descp",descp)

            if(picture!==null)
            {
                formdata.append("picture",picture)
            }

            const resp =  await axios.post(`${process.env.REACT_APP_APIPREFIX}/api/saveproduct`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Product added successfully")
                   fetchprodsbycat();
                   oncancel();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Product not added");
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
            formdata.append("cid",catid)
            formdata.append("scid",subcatid)
            formdata.append("prodname",pname)
            formdata.append("rate",rate)
            formdata.append("dis",dis)
            formdata.append("stock",stock)
            formdata.append("descrip",descp)

            if(picture!==null)
            {
                formdata.append("pic",picture)
            }
            formdata.append("oldpicname",picname)
            formdata.append("pid",prodid);

            const resp =  await axios.put(`${process.env.REACT_APP_APIPREFIX}/api/updateproduct`,formdata)
            if(resp.status===200)
            {
               if(resp.data.statuscode===1)
               {
                   toast.success("Product updated successfully")
                   oncancel();
                   fetchprodsbysubcat();
               }
               else  if(resp.data.statuscode===0)
                {
                    toast.warn("Product not updated");
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
    function onupdate(proditem)
    {
        seteditmode(true)
        setpname(proditem.pname)
        setrate(proditem.Rate)
        setdis(proditem.Discount)
        setstock(proditem.Stock)
        setdescp(proditem.Description)
        setpicname(proditem.picture)
        setprodid(proditem._id);
    }
    function oncancel()
    {
        seteditmode(false);
        setpname("")
        setrate("")
        setdis("")
        setstock("")
        setdescp("") 
        setpicname("");
        if (fileInputRef.current) 
        {
            fileInputRef.current.value = '';
        }
        setpicture(null);
        setprodid("");
    }
    return (
        <>
            <div className="breadcrumbs">
                <div className="container">
                    <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
                        <li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
                        <li className="active">Manage Product</li>
                    </ol>
                </div>
            </div>

            <div className="login">
                <div className="container">
                    <h2>Manage Product</h2>
                    <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
                        <form name="form1" onSubmit={addproduct}>

            <select name="cat" className="form-control" onChange={(e)=>setcatid(e.target.value)}>
                <option value="">Choose Category</option>
                {
                    catdata.map((item,index)=>
                    <option value={item._id} key={index}>{item.catname}</option>
                    )
                }
            </select><br/>

            <select name="subcat" className="form-control" onChange={(e)=>setsubcatid(e.target.value)}>
                <option value="">Choose Sub Category</option>
                {
                    subcatdata.map((item,index)=>
                    <option value={item._id} key={index}>{item.subcatname}</option>
                    )
                }
            </select><br/>

            <input type="text" name="prodname" value={pname} placeholder="Product Name" required=" " onChange={(e)=>setpname(e.target.value)} /><br/>
            <input type="text" name="rate" value={rate} placeholder="Rate" required=" " onChange={(e)=>setrate(e.target.value)} /><br/>

            <input type="text" name="dis" value={dis} placeholder="Discount(in percent, do not add % symbol)" required=" " onChange={(e)=>setdis(e.target.value)} /><br/>

            <input type="text" name="stock" value={stock} placeholder="Stock" required=" " onChange={(e)=>setstock(e.target.value)} /><br/>

            <div style={{ height: '250px', width: '100%' }}>
            <ReactQuill
                style={{
                height: '100%',
                width: '100%',
                overflowY: 'auto', // Enables scrollbar when content overflows
                border: '1px solid #ccc', // Optional: to visualize the editor boundaries
                }}
                modules={modules} onChange={setdescp} value={descp}
                />
            </div><br/>

            {
                editmode?
                <>
                    <img src={`uploads/${picname}`} height='100'/>
                    Choose new image, if required<br/><br/>
                </>:null
            }

            <input type="file" name="ppic" ref={fileInputRef} onChange={(e)=>setpicture(e.target.files[0])} /><br/>

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
                        prodsdata.length>0?
                        <>
                            <h2>Added Products</h2><br/>
                            <table className="timetable_sub">
                                <tbody>
                                    <tr>
                                        <th>Picture</th>
                                        <th>Product Name</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </tbody>
                            {
                                prodsdata.map((item,index)=>
                                <tr key={index}>
                                    <td><img src={`uploads/${item.picture}`}  height='75'/></td>
                                    <td>{item.pname}</td>
                                    <td><button className="btn btn-primary" onClick={()=>onupdate(item)}>Update</button></td>
                                    <td><button className="btn btn-danger" onClick={()=>ondel(item._id)}>Delete</button></td>
                                </tr>
                                )
                            }
                            </table><br/>
                            {prodsdata.length} products found
                        </>:null
                    }

                </div>
            </div>
        </>
    )
}
export default ManageProduct