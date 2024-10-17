import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../../main'
import toast from 'react-hot-toast'
import { useNavigate , Link, Navigate} from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { mode, isAuthenticate} = useContext(Context);
  const navigateTo = useNavigate();
  const handelLogin = async (e) => {
    e.preventDefault();

    await axios.post("https://yatharth-gyan-backend.onrender.com/api/v1/user/login", { email, password, role },
      { withCredentials: true, headers: { "Content-Type": "application/json" } })
      .then(res => {
        toast.success(res.data.message);
        setEmail('');
        setPassword('');
        setRole('');
        navigateTo('/'); 
        
        window.location.reload();
      })
      .catch((error) =>{
        toast.error(error.response.data.message);
      });
  };

  if(isAuthenticate){
    return <Navigate to='/' />
  }
  return (
    <>
      <article className={mode==="dark" ? "dark-bg" : "light-bg"}>
      <section className="auth-form">
        <form onSubmit={handelLogin}>
          <h1>Login</h1>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="Author">Author</option>
          </select>
          
          <div>
            <input type="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Your Email'/>
                
          </div>
         
          <div>
            <input type="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'/>
                
          </div>
          <button type='submit' className='submit-btn'>Login</button>
        </form>
      </section>
    </article>
    </>

  )
}

export default Login
