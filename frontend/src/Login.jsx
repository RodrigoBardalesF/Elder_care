import { useState, useEffect, use } from 'react'
import "./index.css"

function Login () {

const checkUser = async () => {
    console.log("Hello")
}

return(<>
    <form onSubmit={checkUser}>
        <input type="text" placeholder='Ingresa usuario'></input>
        <input type="text" placeholder='Ingresa contraseña'></input>
        <button></button>
    </form>
</>)
}

export default Login