import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { RiImageAddFill } from "react-icons/ri";

const CreateBlog = () => {
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

  const mainImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setMainImagePreview(reader.result)
      setMainImage(file)
    };
  }
  const paraOneImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaOneImagePreview(reader.result)
      setParaOneImage(file)
    };
  }
  const paraTwoImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaTwoImagePreview(reader.result)
      setParaTwoImage(file)
    };
  }
  const paraThreeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setParaThreeImagePreview(reader.result)
      setParaThreeImage(file)
    };
  }

  const handelBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category);
    formData.append("title", title);
    formData.append("mainImage", mainImage);
    formData.append("intro", intro);
    formData.append("published", published);
    if (paraOneTitle.length > 0) {
      formData.append("paraOneTitle", paraOneTitle);
    }
    if (paraTwoTitle.length > 0) {
      formData.append("paraTwoTitle", paraTwoTitle);
    }
    if (paraThreeTitle.length > 0) {
      formData.append("paraThreeTitle", paraThreeTitle);
    }
    if (paraOneImage) {
      formData.append("paraOneImage", paraOneImage);
    }
    if (paraTwoImage) {
      formData.append("paraTwoImage", paraTwoImage);
    }
    if (paraThreeImage) {
      formData.append("paraThreeImage", paraThreeImage);
    }
    if (paraOneDescription.length > 0) {
      formData.append("paraOneDescription", paraOneDescription);
    }
    if (paraTwoDescription.length > 0) {
      formData.append("paraTwoDescription", paraTwoDescription);
    }
    if (paraThreeDescription.length > 0) {
      formData.append("paraThreeDescription", paraThreeDescription);
    }

    try {
      const { data } = await axios.post("https://yatharth-gyan-backend.onrender.com/api/v1/blog/post", formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });

      setTitle("");
      setMainImage("");
      setIntro("");
      setCategory("");
      setMainImagePreview("");
      setParaOneImage("");
      setParaOneImagePreview("");
      setParaOneTitle("");
      setParaOneDescription("");
      setParaTwoImage("");
      setParaTwoImagePreview("");
      setParaTwoTitle("");
      setParaTwoDescription("");
      setParaThreeImage("");
      setParaThreeImagePreview("");
      setParaThreeTitle("");
      setParaThreeDescription("");
      setPublished(true);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }


  return (

    <>
      <section className='create-blog'>
        <h3>Create Blog</h3>
        <div className="container">
          <form onSubmit={handelBlog}>
            <div className="category-box">
              <label >Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Blog Category</option>
                <option value="Mythology">Sanatan History</option>
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
              ) : (
                <RiImageAddFill className='mainImg' />
              )}
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
              ) : (
                <RiImageAddFill className='mainImg' />
              )}
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
              ) : (
                <RiImageAddFill className='mainImg' />
              )}
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
              ) : (
                <RiImageAddFill className='mainImg' />
              )}
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
            <button type="submit" className='create-btn'>CREATE BLOG</button>

          </form>
        </div>
      </section>

    </>
  )
}

export default CreateBlog
