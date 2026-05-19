import { useState, useEffect } from 'react'
import "./index.css"
import Notes from './Note'
import MyCalendar from './components/Calendar2'
import { useNavigate } from 'react-router-dom';

function Home(props){

const navigate = useNavigate()

const [medicine, setMedicine] = useState([])

useEffect(() => { //Trying with old fetch data
  fetch(`${import.meta.env.VITE_API_URL}/api/medicine`)
  .then(res => {return res.json()})
  .then(data => {
    //console.log(data)
    setMedicine(data)
   } )}
, [])

const [exercise, setExercise] = useState([])

useEffect(() => { //Trying with modern fetch data
    const fetchData = async() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login");
            return;
        }

        try 
        {const result = await fetch(`${import.meta.env.VITE_API_URL}/api/exercise`, {
            headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const jsonResult = await result.json()
        //console.log("The results for the json exercises were: ", jsonResult)
        setExercise(jsonResult)} 
        
        catch (error) {
            console.error("Error de red", error)
        }
    }
    fetchData()
}, [])

function useFetchData (url) { //Trying with a function that can be used for different notes so code doesn't repeat itself
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login");
            return;
        }
            try {
                const res = await fetch(url, {
                     headers : {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
                })
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

const {data: contacts, setData : setContacts} = useFetchData(`${import.meta.env.VITE_API_URL}/api/doctor_data`) //This constant gets inside the json with the data 
const {data : notes, setData : setNotes} = useFetchData(`${import.meta.env.VITE_API_URL}/api/notes`)
//console.log("What we see in the contacts array is this:", contacts);
//console.log("What we see in the notes array is this:", notes);



    return(<>
    <div className='container'>

        <div className='medicine-checkup'>
        <Notes
        key = {props.medicine}
        title = "Medicinas"
        object={["medicine", "hour_to_take"]}
        api= {`${import.meta.env.VITE_API_URL}/api/medicine`}
        items = {medicine}
        setItems={setMedicine}
        subtitulos = {["Medicina", "Hora de tomar"]}
        />
         </div>

    <div className='calendar'>
        <MyCalendar/>
    </div>

    <div className="exercises">
        <Notes
        key = {props.id}
        title = "Ejercicios"
        object={["exercise", "time_sets"]}
        api= {`${import.meta.env.VITE_API_URL}/api/exercise`}
        items = {exercise}
        setItems={setExercise}
        subtitulos = {["Ejercicio", "Tiempo por series"]}
        />
    </div>

</div>
    <div className='container'>

        <div className='doctor-contacts'>
         <Notes
        key = {props.id}
        title = "Contacto doctores"
        object={["doctor_name", "doctor_contact"]}
        api= {`${import.meta.env.VITE_API_URL}/api/doctor_data`}
        items = {contacts}
        setItems={setContacts}
        subtitulos = {["Nombre del doctor", "Contacto"]}
        />
        </div>

        <div className='notes'>
       <Notes
        key = {props.id}
        title = "Notas"
        object={["text"]}
        api= {`${import.meta.env.API_URL}/api/notes`}
        items = {notes}
        setItems={setNotes}
        subtitulos = {[""]}
        />
        </div>
 </div>    
    </>)
}

export default Home