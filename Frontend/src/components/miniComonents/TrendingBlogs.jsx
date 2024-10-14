import React, { useContext, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const TrendingBlogs = () => {

  const { blogs } = useContext(Context);
  const [hoverIndex, setHoverIndex] = useState(null);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToSlide: 1
    },
    desktop: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  return (
    <div className="trending">
      <h3>Trending</h3>
      <Carousel responsive={responsive}>
        {
          blogs && blogs.length > 0 ?
            (blogs.slice(0, 4).map((element, index) => {
              return (
                <Link to={`/blog/${element._id}`} className="card" key={element._id} onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>
                  <img src={element.mainImage.url} alt="blog" className="blogImg" />
                  {
                    hoverIndex != index &&
                    <div>
                      <span className="category">{element.category}</span>
                      <h4 className='glow'>{element.title}</h4>
                      <div className="writer_section">
                        <div className="author">
                          <img src={element.authorAvatar} alt="Author Avatar" className="img-shadow" />
                          <p>{element.authorName}</p>
                        </div>
                      </div>
                    </div>
            }
                </Link>
              )
            }
            )
            )
            : (
              <BeatLoader size={30} color="gray" />
            )
        }
      </Carousel>
    </div>
  )
}

export default TrendingBlogs;
