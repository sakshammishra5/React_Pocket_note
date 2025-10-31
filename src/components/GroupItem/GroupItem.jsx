import React, { useContext } from 'react'
import "./note.css"
import { noteContext } from '../../App'

const GroupItem = ({ groupName, handleClick, groupId,color }) => {
  const { selectedGroupId, setSelectedGroupId } = useContext(noteContext);
  
  return (
    <div 
    onClick={() => setSelectedGroupId(groupId)}
     className={`note_Item ${selectedGroupId===groupId?"active":""}`}
     >
      <p style={{backgroundColor:color, color:"white"}} className='note_Item_initials'>SM</p>
      <p className='title'>{groupName}</p>
    </div>
  )
}

export default GroupItem
