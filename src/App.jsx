 import { useState } from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router'
// import { fetchWeatherApi } from 'openmeteo'
import PermissionCheck from './components/permissionsCheck.jsx'
import PermissionPage from './pages/PermissionPage.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'
// IPGEO

function App() {
  // const [count, setCount] = useState(0)
  const [isPermissionGranted, setIsPermissionGranted] = useState(null)

  function togglePermissionGranted(toggleBool) {
    setIsPermissionGranted(toggleBool)
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<PermissionPage isPermissionGranted={isPermissionGranted} togglePermission={togglePermissionGranted}/>}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
