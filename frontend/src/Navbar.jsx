import { useState, useEffect } from 'react'
import "./index.css"

function NavBar() {
 return(<>
    <nav className='navbar'>
        <ul className='nav-ul'>
            <li> 
                <p>Página principal</p>
            </li>
            <li>
                <p>Datos</p>
            </li>
               <li>
                <p>Inicio de sesión</p>
            </li>
        </ul>
    </nav>
 </>)
}

export default NavBar