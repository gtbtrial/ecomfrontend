import Header from './components/Header';
import Footer from './components/Footer';
import SiteRoutes from './components/SiteRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useEffect, } from 'react';
import AdminHeader from './components/AdminHeader';
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './userSlice';
const cookie = new Cookies()
function App() {
  const {isLoggedIn,uinfo} = useSelector((state)=>state.usersl);
  const dispatch = useDispatch();
  useEffect(()=>
  {
    if(sessionStorage.getItem("userdata")!==null)
    {
      dispatch(login(JSON.parse(sessionStorage.getItem("userdata"))));
    }
  },[])

  useEffect(()=>
  {
    if(cookie.get("userinfo")!==undefined)
    {
      dispatch(login(cookie.get("userinfo")));
      sessionStorage.setItem("userdata", cookie.get("userinfo"));
    }
  },[])

  return (
    <>
        {
          isLoggedIn===false?<Header/>
          :uinfo.usertype==="admin"?<AdminHeader/>:
          <Header/>
        }
        <SiteRoutes/>
        <Footer/>
      <ToastContainer theme='colored' />
    </>
  );
}
export default App;
