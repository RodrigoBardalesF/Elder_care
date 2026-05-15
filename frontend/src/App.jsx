import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"  
import Calendar from './components/Calendar'
import Header from './Header'
import NavBar from './Navbar'
import Home from './Home'
import Login from './Login' 
import PrivateRoute from './ProtectedRoutes'

function App() {
  return (
    <>
    <Router>
      <Header/>
      <NavBar/>
      <div>
        <Routes>
          <>
          <Route path = "/" element = {<PrivateRoute><Home/></PrivateRoute>}/>
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/datos" element = {<PrivateRoute><Calendar/></PrivateRoute>}/>
          </>
        </Routes>
  
  </div>
    </Router>
    </>
  )
}

export default App
