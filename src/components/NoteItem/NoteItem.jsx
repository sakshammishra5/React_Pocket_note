import React from 'react'
import "./noteItem.css"

const NoteItem = ({text,date}) => {
  return (
    <div className='note_item_Container'>
      <p>{text}
      </p>
      <div className='time_container'>
       <p>{date}</p>
       {/* <p>9 march 2023 </p>  */}
      </div>
    </div>
  )
}

export default NoteItem
