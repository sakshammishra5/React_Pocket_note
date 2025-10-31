import { useContext, useState, useEffect } from 'react';
import './MainContent.css';
import { noteContext } from '../../App';
import NoteItem from '../NoteItem/NoteItem';
import Modal from '../Modal/Modal';
import { IoSendSharp } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-and-time';
import { saveInLocal } from '../../utils/util';


const MainContent = () => {
  const { selectedGroupId, allGroup, setAllGroup } = useContext(noteContext);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [noteText, setNoteText] = useState(''); // State for textarea

  // Update selectedGroup when selectedGroupId or allGroup changes
  useEffect(() => {
    if (selectedGroupId && allGroup) {
      const group = allGroup.find(group => group.id === selectedGroupId);
      setSelectedGroup(group || null);
    } else {
      setSelectedGroup(null);
    }
  }, [selectedGroupId, allGroup]);




function addNote(selectedGroupId, note) {
  setAllGroup(prevGroups => {
    const updatedGroups = prevGroups.map(group =>
      group.id === selectedGroupId
        ? { ...group, notes: [note, ...group.notes] }
        : group
    );

    // Save the UPDATED state to localStorage
    saveInLocal(updatedGroups);

    return updatedGroups;
  });
}

  // Handle form submission to add a new note
const handleSubmit = (event) => {
  event.preventDefault();
  if (noteText.trim() && selectedGroup) {
    const newNote = {
      id: uuidv4(),
      text: noteText,
      date: format(new Date(), 'MMM DD YYYY hh:mm A') // Added AM/PM for clarity
    };

    addNote(selectedGroupId, newNote);
    setNoteText(''); // Clear textarea
  }
};
  // Fallback UI when no group is selected
  if (!selectedGroupId || !selectedGroup) {
    return (
      <div className="mainContent_Empty">
        <div>
          <img src="bg.png" alt="" />
          <p>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
          <Modal />
        </div>
      </div>
    );
  }

  return (
    <div className="mainContent">
      <div className="group_meta_data">
        <div className="meta_wrapper">
          <div className="group_meta_data_initials" style={{ backgroundColor: selectedGroup.color }}>
            {selectedGroup.groupName?.charAt(0).toUpperCase()}
          </div>
          <div>{selectedGroup.groupName}</div>
        </div>
      </div>
      {/* Render notes for the selected group */}
      <div className='noteItem_wrapper'>
        {selectedGroup.notes?.map((note) => (
          <NoteItem
            key={note.id}
            text={note.text}
            date={note.date} />
        ))}
      </div>
      <Modal /> {/* Add props/state to control Modal visibility if needed */}
      <form onSubmit={handleSubmit}>
        <textarea
          className="editor"
          placeholder="Enter your text here!"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        <button type="submit" className="add_notes_btn">
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
};

export default MainContent;