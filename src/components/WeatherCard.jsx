import styles from '../styles/CurrentWeatherStyles/WeatherCard.module.css'

export default function WeatherCard({
    valueName='',
     value='',
    valueImg='',
    children}) {
    
    return (
        <div className={styles['weather-card']}>
            <p>{valueName}</p>
            <p>{value}</p>
            {valueImg && <img src={valueImg} alt={valueName} />}
            {children}
        </div>
    )
}