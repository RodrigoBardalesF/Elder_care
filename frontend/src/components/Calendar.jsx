import { useState, useEffect } from 'react'


function Calendar(){

const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
const [currentYear, setCurrentYear] = useState(new Date().getFullYear())


return(
    <>
    <h2>Hello</h2>


    </>
  )
}

export default Calendar
