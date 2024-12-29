import PermissionCheck from "../components/permissionsCheck"
import { FcInfo } from "react-icons/fc";
import {Outlet} from 'react-router'

export default function PermissionPage({togglePermission, isPermissionGranted}) {
    if (!isPermissionGranted){
        return (
        <PermissionCheck toggle={togglePermission}>
        <h1>Atmos</h1>
            <h2>To provide accurate and localized weather updates, may we use your location?</h2>
            <h2>Your information will only be used to enhance your experience with the app</h2>
            <div className="permission-info">
                <FcInfo />
                <h3>How do we use your location?</h3>
                <p>
                    Your location data - specifically your latitude and longditude - are used to 
                    to query the weatherapi to get current and accurate weather information.
                </p>
                <p>
                    No user geolocation data is stored upon leaving the Atmos application. No user geolocation
                    data is shared with any third-party other than querying the weatherapi.
                </p>
            </div>
        </PermissionCheck>
        )
    } else return <Outlet />
    
}