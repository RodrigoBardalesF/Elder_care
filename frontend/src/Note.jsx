import { useState, useEffect } from 'react'
import "./index.css"

function Notes({title, object, items, api, key, setItems}){

//console.log("What got printed in the child is: ", items)
//console.log("What got printed as an object is: ", object);

//const [editVisible, setEditVisible] = useState(null)


function EditButton(){
 console.log("Hola")
}    

const eraseButton = async (id) => {
    try {
    await fetch(`${api}/${id}`, { method : "DELETE"});
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
 const result = await fetch(api, {
    method: 'POST',
    headers: {
        "Content-Type" : "application/json"
    },
    body: JSON.stringify(newItem)
})
 const resultInJson = await result.json()
 console.log("Lo que llega del backend es esto: ", resultInJson)
  setItems(prev => [...prev, resultInJson])
  setNewItem({});
  setIsVisible(false);
} 

return(
<div> 
    <h3>{title}</h3>
    <div>
    {items.map(item =>  (
        <div id = {item.id} key = {item.id} className='note-content'>
            {object.map(campo => 
                (<span id={campo}>{item[campo]}    </span>)
            )}
            <div className='note-button'>
            <button >Editar</button>
            <button onClick={() => eraseButton(item.id)}>Eliminar</button>
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