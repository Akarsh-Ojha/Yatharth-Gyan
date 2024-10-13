import React, { useContext } from 'react'
import { Context } from '../../main';
import { Link, useLocation } from 'react-router-dom';
import { AiFillInstagram, AiFillLinkedin, AiFillYoutube, } from 'react-icons/ai';
import { FaGitSquare, FaWhatsapp } from 'react-icons/fa';


const Footer = () => {
  const isDashboard = useLocation("https://yatharth-gyan-frontend.onrender.com/dashboard");
  const { mode, setMode } = useContext(Context);
  
  return (
    <>
      <footer
        className={
          isDashboard.pathname === "/dashboard"
            ? "hideFooter"
            : mode === "light"
              ? " light-footer"
              : " dark-footer"
        }
      >
        <div className="container">
          <div className="about ">
            <h3 >About</h3>
            <p className='text-bg'>
              Yatharth Gyan is an organization that combines the knowledge of Sanatan culture with modern technology. Its aim is to enhance understanding across various fields, such as Sanatan history, technology, lifestyle, health, and more.
            </p>
            <p>
              <span>Email</span> yatharth.gyan2@gmail.com
            </p>
            <p>
              <span className='text-white'>Contact</span> <button onClick={() => window.open("https://wa.me/919876543210") } style={{backgroundColor:"#0ce558",color:"white",borderRadius:"5px",border:"none",padding:"5px 10px",cursor:"pointer"}} onMouseOver={(e) => e.target.style.backgroundColor = "#0ce558"} onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}>Whatsapp</button>
            </p>
          </div>

          <div className="quick_links">
            <h3>Quick Links</h3>
            <ul>
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/blogs">Blogs</Link>
              <Link to="/dashboard">DashBoard</Link>
            </ul>
          </div>

          <div className="categories">
            <h3>Categories</h3>
            <ul>
              <li>Sanatan History</li>
              <li>Entertainment</li>
              <li>Health</li>
              <li>Science</li>
              <li>LifeStyle</li>
              <li>Technology</li>
            </ul>
          </div>

          <div className="news_letter">
            <div>
              <h3>Weekly News</h3>
              <p>Get blog articles and offer via Whatsapp Channel </p>
            </div>
            <div>
                <button onClick={() => { window.open("https://wa.me/8922964243") }}> Whatsapp<FaWhatsapp /></button>
            </div>
          </div>
        </div>

        <div className="container">

          <Link className="logo no-underline">Yatharth <span>Gyan</span></Link>
          <div className="links">
            {/* <Link to="/" target="_blank"><AiFillInstagram/></Link>
            <Link to="/" target="_blank"><FaGitSquare/></Link>
            <Link to="/" target="_blank"><AiFillYoutube/></Link>
            <Link to="/" target="_blank"><AiFillLinkedin/></Link> */}
          </div>
        </div>

      </footer>
    </>
  )
}

export default Footer
