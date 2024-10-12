import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const LatestBlog = ({ heading, newClass, blogs }) => {

  
  return (
    <section className={newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs"}>
      <h3 style={{marginBottom:"10px"}}>{heading}</h3>
      <div className="container">
        {
          blogs && blogs.map(element => {

            return (
              <Link to={`/blog/${element._id}`} className="card" key={element._id}>
                <img src={element.mainImage.url} alt="mainImg" />
                <span className='category'>{element.category}</span>
                <h4 >{element.title}</h4>
                <div className="writer_section">
                  <div className="author">
                  <img src={element.authorAvatar} alt="Author Avatar" className='img-shadow'/>
                    <p  >{element.authorName}</p>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}

export default LatestBlog
