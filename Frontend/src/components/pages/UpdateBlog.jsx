import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import toast from 'react-hot-toast';
import {useParams} from 'react-router-dom'
import { Context } from '../../main'
import { RiImageAddFill } from "react-icons/ri";
 

const UpdateBlog = () => {
  const {id}= useParams();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [mainImagePreview, setMainImagePreview] = useState("");
  const [intro, setIntro] = useState("");
  const [paraOneTitle, setParaOneTitle] = useState("");
  const [paraTwoTitle, setParaTwoTitle] = useState("");
  const [paraThreeTitle, setParaThreeTitle] = useState("");
  const [paraOneImage, setParaOneImage] = useState("");
  const [paraTwoImage, setParaTwoImage] = useState("");
  const [paraThreeImage, setParaThreeImage] = useState("");
  const [paraOneImagePreview, setParaOneImagePreview] = useState("");
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("");
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("");
  const [paraOneDescription, setParaOneDescription] = useState("");
  const [paraTwoDescription, setParaTwoDescription] = useState("");
  const [paraThreeDescription, setParaThreeDescription] = useState("");
  const [published, setPublished] = useState(true);

  useEffect(()=>{

    const fetchBlog = async ()=>{
      try {
        const {data} = await axios.get(`http://localhost:4000/api/v1/blog/singleblog/${id}`, {withCredentials: true});

        setTitle(data.blog.title);
        setCategory(data.blog.category);
        setIntro(data.blog.intro);
        setPublished(data.blog.published);
        setMainImage(data.blog.mainImage.url);
        setParaOneTitle(data.blog.paraOneTitle);
        setParaTwoTitle(data.blog.paraTwoTitle);
        setParaThreeTitle(data.blog.paraThreeTitle);
        setParaOneDescription(data.blog.paraOneDescription);
        setParaTwoDescription(data.blog.paraTwoDescription);
        setParaThreeDescription(data.blog.paraThreeDescription);

        data.blog.paraOneImage && setParaOneImage(data.blog.paraOneImage.url);
        data.blog.paraTwoImage && setParaTwoImage(data.blog.paraTwoImage.url);
        data.blog.paraThreeImage && setParaThreeImage(data.blog.paraThreeImage.url);


      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchBlog();
  },[id]);

  const handelUpdate = async(e) =>{
      e.preventDefault();
      const updateData = new FormData();
      updateData.append("title", title);
      updateData.append("category", category);
      updateData.append("intro", intro);
      updateData.append("published", published);
      if(paraOneTitle.length > 0){ 
        updateData.append("paraOneTitle", paraOneTitle);
      }
      if(paraOneDescription.length > 0){
        updateData.append("paraOneDescription", paraOneDescription);
      }
      if(paraOneImage){
        updateData.append("paraOneImage", paraOneImage);
      }
      if(paraTwoTitle.length > 0){
        updateData.append("paraTwoTitle", paraTwoTitle);
      }
      if(paraTwoDescription.length > 0){
        updateData.append("paraTwoDescription", paraTwoDescription);
      }
      if(paraTwoImage){
        updateData.append("paraTwoImage", paraTwoImage);
      }
      if(paraThreeTitle.length > 0){
        updateData.append("paraThreeTitle", paraThreeTitle);
      }
      if(paraThreeDescription.length > 0){
        updateData.append("paraThreeDescription", paraThreeDescription);
      }
      if(paraThreeImage){
        updateData.append("paraThreeImage", paraThreeImage);
      }

      try {
        const {data} = await axios.put(`http://localhost:4000/api/v1/blog/update/${id}`, updateData, {withCredentials: true});
        toast.success(data.message);
      }      
      catch (error) {
        toast.error(error.response.data.message);
      }
  };

  const mainImageHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setMainImagePreview(reader.result);
      setMainImage(file);
    }
  };

  const paraOneImageHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{  
      setParaOneImagePreview(reader.result);
      setParaOneImage(file);
    }
  };

  const paraTwoImageHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{ 
      setParaTwoImagePreview(reader.result);
      setParaTwoImage(file);
    }
  };

  const paraThreeImageHandler = (e) =>{
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>{
      setParaThreeImagePreview(reader.result);
      setParaThreeImage(file);
    }
  };

  const {mode} = useContext(Context);

  return (
    <article className={mode==="dark"?"dark-bg":"light-bg"}>
      <section className='update-blog'>
        <h3>UPDATE BLOG</h3>
        <form onSubmit={handelUpdate}>
        <div className="category-box">
              <label >Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Blog Category</option>
                <option value="Mythology">Mythology</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
                <option value="science">Science</option>
                <option value="LifeStyle">LifeStyle</option>
                <option value="technology">Technology</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label >Blog - Main Image</label>
              {mainImagePreview ? (
                <img src={mainImagePreview} alt='mainImage' className="mainImg" />
              ) : mainImage
              ? (
                <img src={mainImage} alt='mainImage' className="mainImg" />)
                : (<RiImageAddFill className='mainImg' />)
              }
              <input
                type="file"
                onChange={mainImageHandler}
                style={{ border: "none" }}

              />
              <textarea placeholder="Blog Intro....." className="intro" rows="25" value={intro}
              onChange={(e) => setIntro(e.target.value)}
             />
            </div>

            <div className="sub-para">
              <input type="text"
                placeholder='Paragraph One Title' 
                value={paraOneTitle}
                onChange={(e)=> setParaOneTitle(e.target.value) }/>
              {paraOneImagePreview ? (
                <img src={paraOneImagePreview} alt='paraImage' className="paraOneImg" />
              ) : paraOneImage
              ? (
                <img src={paraOneImage} alt='paraImage' className="paraOneImg" />)
                : (<RiImageAddFill className='mainImg' />)
              }
              <input
                type="file"
                onChange={paraOneImageHandler}
                style={{ border: "none" }}
              />
              <textarea
                placeholder="Blog First Paragraph comes here....." 
                rows={10}
                value={paraOneDescription}
                onChange={(e) => setParaOneDescription(e.target.value)}
              />
            </div>

            <div className="sub-para">
              <input type="text"
                placeholder='Paragraph Two Title' 
                value={paraTwoTitle}
                onChange={(e)=> setParaTwoTitle(e.target.value) }/>
              {paraTwoImagePreview ? (
                <img src={paraTwoImagePreview} alt='paraImage' className="paraTwoImg" />
              ) : paraTwoImage
              ? (
                <img src={paraTwoImage} alt='paraImage' className="paraTwoImg" />)
                : (<RiImageAddFill className='mainImg' />)
              }
              <input
                type="file"
                onChange={paraTwoImageHandler}
                style={{ border: "none" }}
              />
              <textarea
                placeholder="Blog Second Paragraph comes here....." 
                rows={10}
                value={paraTwoDescription}
                onChange={(e) => setParaTwoDescription(e.target.value)}
              />
            </div>

            <div className="sub-para">
              <input type="text"
                placeholder='Paragraph Three Title' 
                value={paraThreeTitle}
                onChange={(e)=> setParaThreeTitle(e.target.value) }/>
              {paraThreeImagePreview ? (
                <img src={paraThreeImagePreview} alt='paraImage' className="paraThreeImg" />
              ) : paraThreeImage
              ? (
                <img src={paraThreeImage} alt='paraImage' className="paraThreeImg" />)
                : (<RiImageAddFill className='mainImg' />)
              }
              <input
                type="file"
                onChange={paraThreeImageHandler}
                style={{ border: "none" }}
              />
              <textarea
                placeholder="Blog Third Paragraph comes here....." 
                rows={10}
                value={paraThreeDescription}
                onChange={(e) => setParaThreeDescription(e.target.value)}
              />
            </div>
            <div className="publish-box">
              <label > Wants to publish now?</label>
              <select value={published} onChange={(e) => setPublished(e.target.value)}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
            <button onClick={handelUpdate} className='update-btn'>Update BLOG</button>
        </form>
      </section>
    </article>
  )
}

export default UpdateBlog
