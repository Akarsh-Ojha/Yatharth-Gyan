import React, { useContext } from 'react'
import { Context } from '../../main'

const MyProfile = () => {
  const {user } = useContext(Context);
  return (
    <section className='profile'>
      <div className="avatar">
        <img src={user && user?.avatar?.url} alt="" />
      </div>
      <div className="user-detail">
        <p>Name:- <span>{user && user?.name}</span></p>
        <p>Email:- <span>{user && user?.email}</span></p>
        <p>Phone:- <span>{user && user?.phone}</span></p>
        <p>Role:- <span>{user && user?.role}</span></p>
      </div>
      
    </section>
  )
}

export default MyProfile
