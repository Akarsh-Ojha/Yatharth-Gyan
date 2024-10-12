import React, { useContext } from 'react'
import { Context } from '../../main'
const About = () => {
  const { mode } = useContext(Context);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>

      <div className="container">
        <h1>About</h1>
        <p><span>
          Yatharth Gyan is an organization that combines the knowledge of Sanatan culture with modern technology. Its aim is to enhance understanding across various fields, such as Sanatan history, technology, lifestyle, health, and more.

          This organization offers a holistic approach to learning and personal development by integrating traditional wisdom with contemporary insights. Are you interested in exploring a specific aspect of this combination or learning about its activities?
        </span><br/>
        </p>
        <p>Yatharth Gyan is managed by a passionate team of officials who are dedicated to preserving and promoting the rich heritage of Sanatan Dharma. Through a blend of traditional teachings and modern insights, we aim to provide valuable resources for those seeking to deepen their understanding of this ancient wisdom.</p>
        <p>Our website offers a wealth of information, including articles, videos, and courses that explore various aspects of Sanatan culture, philosophy, and practices. Whether you are interested in historical context, spiritual teachings, or practical applications in daily life, our content is designed to cater to a diverse audience.</p>

        <p>We also host workshops, seminars, and discussions that encourage community engagement and knowledge sharing. Join us on this journey of exploration and enlightenment as we bridge the gap between the timeless wisdom of Sanatan Dharma and the innovations of modern technology. Feel free to visit our website to discover more and connect with like-minded individuals!</p>
      </div>


    </article>
  )
}

export default About
