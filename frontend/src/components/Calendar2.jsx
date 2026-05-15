import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar2.css'

function MyCalendar(){
    const[value, setValue] = useState(new Date())

return(<>
    <Calendar onChange={setValue} value={value}/>
    <p>Fecha seleccionada: {value.toLocaleDateString()}</p>
</>)
}

export default MyCalendar