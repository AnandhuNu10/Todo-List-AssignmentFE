import React from 'react'

const Todolist = (props:any) => {

 
    
    return (
        <>
          <div className='todolist'>
          <li>{props.text}</li>
          <button className='btn' onClick={()=>{
            props.onSelect(props.id)
          }}>X</button>
          </div>
        </>
    )
}

export default Todolist
    