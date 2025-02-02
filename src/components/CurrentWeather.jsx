import { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../pages/HomePage'
import WeatherCard from './WeatherCard'
import styles from '../styles/currentWeather.module.css'
import WeatherCurrentForecast from './WeatherCurrentForecast'
import Clock from './Clock'
import SearchBar from './Searchbar'
import ForecastWeather from './ForecastWeather'
// import Lightning from '../styles/images/Lightning.jpg';
// import Cloudy from '../styles/images/Cloudy.jpg';
// import Rain from '../styles/images/Rain.jpg';
// import Night from '../styles/images/night.jpg';
// import SunnyDay from '../styles/images/sunnyDay.jpg';
// import partlyCloudy from '../styles/images/partlycloudy.jpg'

export default function CurrentWeather({}) {
    const [backgroundGradient, setBackgroundGradient] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)
    const { weatherCurrentData, geolocationData, weatherForecastData, handleSearch } = useContext(WeatherContext)
    const weatherDataCurrent = weatherCurrentData.weatherCur
    const weatherDataDay = weatherCurrentData.weatherCurrForecast

    useEffect(() => {
        if (!weatherCurrentData?.weatherCur) return;

        const weatherConditionString = weatherCurrentData.weatherCur.condition.text.toLowerCase();
      
        let newGradient;

        if (weatherConditionString.includes('thunder')) {
            newGradient = 'linear-gradient(to left, #232526, #414345)'; // Dark stormy colors
        } else if (weatherConditionString.includes('partly cloudy')) {
            newGradient = 'linear-gradient(to right, #e6dada, #274046)'; // Cloudy grey
        } else if (weatherConditionString.includes('cloudy') || weatherConditionString.includes('overcast')) {
            newGradient = 'linear-gradient(to right, #606c88, #3f4c6b);';
        } else if (weatherConditionString.includes('rain')) {
            newGradient = 'linear-gradient(135deg, #00c6fb 0%, #005bea 100%)'; // Rainy blues
        } else if (weatherConditionString.includes('clear')) {
            newGradient = 'linear-gradient(to left, #616161, #9bc5c3)'; 
        } else {
            newGradient = 'linear-gradient(to right, #f0c27b, #4b1248)'; // Default sunny colors
        }

        setBackgroundGradient(newGradient);
    }, [weatherCurrentData]);

    useEffect(() => {
        if (backgroundGradient) {
            document.body.style.background = backgroundGradient;
        }
    }, [backgroundGradient]);
    return (
        <>
            <div className={styles["inline"]}>
                <p className={styles["current-temperature"]}>{weatherDataCurrent.temp_c}°</p>
                <div className={styles["location-time"]}>
                    <h2 className={styles["location-city"]}>{geolocationData.name}</h2>
                    <Clock />
                </div>
                <img src={weatherDataCurrent.condition.icon} alt={weatherCurrentData.condition} />
                
            </div>
            
        <section className={styles["current-weather-container"]}>
            <WeatherCurrentForecast forecastDay={weatherDataDay} />

            <SearchBar handleSearch={handleSearch} labelText='Search for location' id="Search-location-input"/>

            <div>
                <h3 className={styles['weather-details-title']}>Weather Details...</h3>
                <p className={styles['weather-detail-condition-text']}>{weatherDataCurrent.condition.text}</p>
            </div>

            <div className={styles["weather-day-information-container"]}>
                <WeatherCard valueName="Chance of Rain" value={`${weatherDataDay.day.daily_chance_of_rain}%`} >
                    <svg width="18" height="24" viewBox="0 0 18 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16 16.3638C16 19.1811 13.1867 22 9 22C4.81327 22 2 19.1811 2 16.3638C2 13.4416 3.9006 9.8024 6.13452 6.6343C7.1442 5.20239 8.15754 3.95509 8.94997 3.03368C9.75748 4.02709 10.8053 5.37938 11.8493 6.90552C12.9378 8.49674 13.9966 10.2398 14.7767 11.9363C15.5711 13.6638 16 15.1806 16 16.3638ZM0 16.3638C0 10.927 5.13123 4.37097 7.64477 1.48563C8.4601 0.549704 9 0 9 0C9 0 9.51723 0.571768 10.3037 1.52955C12.7979 4.56699 18 11.4867 18 16.3638C18 20.5812 13.9706 24 9 24C4.02944 24 0 20.5812 0 16.3638ZM4.49834 13H6.64991C6.24509 13.9239 6 14.8001 6 15.5455C6 16.6901 7.11963 18 9 18V20C6.23858 20 4 18.0057 4 15.5455C4 14.7246 4.191 13.86 4.49834 13Z" fill="white"/>
                    </svg>
                </WeatherCard>
                <WeatherCard valueName="Heat index" value={`${weatherDataCurrent.heatindex_c}°C`} >
                <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.14831 16.8763V11.2272C8.14831 10.9138 8.02569 10.6132 7.80743 10.3916C7.58917 10.1699 7.29314 10.0454 6.98448 10.0454C6.67581 10.0454 6.37978 10.1699 6.16152 10.3916C5.94326 10.6132 5.82064 10.9138 5.82064 11.2272V16.8763C5.46884 17.0826 5.17632 17.3787 4.97214 17.7353C4.76797 18.0919 4.65925 18.4965 4.6568 18.909C4.6568 19.5359 4.90204 20.1371 5.33856 20.5804C5.77509 21.0236 6.36714 21.2727 6.98448 21.2727C7.60181 21.2727 8.19387 21.0236 8.63039 20.5804C9.06691 20.1371 9.31215 19.5359 9.31215 18.909C9.3097 18.4965 9.20098 18.0919 8.99681 17.7353C8.79263 17.3787 8.50011 17.0826 8.14831 16.8763ZM12.2217 14.1818V5.31817C12.2217 3.9077 11.67 2.555 10.6878 1.55765C9.7056 0.560305 8.37348 0 6.98448 0C5.59547 0 4.26335 0.560305 3.28117 1.55765C2.29899 2.555 1.74721 3.9077 1.74721 5.31817V14.1818C0.942814 15.1074 0.390323 16.2302 0.144386 17.4391C-0.101551 18.6481 -0.0324115 19.9013 0.344965 21.0748C0.722341 22.2483 1.39488 23.3014 2.29605 24.13C3.19722 24.9585 4.2958 25.5339 5.48313 25.799C5.97635 25.9132 6.47897 25.9804 6.98448 25.9999C8.33525 26.0063 9.65886 25.6147 10.7949 24.8726C11.9309 24.1305 12.8306 23.0698 13.3849 21.819C13.9393 20.5681 14.1244 19.1809 13.9179 17.8253C13.7115 16.4698 13.1223 15.2041 12.2217 14.1818ZM9.89407 22.5372C8.96806 23.3709 7.75382 23.797 6.51846 23.7216C5.28309 23.6463 4.12781 23.0757 3.30675 22.1354C2.48569 21.1951 2.06612 19.9621 2.14032 18.7076C2.21453 17.4532 2.77645 16.2801 3.70245 15.4463C3.81242 15.3369 3.89991 15.2063 3.95984 15.0623C4.01978 14.9183 4.05097 14.7636 4.05161 14.6072V5.31817C4.05161 4.53457 4.35815 3.78308 4.90381 3.22899C5.44946 2.67491 6.18953 2.36363 6.9612 2.36363C7.73287 2.36363 8.47294 2.67491 9.01859 3.22899C9.56425 3.78308 9.87079 4.53457 9.87079 5.31817V14.7018C9.87143 14.8581 9.90262 15.0128 9.96255 15.1569C10.0225 15.3009 10.11 15.4314 10.2199 15.5409C10.6957 16.0075 11.068 16.5718 11.3121 17.196C11.5562 17.8203 11.6666 18.4902 11.6357 19.1611C11.6049 19.8321 11.4336 20.4886 11.1333 21.0871C10.833 21.6855 10.4105 22.2121 9.89407 22.6318V22.5372Z" fill="white"/>
                    </svg>
                </WeatherCard>
                <WeatherCard valueName="Temp max" value={`${weatherDataDay.day.maxtemp_c}°C`} >
                    <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.14831 16.8763V11.2272C8.14831 10.9138 8.02569 10.6132 7.80743 10.3916C7.58917 10.1699 7.29314 10.0454 6.98448 10.0454C6.67581 10.0454 6.37978 10.1699 6.16152 10.3916C5.94326 10.6132 5.82064 10.9138 5.82064 11.2272V16.8763C5.46884 17.0826 5.17632 17.3787 4.97214 17.7353C4.76797 18.0919 4.65925 18.4965 4.6568 18.909C4.6568 19.5359 4.90204 20.1371 5.33856 20.5804C5.77509 21.0236 6.36714 21.2727 6.98448 21.2727C7.60181 21.2727 8.19387 21.0236 8.63039 20.5804C9.06691 20.1371 9.31215 19.5359 9.31215 18.909C9.3097 18.4965 9.20098 18.0919 8.99681 17.7353C8.79263 17.3787 8.50011 17.0826 8.14831 16.8763ZM12.2217 14.1818V5.31817C12.2217 3.9077 11.67 2.555 10.6878 1.55765C9.7056 0.560305 8.37348 0 6.98448 0C5.59547 0 4.26335 0.560305 3.28117 1.55765C2.29899 2.555 1.74721 3.9077 1.74721 5.31817V14.1818C0.942814 15.1074 0.390323 16.2302 0.144386 17.4391C-0.101551 18.6481 -0.0324115 19.9013 0.344965 21.0748C0.722341 22.2483 1.39488 23.3014 2.29605 24.13C3.19722 24.9585 4.2958 25.5339 5.48313 25.799C5.97635 25.9132 6.47897 25.9804 6.98448 25.9999C8.33525 26.0063 9.65886 25.6147 10.7949 24.8726C11.9309 24.1305 12.8306 23.0698 13.3849 21.819C13.9393 20.5681 14.1244 19.1809 13.9179 17.8253C13.7115 16.4698 13.1223 15.2041 12.2217 14.1818ZM9.89407 22.5372C8.96806 23.3709 7.75382 23.797 6.51846 23.7216C5.28309 23.6463 4.12781 23.0757 3.30675 22.1354C2.48569 21.1951 2.06612 19.9621 2.14032 18.7076C2.21453 17.4532 2.77645 16.2801 3.70245 15.4463C3.81242 15.3369 3.89991 15.2063 3.95984 15.0623C4.01978 14.9183 4.05097 14.7636 4.05161 14.6072V5.31817C4.05161 4.53457 4.35815 3.78308 4.90381 3.22899C5.44946 2.67491 6.18953 2.36363 6.9612 2.36363C7.73287 2.36363 8.47294 2.67491 9.01859 3.22899C9.56425 3.78308 9.87079 4.53457 9.87079 5.31817V14.7018C9.87143 14.8581 9.90262 15.0128 9.96255 15.1569C10.0225 15.3009 10.11 15.4314 10.2199 15.5409C10.6957 16.0075 11.068 16.5718 11.3121 17.196C11.5562 17.8203 11.6666 18.4902 11.6357 19.1611C11.6049 19.8321 11.4336 20.4886 11.1333 21.0871C10.833 21.6855 10.4105 22.2121 9.89407 22.6318V22.5372Z" fill="#DFA1A1"/>
                    </svg>
                </WeatherCard>
                <WeatherCard valueName="Temp min" value={`${weatherDataDay.day.mintemp_c}°C`} >
                    <svg width="14" height="26" viewBox="0 0 14 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.14831 16.8763V11.2272C8.14831 10.9138 8.02569 10.6132 7.80743 10.3916C7.58917 10.1699 7.29314 10.0454 6.98448 10.0454C6.67581 10.0454 6.37978 10.1699 6.16152 10.3916C5.94326 10.6132 5.82064 10.9138 5.82064 11.2272V16.8763C5.46884 17.0826 5.17632 17.3787 4.97214 17.7353C4.76797 18.0919 4.65925 18.4965 4.6568 18.909C4.6568 19.5359 4.90204 20.1371 5.33856 20.5804C5.77509 21.0236 6.36714 21.2727 6.98448 21.2727C7.60181 21.2727 8.19387 21.0236 8.63039 20.5804C9.06691 20.1371 9.31215 19.5359 9.31215 18.909C9.3097 18.4965 9.20098 18.0919 8.99681 17.7353C8.79263 17.3787 8.50011 17.0826 8.14831 16.8763ZM12.2217 14.1818V5.31817C12.2217 3.9077 11.67 2.555 10.6878 1.55765C9.7056 0.560305 8.37348 0 6.98448 0C5.59547 0 4.26335 0.560305 3.28117 1.55765C2.29899 2.555 1.74721 3.9077 1.74721 5.31817V14.1818C0.942814 15.1074 0.390323 16.2302 0.144386 17.4391C-0.101551 18.6481 -0.0324115 19.9013 0.344965 21.0748C0.722341 22.2483 1.39488 23.3014 2.29605 24.13C3.19722 24.9585 4.2958 25.5339 5.48313 25.799C5.97635 25.9132 6.47897 25.9804 6.98448 25.9999C8.33525 26.0063 9.65886 25.6147 10.7949 24.8726C11.9309 24.1305 12.8306 23.0698 13.3849 21.819C13.9393 20.5681 14.1244 19.1809 13.9179 17.8253C13.7115 16.4698 13.1223 15.2041 12.2217 14.1818ZM9.89407 22.5372C8.96806 23.3709 7.75382 23.797 6.51846 23.7216C5.28309 23.6463 4.12781 23.0757 3.30675 22.1354C2.48569 21.1951 2.06612 19.9621 2.14032 18.7076C2.21453 17.4532 2.77645 16.2801 3.70245 15.4463C3.81242 15.3369 3.89991 15.2063 3.95984 15.0623C4.01978 14.9183 4.05097 14.7636 4.05161 14.6072V5.31817C4.05161 4.53457 4.35815 3.78308 4.90381 3.22899C5.44946 2.67491 6.18953 2.36363 6.9612 2.36363C7.73287 2.36363 8.47294 2.67491 9.01859 3.22899C9.56425 3.78308 9.87079 4.53457 9.87079 5.31817V14.7018C9.87143 14.8581 9.90262 15.0128 9.96255 15.1569C10.0225 15.3009 10.11 15.4314 10.2199 15.5409C10.6957 16.0075 11.068 16.5718 11.3121 17.196C11.5562 17.8203 11.6666 18.4902 11.6357 19.1611C11.6049 19.8321 11.4336 20.4886 11.1333 21.0871C10.833 21.6855 10.4105 22.2121 9.89407 22.6318V22.5372Z" fill="#6D97CA"/>
                    </svg>
                </WeatherCard>
                <WeatherCard valueName="Humidity" value={`${weatherDataCurrent.humidity}%`}>
                <svg fill="#000000" height="48px" width="30" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 328.611 328.611" xmlSpace="preserve" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M209.306,50.798c-2.452-3.337-7.147-4.055-10.485-1.602c-3.338,2.453-4.055,7.147-1.603,10.485 c54.576,74.266,66.032,123.541,66.032,151.8c0,27.691-8.272,52.794-23.293,70.685c-17.519,20.866-42.972,31.446-75.651,31.446 c-73.031,0-98.944-55.018-98.944-102.131c0-52.227,28.103-103.234,51.679-136.829c25.858-36.847,52.11-61.415,52.37-61.657 c3.035-2.819,3.209-7.565,0.39-10.6c-2.819-3.034-7.565-3.209-10.599-0.39c-1.11,1.031-27.497,25.698-54.254,63.765 c-24.901,35.428-54.586,89.465-54.586,145.71c0,31.062,9.673,59.599,27.236,80.353c20.361,24.061,50.345,36.779,86.708,36.779 c36.794,0,66.926-12.726,87.139-36.801c17.286-20.588,26.806-49.117,26.806-80.33C278.25,156.216,240.758,93.597,209.306,50.798z" fill="white"></path> 
                    <path d="M198.43,148.146l-95.162,95.162c-2.929,2.929-2.929,7.678,0,10.606c1.465,1.464,3.385,2.197,5.304,2.197 s3.839-0.732,5.304-2.197l95.162-95.162c2.929-2.929,2.929-7.678,0-10.606C206.107,145.217,201.359,145.217,198.43,148.146z" fill="white"></path> 
                    <path d="M191.965,207.899c-13.292,0-24.106,10.814-24.106,24.106s10.814,24.106,24.106,24.106s24.106-10.814,24.106-24.106 S205.257,207.899,191.965,207.899z M191.965,241.111c-5.021,0-9.106-4.085-9.106-9.106s4.085-9.106,9.106-9.106 s9.106,4.085,9.106,9.106S196.986,241.111,191.965,241.111z" fill="white"></path> 
                    <path d="M125.178,194.162c13.292,0,24.106-10.814,24.106-24.106s-10.814-24.106-24.106-24.106s-24.106,10.814-24.106,24.106 S111.886,194.162,125.178,194.162z M125.178,160.949c5.021,0,9.106,4.085,9.106,9.106s-4.085,9.106-9.106,9.106 c-5.021,0-9.106-4.085-9.106-9.106S120.156,160.949,125.178,160.949z" fill="white"></path> </g> </g></svg>
                </WeatherCard>
                <WeatherCard valueName="Cloud Coverage" value={`${weatherDataCurrent.cloud}%`}>
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.48923 4.75824C7.76737 4.72918 8.04955 4.71429 8.33508 4.71429C12.1542 4.71429 15.3734 7.37767 16.3594 11.0109C16.4383 11.0058 16.5177 11.0024 16.5975 11.0009C16.5651 11.0004 16.5326 11.0001 16.5 11.0001L16.4736 11.0001L16.4736 11H17.6785H17.7259V10.9996C19.2228 10.9743 20.4285 9.75298 20.4285 8.25C20.4285 6.73122 19.1973 5.5 17.6785 5.5C17.1686 5.5 16.6911 5.6388 16.2817 5.88068C16.2805 5.44168 16.2138 5.01807 16.0909 4.6191C15.4787 2.84544 13.7945 1.57143 11.8128 1.57143C9.77966 1.57143 8.05971 2.91245 7.48923 4.75824ZM19.7816 12.026C21.1248 13.0239 22 14.656 22 16.5C22 19.5375 19.6253 22 16.6959 22C16.6303 22 16.565 21.9987 16.5 21.9963V22H8.45988V21.9991C8.41836 21.9997 8.37675 22 8.33508 22C3.73174 22 0 18.1305 0 13.3571C0 9.50269 2.4333 6.23755 5.79395 5.1233C6.25971 2.21891 8.77714 0 11.8128 0C14.4174 0 16.6404 1.63337 17.5135 3.93167C17.5682 3.92961 17.6233 3.92857 17.6785 3.92857C20.0652 3.92857 22 5.86334 22 8.25C22 9.87321 21.105 11.2874 19.7816 12.026ZM16.5 20.4286H8.45988H8.36945V20.4285L8.33508 20.4286C4.65284 20.4286 1.57143 17.3168 1.57143 13.3571C1.57143 9.39751 4.65284 6.28571 8.33508 6.28571C11.4587 6.28571 14.15 8.52503 14.8947 11.6216L14.897 11.6206C15.0022 12.0503 15.0693 12.4957 15.0942 12.9529C15.5838 12.7075 16.1285 12.5714 16.6959 12.5714C18.7042 12.5714 20.4286 14.2761 20.4286 16.5C20.4286 18.7083 18.7282 20.4046 16.738 20.4283V20.4286H16.5Z" fill="white"/>
                    </svg>
                </WeatherCard>
                    
                <WeatherCard valueName="UV Index" value={weatherDataCurrent.uv} >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="11" cy="11" r="5" fill="white" />
                    <path d="M11 0 L11 3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 19 L11 22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M0 11 L3 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M19 11 L22 11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3.5 3.5 L5.5 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16.5 16.5 L18.5 18.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3.5 18.5 L5.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <path d="M16.5 5.5 L18.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    <text x="50%" y="50%" fill="white" fontSize="4" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">UV</text>
                    </svg>
                </WeatherCard>
            </div>
                <div className={styles["horizontal-line"]}></div>
                <ForecastWeather forecastData = {weatherForecastData} />
        </section>
        </>
    )
}

