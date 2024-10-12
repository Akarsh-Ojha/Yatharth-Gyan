import React, { useEffect,useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyBlog = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlog = async () => {
      const { data } = await axios.get("https://yatharth-gyan-backend.onrender.com/api/v1/blog/myblogs", { withCredentials: true });
      setMyBlogs(data.blogs);
    };
    fetchMyBlog();
  }, []);

  const deleteBlogHandler = async (id) => {
    try {
      const { data } = await axios.delete(`https://yatharth-gyan-backend.onrender.com/api/v1/blog/delete/${id}`, { withCredentials: true });
      toast.success(data.message);
      // This is used to refreshing all other blogs when any one get deleted!
      setMyBlogs(myBlogs.filter((element) => element._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <section className="my-blogs">
      {
        myBlogs && myBlogs.length > 0 ? myBlogs.map((element) => {
          return (
            <div className="author-blog-card" key={element._id}>
              {element.mainImage && (<img src={element.mainImage.url} alt="blogImg" />)}
              <span className='category'>{element.category}</span>
              <h4>{element.title}</h4>
              <div className="btn-wrapper">
                <Link to={`/blog/update/${element._id}`} className="update-btn">UPDATE</Link>
                <button  onClick={()=> deleteBlogHandler(element._id)} className='delete-btn'>DELETE</button>
              </div>
            </div>
          )
        })
        : "You have not Posted any blog yet!"
      }
    </section>
  )
}

export default MyBlog
