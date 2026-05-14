import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.css"

function NavBar() {

const navigate = useNavigate()
const token = localStorage.getItem("token")

const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/", {replace:true})
}

 return(<>
    <nav className='navbar'>
        <ul className='nav-ul'>
            <li>< a href="/"> 
                Página principal</a>
            </li>
            <li>< a href="/datos"> 
                Datos</a>
            </li>
            <li>< a href="/login"> 
                Inicio de Sesión</a>
            </li>
            {token && (<li onClick= {handleLogout}> 
                Cerrar Sesión </li>)}
        </ul>
    </nav>
 </>)
}

export default NavBar