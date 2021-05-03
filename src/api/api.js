import axios from "axios";

export const currentWeatherAPI = {
    getCurrentWeather(city) {
        return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6153f58f351c52df740659b887409431&units=metric`)
    }
}