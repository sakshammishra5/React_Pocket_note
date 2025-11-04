import React from 'react'
import "./noteItem.css"

const NoteItem = ({text, date}) => {
  return (
    <div className='note_item_Container'>
      <p className='note_text'>{text}</p>
      <div className='time_container'>
        <p className='time_text'>{date}</p>
      </div>
    </div>
  )
}

export default NoteItem
