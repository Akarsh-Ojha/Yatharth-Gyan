import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { BeatLoader } from "react-spinners";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const { blogs } = useContext(Context);
  const [hoveredIndex, setHoveredIndex] = useState(null);


  return (
    <section className="hero">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 3).map((element, index) => {
          return (
            <Link to={`/blog/${element._id}`} className="card" key={element._id} onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={element.mainImage.url} alt="blog" className="blogImg absolute" />
              {hoveredIndex != index &&
                <div>
                <h1 className="glow">{element.title}</h1>
                <div className="writer_section">
                  <div className="author">
                    <img src={element.authorAvatar} alt="author_avatar" />
                    <p>{element.authorName}</p>
                  </div>
                </div>
              </div>}
              
            </Link>
          );
        })
      ) : (
        <BeatLoader color="gray" size={30} />
      )}
    </section>
  );
};

export default HeroSection;
