import { useState, useEffect } from 'react'
import "./index.css"

function Notes({title, object, items, api, key}){

console.log("What got printed in the child is: ", items)
console.log("What got printed as an object is: ", object);

//function EditButton(){

//}    


//function EraseButton(key){
//    return items.filter((item, index) => {
//            return index != key
//        })
//}  

//function AddItem(){

//} 

return(
<div className='medicine-checkup'> 
    <h3>{title}</h3>
    <div>
    {items.map(item =>  (
        <div className='note-content'>
        <p>{item[object]}</p>
            <p>{item.medicine} {item.hour_to_take}</p>
            <div className='note-buttons'>
            <button >Editar</button>
            <button >Eliminar</button>
            <input type="checkbox" id="myCheckbox"></input> 
            </div>
        </div>
    ))}
    </div>
    <button>+</button>
</div>
    )
}

export default Notes