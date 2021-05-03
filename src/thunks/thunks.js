import {currentWeatherAPI} from "../api/api";
import {addCity} from "../actions/actions";

export const getCity = (city, number) => dispatch => {
    currentWeatherAPI.getCurrentWeather(city).then(res => {
        if (res.status === 200) {
            dispatch(addCity(res.data, number))
        }
    })
}