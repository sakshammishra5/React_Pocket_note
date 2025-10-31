import { useContext, useEffect, useState } from 'react';
import { noteContext } from '../../App';
import './Modal.css';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { saveInLocal } from '../../utils/util';

const Modal = ({ children }) => {
    const { isModalOpen, setIsModalOpen, allGroup, setAllGroup } = useContext(noteContext);
    const [colorArray, setColorArray] = useState(["red", "green", "blue", "yellow"])
    const [selectedColor, setSelectedColor] = useState(null);
    const [groupString, setGroupString] = useState('')

    const handleOverlayClick = (e) => {
        console.log('Overlay clicked', e.target);
        if (e.target.classList.contains('modal-overlay')) {
            setIsModalOpen(false);
        }
    };

  function handleSubmit(event) {
    event.preventDefault();
    if (groupString.trim() && selectedColor) {
        const newGroup = {
            id: uuidv4(),
            color: selectedColor,
            groupName: groupString.trim(),
            notes: []
        };

        setAllGroup(prevGroups => {
            const updatedGroups = [newGroup, ...prevGroups];
            saveInLocal(updatedGroups); // Save correct data
            return updatedGroups;
        });

        // Reset form
        setGroupString('');
        setSelectedColor(null);
        setIsModalOpen(false); // Close modal
    }
}

  


    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
        return () => document.body.classList.remove('modal-open');
    }, [isModalOpen]);

    if (!isModalOpen) return null;
    return (
        <div
            className={clsx('modal-overlay', { 'open-modal': isModalOpen })}
            onClick={handleOverlayClick}
        >

            <div className="modal-content">
                <form onSubmit={handleSubmit}>
                    <p>Create New Group</p>
                    <label htmlFor='groupName'>Group Name</label>
                    <input
                        onChange={(e) => setGroupString(e.target.value)}
                        type="text"
                        id='group_name'
                        placeholder='Enter group Name'
                        value={groupString}
                    /><br />
                    <div className='choose_color'>
                        <label htmlFor="color">Choose color</label>
                        <div className='color_parent' >
                            {
                                colorArray.map((color,index )=>
                                    <div
                                        key={index}
                                        className={`color_div ${selectedColor === color ? 'active' : ""}`}
                                        style={{ backgroundColor: color }}
                                        onClick={() => setSelectedColor(color)}
                                    ></div>
                                )
                            }
                        </div>
                    </div>
                    <button type='submit' id='create_btn'>Create</button>
                </form>
            </div>

        </div>
    );
};

export default Modal;