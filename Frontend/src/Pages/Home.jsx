import React from 'react'
import Hero from "../components/Hero"
import Departments from "../components/Departments"
import Biography from "../components/Biography"
import Messageform from "../components/Messageform"



const Home = () => {
  return (
    <>
      <Hero title={`Welcome to PERFECT MEDICARE...<br /> Where Miracle is Normal`} imageUrl={"/hero.png"} />
      <Biography imageUrl={"./xabout.jpg"}/>
      <Departments />
      <Messageform/>
    </>
  )
}

export default Home