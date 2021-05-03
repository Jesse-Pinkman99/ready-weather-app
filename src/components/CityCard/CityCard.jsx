import {Button, Card, Spinner} from "react-bootstrap";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {removeCity, updateCity} from "../../actions/actions";
import {useHistory} from "react-router";
import {currentWeatherAPI} from "../../api/api";

const CityCard = (props) => {
    const dispatch = useDispatch()
    const [isFetching, setIsFetching] = useState(false)
    const history = useHistory()

    const removeCityFromLocalStorage = () => {
        let myCities = JSON.parse(window.localStorage.getItem("cities"))
        let newList = myCities.filter(city => city !== props.name)
        window.localStorage.setItem("cities", JSON.stringify(newList))
    }

    const remCity = (event) => {
        event.preventDefault()
        dispatch(removeCity(props.name))
        removeCityFromLocalStorage();
        if (history.location.pathname === `/${props.name}`) {
            history.push("/")
        }
        console.log(window.localStorage)
    }

    const updateInfo = (event) => {
        event.preventDefault()
        setIsFetching(true)
        currentWeatherAPI.getCurrentWeather(props.name)
            .then(response => {
                debugger
                if (response.data.cod === 200) {
                    dispatch(updateCity(response.data))
                }
                setIsFetching(false)
            })

    }

    const city = props.cityData
    const weather = city.weather[0]
    const iconURL = "http://openweathermap.org/img/w/" + weather.icon + ".png"

    return (
        <Card className="bg-info">
            <Card.Body>
                <Card.Title>{city.name}</Card.Title>
                {isFetching
                    ? <Spinner animation="border"/>
                    : <>
                        <Card.Subtitle className="mb-2">
                            {weather.main} in {city.name}
                            <img src={iconURL} alt="weatherImg"/>
                        </Card.Subtitle>
                        <Card.Text>
                            temp: {city.main.temp}°С
                        </Card.Text>
                        <Card.Text>
                            feels like: {city.main.feels_like}°С
                        </Card.Text>
                        <Card.Text>
                            wind speed: {city.wind.speed} m/s
                        </Card.Text>
                        <Button
                            className="bg-info"
                            onClick={updateInfo}
                        >
                            Update
                        </Button>
                        <Button
                            variant="danger"
                            onClick={remCity}
                        >
                            Remove
                        </Button>
                    </>}
            </Card.Body>
        </Card>
    )
}

export default CityCard