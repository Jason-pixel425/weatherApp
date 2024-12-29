import styles from '../styles/CurrentWeatherStyles/WeatherCard.module.css'

export default function WeatherCard({
    valueName='',
     value='',
    valueImg='',
    style = {},
    children}) {
    
    return (
        <div className={styles[`weather-card`]} style={style}>
            <p>{valueName}</p>
            {valueImg && <img src={valueImg} alt={valueName} />}
            <div className={styles['value-container']}>
                <p>{value}</p>
                {children}

            </div>
        </div>
    )
}