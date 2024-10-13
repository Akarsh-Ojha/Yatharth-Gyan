import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../../main'
import { BeatLoader } from 'react-spinners'
import axios from 'axios'


const Author = () => {
  const { mode } = useContext(Context)
  const [author, setAuthor] = useState('')

  useEffect(() => {
    const fetchAuthor = async () => {
      const { data } = await axios.get('https://yatharth-gyan-backend.onrender.com/api/v1/user/authors', { withCredentials: true });

      setAuthor(data.authors);
    }
    fetchAuthor();

  }, []);
  return (
    <article className={mode === "dark" ? "dark-bg all-authors" : "light-bg all-authors"}>
<h2>All Authors</h2>
<div className="container">
  {
    author && author.length > 0 ? (author.map(element =>{
return(
  <div className="card" key={element._id} style={{backgroundColor: "#059674", borderRadius:"20px"}} onMouseOver={(e)=>{e.target.style.background="#facc15"}} onMouseOut={(e)=>{e.target.style.background="#059674"}}>
    <img src={element.avatar.url} alt="Author Avatar" style={{borderRadius: "50%"}}/>
    <h3>{element.name}</h3>
    <p style={{color: "#2e0202"}}>{element.role}</p>
  </div>
)
    })) : (<BeatLoader size={50} color="gray" style={{padding: "200px 0"}} />)
  }
</div>
    </article>
  )
}

export default Author
