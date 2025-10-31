import { useContext } from 'react'
import GroupItem from '../GroupItem/GroupItem'
import "./Sidebar.css"
import { FaCirclePlus } from "react-icons/fa6";
import { noteContext } from '../../App';

const SideBar = () => {
    const { isModalOpen, setIsModalOpen, notes, allGroup, setAllGroup } = useContext(noteContext);
    function handleClick(_id) {
        console.log("clicked", _id)
    }

    function openForm() {
        setIsModalOpen(prev => !prev)
        console.log("model",isModalOpen)
    }




    return (
        <div className='side_bar'>
            <h1>Pocket notes</h1>
            <div className='noteItem_container'>
                {
                    allGroup.map(group =>
                        <GroupItem
                            key={group.id}
                            groupName={group.groupName}
                            handleClick={handleClick}
                            groupId={group.id}
                            color={group.color}
                        />
                    )
                }

            </div>
            <FaCirclePlus onClick={openForm} className='add_notes' />
        </div>
    )
}

export default SideBar
