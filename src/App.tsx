 import { useState, useEffect } from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router'
// import { fetchWeatherApi } from 'openmeteo'
import PermissionCheck from './components/permissionsCheck.tsx'
import PermissionPage from './pages/PermissionPage.tsx'
import HomePage from './pages/HomePage.tsx'
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
