import React from 'react'
import SideBar from '../SideBar/SideBar'
import MainContent from '../MainContent/MainContent'
import "./Dashboard.css"

const Dashboard = () => {
    return (
        <>
            <div className='dashboard_container'>
                <SideBar />
                <MainContent />
            </div>
        </>
    )
}

export default Dashboard
