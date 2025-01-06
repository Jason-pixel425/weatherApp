 import { useState } from 'react'
 import { BrowserRouter, Routes, Route } from 'react-router'
import PermissionPage from './pages/PermissionPage.jsx'
import HomePage from './pages/HomePage.jsx'
import './App.css'

function App() {
  const [isPermissionGranted, setIsPermissionGranted] = useState(null)

  function togglePermissionGranted(toggleBool) {
    setIsPermissionGranted(toggleBool)
  }

  return (
        <BrowserRouter>
          <Routes>
            <Route
              element={<PermissionPage isPermissionGranted={isPermissionGranted} togglePermission={togglePermissionGranted} />}
            >
              <Route path="/" element={<HomePage isPermissionGranted={isPermissionGranted} />} />
            </Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App
