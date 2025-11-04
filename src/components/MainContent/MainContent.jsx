import { useContext, useState, useEffect } from 'react';
import './MainContent.css';
import { noteContext } from '../../App';
import NoteItem from '../NoteItem/NoteItem';
import { IoSendSharp } from 'react-icons/io5';
import { IoArrowBack } from 'react-icons/io5';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-and-time';
import { saveInLocal } from '../../utils/util';


const MainContent = () => {
  const { selectedGroupId, allGroup, setAllGroup, setSelectedGroupId } = useContext(noteContext);
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

  // Get initials for group (first 2 letters)
  const getInitials = (name) => {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

function addNote(selectedGroupId, note) {
  setAllGroup(prevGroups => {
    const updatedGroups = prevGroups.map(group =>
      group.id === selectedGroupId
        ? { ...group, notes: [note, ...(group.notes || [])] }
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
      date: format(new Date(), 'D MMM YYYY • hh:mm A')
    };

    addNote(selectedGroupId, newNote);
    setNoteText(''); // Clear textarea
  }
};

  const handleBackClick = () => {
    setSelectedGroupId(null);
  };

  // Fallback UI when no group is selected (shown on desktop, hidden on mobile by Dashboard CSS)
  if (!selectedGroupId || !selectedGroup) {
    return (
      <div className="mainContent_Empty">
        <div>
          <img src="bg.png" alt="" />
          <p>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mainContent">
      <div className="group_meta_data">
        <div className="meta_wrapper">
          <button className="back_button" onClick={handleBackClick} aria-label="Go back">
            <IoArrowBack />
          </button>
          <div className="group_meta_data_initials" style={{ backgroundColor: selectedGroup.color }}>
            {getInitials(selectedGroup.groupName)}
          </div>
          <div className="group_name_text">{selectedGroup.groupName}</div>
        </div>
      </div>
      {/* Render notes for the selected group */}
      <div className='noteItem_wrapper'>
        {selectedGroup.notes && selectedGroup.notes.length > 0 ? (
          selectedGroup.notes.map((note) => (
            <NoteItem
              key={note.id}
              text={note.text}
              date={note.date} />
          ))
        ) : (
          <div className="empty_notes_state">
            {/* Empty state - notes will appear here */}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="note_input_form">
        <textarea
          className="editor"
          placeholder="Enter your text here..........."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={1}
        />
        <button type="submit" className="add_notes_btn">
          <IoSendSharp />
        </button>
      </form>
    </div>
  );
};

export default MainContent;