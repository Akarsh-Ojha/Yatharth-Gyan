import React, { useContext } from 'react';
import { Context } from '../../main';
import HeroSection from '../miniComonents/HeroSection.jsx';
import TrendingBlogs from '../miniComonents/TrendingBlogs.jsx';
import LatestBlog from '../miniComonents/LatestBlog.jsx';
import PopularAuthor from '../miniComonents/PopularAuthor.jsx' ;

const Home = () => {
    const  {mode,blogs} = useContext(Context);
    const filterBlogs =  blogs.slice(0,4);

    return (
        <article className={mode==="dark"?"dark-bg":"light-bg"}>
            <HeroSection />
            <TrendingBlogs />
            <LatestBlog blogs={filterBlogs} heading={"Latest Blog"}/>
            <PopularAuthor/>
        </article>
    )
}

export default Home
