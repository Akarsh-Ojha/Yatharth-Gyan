import React , { useContext , useState} from 'react'
import { Navigate } from 'react-router-dom'
import Sidebar from '../layouts/Sidebar.jsx'
import MyProfile from '../miniComonents/MyProfile.jsx';
import CreateBlogs from '../miniComonents/CreateBlog.jsx'
import MyBlogs from '../miniComonents/MyBlog.jsx'
import Chart from '../miniComonents/Chart.jsx'
import { Context } from '../../main.jsx'


const DashBoard = () => {
  const [component, setComponent] = useState("My Blog");
  const { mode,isAuthenticated ,user} = useContext(Context);
  if(!isAuthenticated || user.role === "Reader"){
    return <Navigate to='/' />;
  };

  return (
    <section className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}>
      <Sidebar component = {component} setComponent = {setComponent}/>
      {
        component === "My Profile" ? (<MyProfile />) : component === "Create Blog" ? (<CreateBlogs />) : component === "Chart" ? (<Chart />) : (<MyBlogs />)
      }
    </section>
  )
}

export default DashBoard
