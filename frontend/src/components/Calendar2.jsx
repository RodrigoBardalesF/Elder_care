import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar2.css'

function MyCalendar(){
    const[value, setValue] = useState(new Date())

    const myEvents = [
  {
    title: 'Meeting',
    start: new Date(2026, 4, 17, 10, 0), // Year, Month (0-indexed), Day, Hour, Minute
    end: new Date(2026, 4, 17, 11, 0),
  },
];

return(<>
    <Calendar 
    onChange={setValue} value={value}
    events = {myEvents}
    startAccessor = "start"
    endAccessir = "end"
    />
    <p>Fecha seleccionada: {value.toLocaleDateString()}</p>
</>)
}

export default MyCalendar