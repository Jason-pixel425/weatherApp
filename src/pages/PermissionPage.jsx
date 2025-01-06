import { useState } from 'react'
import PermissionCheck from "../components/permissionsCheck"
import { FcInfo } from "react-icons/fc";
import { FaAngleDown } from "react-icons/fa6";
import { Outlet } from 'react-router'
import '../styles/PermissionPage.css'


export default function PermissionPage({togglePermission, isPermissionGranted}) {
    const [descriptionToggle, setDescriptionToggle] = useState(false)

    function toggleDescription(){
        setDescriptionToggle(prevState => !prevState)
    }
    if (isPermissionGranted === null){
        return (
        <PermissionCheck toggle={togglePermission}>
        <h1>Atmos</h1>
            <div className="inner-permission-container">
                <h2>To provide accurate and localized weather updates, may we use your location?</h2>
                <h2>Your information will only be used to enhance your experience with the app</h2>
                <div className="permission-info">
                    <div className="inline-permission-question" onClick={toggleDescription}>
                        <FcInfo />
                        <h3>How do we use your location?</h3>
                        <FaAngleDown  />
                    </div>
                    <div className="description-container" style={{display: descriptionToggle ? 'block' : 'none'}}>
                        <p>
                            Your location data - specifically your latitude and longditude - are used to 
                            to query the weatherapi to get current and accurate weather information.
                        </p>
                        <p>
                            No user geolocation data is stored upon leaving the Atmos application. No user geolocation
                            data is shared with any third-party other than querying the weatherapi.
                        </p>
                    </div>
                </div>
            </div>
        </PermissionCheck>
        )
    }   else return <Outlet />
    
}