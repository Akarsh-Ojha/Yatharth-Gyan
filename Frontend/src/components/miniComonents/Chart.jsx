import React, { useEffect, useState } from 'react'
import {Chart as ChartJS,CategoryScale,
        LinearScale,PointElement,LineElement,Title,Tooltip,Legend,ArcElement } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';


ChartJS.register(CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend,ArcElement);


const Chart = () => {
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlog = async () => {
      const { data } = await axios.get("https://yatharth-gyan-backend.onrender.com/api/v1/blog/myblogs", { withCredentials: true });
      setMyBlogs(data.blogs);
    };
    fetchMyBlog();
  }, []); 

  const publishedBlog = myBlogs && myBlogs.filter((item)=> item.published === true);
  const notPublishedBlog = myBlogs && myBlogs.filter((item)=> item.published === false);

  const data = {
    labels: ["Published", "Not Published"],
    datasets: [
      {
        label: "Blogs",
        data:[publishedBlog.length > 0 ? publishedBlog.length : 0, 
              notPublishedBlog.length > 0 ? notPublishedBlog.length : 0],
        borderColor: ["0e7490", "#facc15"],
        backgroundColor: ["#0e7490", "#facc15"],
        borderWidth: 1,
      }

    ]
  }

  return (
    <section className='chart-container' style={{height: "90vh"}}>
      <h3>BLOG ANALYTICS</h3>
      <Doughnut data={data} style={ {height:"550px"} }/>
    </section>
  )
}

export default Chart
