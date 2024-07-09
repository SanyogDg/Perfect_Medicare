import React from 'react'
import Appointmentform from '../components/Appointmentform'
import Hero from '../components/Hero'

const Appointment = () => {
  return (
    <>
      <Hero title={"Schedule  Your Apponitment with Us!"} imageUrl={"/appointment.png"}/>
      <Appointmentform/>
    </>
  )
}

export default Appointment