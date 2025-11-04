import { createContext, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router';
import Dashboard from './components/Dashboard/Dashboard';
import "./App.css"

export const noteContext = createContext(null);
const App = () => {
  const [allGroup,setAllGroup]=useState(JSON.parse(localStorage.getItem("allGroup"))||[])
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [isModalOpen,setIsModalOpen]=useState(false);
  const noteContextObj={
    isModalOpen,
    setIsModalOpen,
    allGroup,
    setAllGroup,
   selectedGroupId, setSelectedGroupId
  }
  

  return (
    <>
      <noteContext.Provider value={noteContextObj}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </noteContext.Provider>
    </>
  )
}

export default App
