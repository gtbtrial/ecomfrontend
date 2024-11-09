import { Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Login from "./Login";
import SearchUser from "./SearchUser";
import ListofUsers from "./ListofUsers";
import ManageCategory from "./ManageCategory";
import ManageProduct from "./ManageProduct";
import ChangePassword from "./ChangePassword";
import Categories from "./Categories";
import Products from "./Products";
import Details from "./Details";
import ShowCart from "./ShowCart";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";
import ViewOrders from "./ViewOrders";
import OrderItems from "./OrderItems";
import UpdateStatus from "./UpdateStatus";
import OrderHistory from "./OrderHistory";
import SearchProducts from "./SearchProducts";
import AdminHome from "./AdminHome";
import CreateAdmin from "./CreateAdmin";
import ManageSubCategory from "./ManageSubCategory";
import Subcategories from "./Subcategories";
import Contactus from "./Contactus";
import Activate from "./Activate";
import ForgotPass from "./ForgotPass";
import ResetPassword from "./ResetPassword";
import Mycookies from "./Mycookies";
import ExtAPI from "./ExtAPI";
import ExtAPI2 from "./ExtAPI2";
import ExtAPI3 from "./ExtAPI3";
import Register from "./Register";
import RoutesProtector from "../RoutesProtector";

function SiteRoutes()
{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/homepage" element={<Home/>}/>
            <Route path="/register" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/searchuser" element={<SearchUser/>}/>
            <Route path="/listofusers" element={<ListofUsers/>}/>
            <Route path="/managecategory" element={<ManageCategory/>}/>
            <Route path="/manageproduct" element={<ManageProduct/>}/>
            {/* <Route path="/changepassword" element={<ChangePassword/>}/> */}
            <Route path='/changepassword' element={<RoutesProtector MyComp={ChangePassword}/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/details" element={<Details/>}/>
            <Route path="/showcart" element={<ShowCart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/ordersummary" element={<OrderSummary/>}/>
            <Route path="/vieworders" element={<ViewOrders/>}/>
            <Route path="/orderitems" element={<OrderItems/>}/>
            <Route path="/updatestatus" element={<UpdateStatus/>}/>
            <Route path="/orderhistory" element={<OrderHistory/>}/>
            <Route path="/searchresults" element={<SearchProducts/>}/>
            <Route path="/adminhome" element={<AdminHome/>}/>
            <Route path="/addadmin" element={<CreateAdmin/>}/>
            <Route path="/managesubcategory" element={<ManageSubCategory/>}/>
            <Route path="/subcategories/:cid" element={<Subcategories/>}/>
            <Route path="/contactus" element={<Contactus/>}/>
            <Route path="/activateaccount" element={<Activate/>}/>
            <Route path="/forgotpassword" element={<ForgotPass/>}/>
            <Route path="/resetpassword" element={<ResetPassword/>}/>
            <Route path="/cookies" element={<Mycookies/>}/>
            <Route path="/extapi" element={<ExtAPI/>}/>
            <Route path="/extapi2" element={<ExtAPI2/>}/>
            <Route path="/extapi3" element={<ExtAPI3/>}/>
            <Route path="/signup" element={<Register/>}/>
        </Routes>
        </>
    )
}
export default SiteRoutes