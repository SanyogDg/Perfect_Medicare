import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | Perfect Medicare Ltd."}
        imageUrl={"/ABOUTx.png"}
      />
      <Biography imageUrl={"/xabout.jpg"} />
    </>
  );
};

export default AboutUs;