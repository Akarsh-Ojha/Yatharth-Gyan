import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaArrowLeft } from 'react-icons/fa';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setComponent }) => {
  const [show, setShow] = useState(false);
  const { mode, setMode, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "https://yatharth-gyan-backend.onrender.com/api/v1/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handelComponent = (value) => {
    setComponent(value);
  }

  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}> <RxHamburgerMenu /></div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className='icon-wrapper-arrow' onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <img src={user && user?.avatar?.url} alt="avatar" />
          <p>{user?.name}</p>
        </div>
        <ul>
          <button onClick={() => setComponent("My Blogs")}>My Blogs</button>
          <button onClick={() => {
            setComponent("Create Blog");
            setShow(!show);
          }}>Create Blog</button>
          <button onClick={() => setComponent("Chart")}>Chart</button>
          <button onClick={() => setComponent("My Profile")}>My Profile</button>
          <button onClick={gotoHome}>Home</button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"}>
            {mode === "light"
              ? (<CiLight className="light-icon" />)
              : (
                <MdDarkMode className="dark-icon" />
              )}
          </button>
        </ul>
      </section>
    </>
  )
}

export default Sidebar
