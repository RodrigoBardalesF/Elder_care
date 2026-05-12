import { useState, useEffect, use } from 'react'
import "./index.css"
import Notes from './Note'

function Home(props){

const [medicine, setMedicine] = useState([])

useEffect(() => { //Trying with old fetch data
  fetch("http://localhost:3000/api/medicine")
  .then(res => {return res.json()})
  .then(data => {
    //console.log(data)
    setMedicine(data)
   } )}
, [])

const [exercise, setExercise] = useState([])

useEffect(() => { //Trying with modern fetch data
    const fetchData = async() => {
        const result = await fetch("http://localhost:3000/api/exercise")
        const jsonResult = await result.json()
        //console.log("The results for the json exercises were: ", jsonResult)
        setExercise(jsonResult)
    }
    fetchData()
}, [])

function useFetchData (url) { //Trying with a function that can be used for different notes so code doesn't repeat itself
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } catch (error) {
                console.error(`Error fetching ${url}:`, error)
            }
        }
        fetchData();
    }, [url])
    return { data, setData };
}

const {data: contacts, setData : setContacts} = useFetchData("http://localhost:3000/api/doctor_data") //This constant gets inside the json with the data 
const {data : notes, setData : setNotes} = useFetchData("http://localhost:3000/api/notes")
//console.log("What we see in the contacts array is this:", contacts);
//console.log("What we see in the notes array is this:", notes);



    return(<>
    <div className='container'>
        <Notes
        key = {props.medicine}
        title = "Medicinas"
        object={["medicine", "hour_to_take"]}
        api= "http://localhost:3000/api/medicine"
        items = {medicine}
        setItems={setMedicine}
        />
    <div className='calendar'>
        <p>Dias</p>
    </div>
    <div >
        <Notes
        key = {props.id}
        title = "Ejercicios"
        object={["exercise", "time_sets"]}
        api= "http://localhost:3000/api/exercise"
        items = {exercise}
        setItems={setExercise}
        />
    </div>
    </div>
    <div className='container'>
        <div>
         <Notes
        key = {props.id}
        title = "Contacto doctores"
        object={["doctor_name", "doctor_contact"]}
        api= "http://localhost:3000/api/doctor_data"
        items = {contacts}
        setItems={setContacts}
        />
        </div>
        <div>
       <Notes
        key = {props.id}
        title = "Notas"
        object={["text"]}
        api= "http://localhost:3000/api/notes"
        items = {notes}
        setItems={setNotes}
        />
        </div>
    
    </div>
    </>)
}

export default Home