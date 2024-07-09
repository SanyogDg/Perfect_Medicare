import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard'
import { Login } from './components/Login'
import AddNewDoctor from './components/AddNewDoctor.jsx';
import AddNewAdmin from "./components/AddNewAdmin.jsx"
import { Doctors } from './components/Doctors'
import { Messages } from './components/Messages'
import Sidebar from './components/Sidebar'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Context } from "./main"
import "../src/App.css"

const App = () => {
  const { isAuthenticated, setIsAuthenticated, admin, setAdmin } = useContext(Context);
  
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get("http://localhost:3004/api/v1/user/admin/me", {
        withCredentials:true,
        })
        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    }
    fetchAdmin();
  },[])
  return (
    <>
      <Router>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/doctor/addnew' element={<AddNewDoctor/>} />
          <Route path='/admin/addnew' element={<AddNewAdmin/>} />
          <Route path='/doctors' element={<Doctors/>} />
          <Route path='/messages' element={<Messages/>} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  )
}

export default App