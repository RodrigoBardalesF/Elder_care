import { useState, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"  
import Calendar from './Calendar'
import Header from './Header'
import NavBar from './Navbar'
import Home from './Home'

function App() {



  return (
    <>
    <Router>
      <Header/>
      <NavBar/>
      <div>
        <Routes>
          <>
          <Route path = "/" element = {<Home/>}/>
          </>
        </Routes>
  
  </div>
    </Router>
    </>
  )
}

export default App
