import {useSelector} from "react-redux";
import {useParams} from "react-router";

const WeatherDisplay = () => {
    const cityName = useParams().cityName

    const weatherData = useSelector(state => {
        return state.cities.cities.find(city => city.name === cityName)
    })

    return(
        weatherData ?
        <div>
            <h2>Weather in {weatherData.name}</h2>
            <p>temp: {weatherData.main.temp}°С</p>
            <p>feels like: {weatherData.main.feels_like}°С</p>
            <p>min: {weatherData.main.temp_min}°С</p>
            <p>max: {weatherData.main.temp_max}°С</p>
            <p>wind speed: {weatherData.wind.speed} m/s</p>
            <p>humidity: {weatherData.main.humidity}%</p>
        </div>
            : <div>Please select a city</div>
    )
}

export default WeatherDisplay;