import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const PopularAuthor = () => {
  const [authors, setAuthors] = useState([])
  const navigate = useNavigate();
  useEffect(()=>{
    const fetchUser = async()=>{
      const {data} = await axios.get("http://localhost:4000/api/v1/user/authors",{withCredentials:true});
      setAuthors(data.authors);
      // console.log(data.authors);
    }
    fetchUser();
  },[authors]);

  return (
    <section className='popularAuthors'>
      <h3>Popular Authors</h3>
      <div className="container">
        {
          authors && authors.length > 0 ? (
            authors.slice(0, 4).map((element) => {
              return(
                <div className="card" key={element._id}>
                  <img src={element.avatar.url} alt="author"  className='img-shadow' onClick={() => window.location.href = "/authors"}/>
                  <p>{element.name}</p>
                  <p>{element.role}</p>
                </div>
              )
              })
          )
          : (
            <BeatLoader size={30} color="gray"/>
          )
        }
      </div>
    </section>
  )
}

export default PopularAuthor
