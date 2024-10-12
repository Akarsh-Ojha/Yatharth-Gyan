import React, { useContext, useState } from 'react'
import { Context } from '../../main'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast' 

const Register = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [education, setEducation] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("")

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setAvatarPreview(reader.result)
        setAvatar(file)
    };
  }

  const { mode, isAuthenticated} = useContext(Context);

  const navigate = useNavigate();

  const handelRegister= async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("role", role);
    formData.append("password", password);
    formData.append("education", education);
    formData.append("avatar", avatar);

    try {
      const {data} = await axios.post("http://localhost:4000/api/v1/user/register", 
      formData, {withCredentials: true, headers: {"Content-Type": "multipart/form-data"}},);
      toast.success(data.message);
      setName("");
      setPhone("");
      setEmail("");
      setRole("");
      setPassword("");
      setEducation("");
      setAvatar("");
      setAvatarPreview("");

      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthenticated){
    return <Navigate to="/" />
  }
  return (
    <article className={mode==="dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handelRegister}>
          <h1>Register</h1>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Author">Author</option>
            <option value="Reader">Reader</option>
          </select>
          <div>
            <input type="text"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder='Your Name'/>

          </div>
          <div>
            <input type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'/>
                
          </div>
          <div>
            <input type="number"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Phone Number'/>
                
          </div>
          <div>
            <input type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'/>
                
          </div>
          <select
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="">Select Education</option>
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PHD">PHD</option>
          </select>
          <div style={{display: "flex",flexDirection: "row", alignItems: "center"}}>
            <div className="avatar">
              <img src={avatarPreview ? `${avatarPreview}` : ""} alt="avatar" />
            </div>
            <input type="file" onChange={avatarHandler}  className='avatar_input_tag' style={{border: "none"}}/>

          </div>
          <p>Already Registered? <Link to="/login">Login now</Link></p>
          <button type='submit' className='submit-btn'>Register</button>
        </form>
      </section>
    </article>
  )
}

export default Register
