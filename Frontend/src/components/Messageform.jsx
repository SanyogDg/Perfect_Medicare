import axios from 'axios';
import React, { useState } from 'react'
import { toast } from "react-toastify";

const Messageform = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage =async (e) => {
    e.preventDefault();
    try {
      await axios.post( "http://localhost:3004/api/v1/message/send",
        { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error in handleMessage:", error);
    }
  }
  return (
    <div className="container form-component message-form">
      <h2>Send Us A Message</h2>
      <form onSubmit={handleMessage}>
        <div>
          <input placeholder='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <input placeholder='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
          <input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input placeholder='Phone' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </div>

        <textarea
            rows={7}
            placeholder="Write Your Message Here.."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button className="sendcss" type="submit">Send</button>
          </div>
      </form>
    </div>
  )
}

export default Messageform