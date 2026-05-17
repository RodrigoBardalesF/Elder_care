import { useState, useEffect } from 'react'
import "./index.css"

function Notes({title, object, items, api, key, setItems}){


const [editVisible, setEditVisible] = useState(false)

function editButton(id){
 setEditVisible(!editVisible)
 console.log(editVisible)

}    

const eraseButton = async (id) => {

const token = localStorage.getItem("token");
if (!token) {
    navigate("/login");
    return;
}

try {
    await fetch(`${api}/${id}`, { method : "DELETE", 
        headers: {
        "Authorization": `Bearer ${token}`,
    }
});
    setItems(prev => prev.filter(item => item.id !== id))
}  catch (error) {console.error(error)} }

const [isVisible, setIsVisible] = useState(false)

const initialObject = {};
object.forEach(campo => {initialObject[campo] = "";})

const [newItem, setNewItem] = useState(initialObject)
//console.log(newItem)

function setVisibility(){
 setIsVisible(!isVisible)
} 

function textChange(event){
    const {name, value} = event.target
    setNewItem(prevValue => ({
        ...prevValue,
        [name] : value
    }))
}

function addItem(){
 setIsVisible(!isVisible)

} 

const submitAuthor = async (event) => {
 event.preventDefault();

const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login");
            return;
        }

const mapValues = Object.values(newItem)
const checkValues = mapValues.some(value => !value || value.trim() === "")

if (checkValues) {
alert("Escribe en todos los campos")
setVisibility()
  return; 
}

try 
{const result = await fetch(api, {
    method: 'POST',
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type" : "application/json"

    },
    body: JSON.stringify(newItem)
})
 const resultInJson = await result.json()
 console.log("Lo que llega del backend es esto: ", resultInJson)
  setItems(prev => [...prev, resultInJson])
  setNewItem({});
  setIsVisible(false); 

} catch (error) {alert("Error con base de datos")}
} 

return(
<div> 
    <h3>{title}</h3>
    <div className='notes-container'>
    {items.map(item =>  (
        <div id = {item.id} key = {item.id} className='note-content'>
            {object.map((campo, index) => 
                (<span id={campo}>  {item[campo]}    </span>)
            )}
            <div className='note-button'>
            <button  onClick={() => editButton(item.id)}>Editar</button>
            <button  onClick={() => eraseButton(item.id)}>Eliminar</button>
            <input type="checkbox" id="myCheckbox"></input> 
            </div>
        </div>
    ))}
    </div>
    {!isVisible ? <button className='add-button' onClick={setVisibility}>+</button> : null}
    {isVisible && (
        <form onSubmit={submitAuthor}>
        <div>
    {object.map(item => (
        <input name= {item} onChange={textChange} type="text" placeholder={item}></input>
    ))}<button type="submit">Listo</button></div> </form>
   
   
    )}
</div>
    )
}

export default Notes