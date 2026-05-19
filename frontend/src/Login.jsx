import { useState } from 'react'
import "./index.css"

function Login () {

const [user, setUser] = useState({
    username: "",
    password: ""
})


function readText (event) {
event.preventDefault()
   const {name, value} = event.target
   setUser(prevValues => ({
    ...prevValues, 
    [name] : value
 }))
console.log(user);
}


const checkUser = async (e) => {
    e.preventDefault()
   const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
    method: "POST",
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify({username: user.username, password: user.password})
   })
   if (res.ok) {
    const {token} = await res.json()
    console.log(token)
    localStorage.setItem("token", token)
    localStorage.setItem("userId", user.id)
    window.location.href = "/"
   } else {
    alert("Credenciales incorrectas")
   }
}


return(<>
<div className='body-login'>
<div className='wrapper'>
    <form className= "login-form" onSubmit={checkUser}>
        <h2>Inicio de sesión</h2>
    <div className='input-box'>
        <input type="text" name="username" onChange={readText} placeholder='Ingresa usuario'></input>
    </div>
    <div className='input-box'>
        <input type="text" name="password" onChange={readText} placeholder='Ingresa contraseña'></input>
    </div>
        <button type= "Submit" className='btn'>Iniciar sesión</button>
    </form>
</div>

</div>
</>)
}

export default Login