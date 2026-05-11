import { useState, useEffect, use } from 'react'
import "./index.css"
import Notes from './Note'

function Home(props){

const [medicine, setMedicine] = useState([])

useEffect(() => {
  fetch("http://localhost:3000/api/medicine")
  .then(res => {return res.json()})
  .then(data => {
    console.log(data)
    setMedicine(data)
   } )}
, [])


//useEffect(() => {
//    const fetchData = async() => {
//        const result = await fetch("http://localhost:3000/api/medicine")
//        const jsonResult = result.json()
//        console.log(jsonResult)
//        setMedicine(jsonResult)
//    }
//    fetchData()
//}, [])

    return(<>
    <div className='container'>
        <Notes
        key = {props.medicine}
        title = "Medicinas"
        object={["medicine", "hour_to_take"]}
        api= "http://localhost:3000/api/medicine"
        items = {medicine}
        />
    <div className='calendar'>
        <p>Dias</p>
    </div>
    <div className='exercises'>
        <h3>Ejercicios</h3>
        <p>Ejercicios</p>
    </div>
    </div>
    <div className='container'>
        <div className='doctor-contacts'>
        <h3>Contacto doctores</h3>
        <p>Contactos doctores</p>
        </div>
        <div className='notes'>
        <h3>Notas</h3>
        <p>Notas</p>
        </div>
    
    </div>
    </>)
}

export default Home