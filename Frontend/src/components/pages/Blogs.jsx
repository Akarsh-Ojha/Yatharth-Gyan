
import React, { useContext } from 'react'
import { Context } from '../../main'
import LatestBlog from '../miniComonents/LatestBlog'

const Blogs = () => {
  const {mode, blogs} = useContext(Context)
  return (
    <article className={mode==="dark"?"dark-bg":"light-bg"}>
      <LatestBlog blogs={blogs} title={"Latest Blog"}/>
    </article>
  )
}

export default Blogs
