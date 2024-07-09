import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" className="aboutcss" />
        </div>
        <div className="banner">
          {/* <p>Biography</p> */}
          <h3>Who We Are</h3>
          <p>
            Welcome to Perfect Medicare, where we blend the legacy of the illustrious Indus Valley Civilization with modern medical excellence. Established on December 1st, 2003, and formally inaugurated on April 7th, 2008, Perfect Medicare has consistently set new standards in healthcare.

            At Perfect Medicare, our journey is defined by a relentless commitment to quality healthcare. We stand as a beacon of hope and healing, driven by compassion, innovation, and dedication to patient well-being. Our mission is to deliver high-quality medical services to every patient while striving to set new benchmarks in the healthcare industry in India.
          </p>
          <p>We are all in 2024!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
            assumenda exercitationem accusamus sit repellendus quo optio dolorum
            corporis corrupti. Quas similique vel minima veniam tenetur
            obcaecati atque magni suscipit laboriosam! Veniam vitae minus nihil
            cupiditate natus provident. Ex illum quasi pariatur odit nisi
            voluptas illo qui ipsum mollitia. Libero, assumenda?
          </p>
          <p>Lorem ipsum dolor sit amet!</p>
          <p>Coding is fun!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;