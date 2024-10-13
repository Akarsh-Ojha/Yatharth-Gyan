import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleBlog = () => {
  const { mode } = useContext(Context);
  const { id } = useParams();
  const [blog, setBlog] = useState({}); 


  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const { data } = await axios.get(`https://yatharth-gyan-backend.onrender.com/api/v1/blog/singleblog/${id}`);
        setBlog(data.blog);
      } catch (error) {
        setBlog({});
      }
    };
    getSingleBlog();
  }, [id]);

  // Inline styles for the flexbox layout
  const containerStyle = {
    display: 'flex',
    margin: 'auto 0',

  };

  const sidebarStyle = {
    width: '15%', // 15% width for the sidebar
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow for the sidebar
    padding: '10px',
    marginLeft: '10px',
    right: '0',
    
  };
  const textStyle = {
    fontSize: '18px',
    lineHeight: '1.5',
    marginBottom: '20px',
    textDecoration: 'none',
  };
  const borderingStyle = {
    borderRadius: '10px',
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '20px',
  }

  return (
    <article className={mode === 'dark' ? 'dark-bg singleBlog' : 'light-bg singleBlog'} style={containerStyle}>
      {/* Main Blog Content */}
      <section >
        {blog && (
          <div className="container">
            <div className="category">{blog.category}</div>
            <div className="writer_section">
              <div className="author">
                <img src={blog.authorAvatar} alt="Author Avatar"/>
                <p>{blog.authorName}</p>
              </div>
            </div>
            <h1 style={{width:"80%",margin:"0 auto",textShadow: "0px 0px 10px rgba(100, 200, 100, 0.8)"}}>{blog.title}</h1>
            <div className="sub-para">
            <p className="intro-text">{blog.intro}</p>
            {blog.mainImage && (
              <img src={blog.mainImage.url} alt="mainImg" className='mainImg' />
            )}
            </div>
            <div className="sub-para">
              <h3>{blog.paraOneTitle}</h3>
              {blog.paraOneImage && <img src={blog.paraOneImage.url} alt="paraOneImage" className='img-update'/>}
              <p>{blog.paraOneDescription}</p>
            </div>
            <div className="sub-para">
              <h3>{blog.paraTwoTitle}</h3>
              {blog.paraTwoImage && <img src={blog.paraTwoImage.url} alt="paraTwoImage" />}
              <p>{blog.paraTwoDescription}</p>
            </div>
            <div className="sub-para">
              <h3>{blog.paraThreeTitle}</h3>
              {blog.paraThreeImage && <img src={blog.paraThreeImage.url} alt="paraThreeImage" />}
              <p>{blog.paraThreeDescription}</p>
            </div>
          </div>
        )}
      </section>
    </article>
  );
};

export default SingleBlog;
