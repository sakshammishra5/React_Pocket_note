import React, { useContext } from 'react'
import SideBar from '../SideBar/SideBar'
import MainContent from '../MainContent/MainContent'
import Modal from '../Modal/Modal'
import "./Dashboard.css"
import { noteContext } from '../../App'

const Dashboard = () => {
    const { selectedGroupId } = useContext(noteContext);
    
    return (
        <>
            <div className='dashboard_container'>
                {/* On mobile: show SideBar when no group selected, MainContent when group selected */}
                <div className={`sidebar-wrapper ${selectedGroupId ? 'hidden-mobile' : ''}`}>
                    <SideBar />
                </div>
                <div className={`maincontent-wrapper ${!selectedGroupId ? 'hidden-mobile' : ''}`}>
                    <MainContent />
                </div>
            </div>
            {/* Modal rendered at Dashboard level so it's always accessible */}
            <Modal />
        </>
    )
}

export default Dashboard
