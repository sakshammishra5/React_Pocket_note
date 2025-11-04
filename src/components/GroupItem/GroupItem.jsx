import React, { useContext } from 'react'
import "./note.css"
import { noteContext } from '../../App'

const GroupItem = ({ groupName, handleClick, groupId, color }) => {
  const { selectedGroupId, setSelectedGroupId } = useContext(noteContext);
  
  // Get first 2 letters of group name for initials
  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  
  return (
    <div 
      onClick={() => setSelectedGroupId(groupId)}
      className={`note_Item ${selectedGroupId===groupId?"active":""}`}
    >
      <div 
        style={{backgroundColor: color, color: "white"}} 
        className='note_Item_initials'
      >
        {getInitials(groupName)}
      </div>
      <p className='title'>{groupName}</p>
    </div>
  )
}

export default GroupItem
