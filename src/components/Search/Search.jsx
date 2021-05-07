import {Button, Col, Form, FormControl, Spinner} from "react-bootstrap";
import {useState} from "react";
import {currentWeatherAPI} from "../../api/api";
import '../../App.css'
import {useDispatch, useSelector} from "react-redux";
import {addCity} from "../../actions/actions";
import {useHistory} from "react-router";

const Search = () => {
    const [searchValue, setSearchValue] = useState("")
    const [searchError, setSearchError] = useState("")
    const [isFetching, setIsFetching] = useState(false)
    const citiesLength = useSelector(state => state.cities.cities.length)
    const history = useHistory()

    const dispatch = useDispatch()

    const onSearchChange = (event) => {
        setSearchValue(event.target.value)
    }

    const addCityToState = (city) => {
        dispatch(addCity(city, citiesLength))
        setSearchValue("")
        history.push(`/${city.name}`)
    }

    const addCityToLocalStorage = (cityName) => {
        let myCities = JSON.parse(window.localStorage.getItem("cities"))
        myCities.push(cityName)
        window.localStorage.setItem("cities", JSON.stringify(myCities))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        searchCity()
    }

    const searchCity = () => {
        setIsFetching(true)
        currentWeatherAPI.getCurrentWeather(searchValue).then(response => {
            if (response.data.cod === 200) {
                addCityToState(response.data)
                setSearchError("")
                addCityToLocalStorage(response.data.name)
            }
            setIsFetching(false)
        }).catch(error => {
            setSearchError(error.response.data.message)
            setIsFetching(false)
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Col xs={5}>
                    <FormControl
                        placeholder="Enter city name"
                        value={searchValue}
                        onChange={onSearchChange}
                    />
                </Col>
                <Col>
                    {isFetching
                        ? <Button variant="success" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        </Button>
                        : <Button
                            variant="success"
                            onClick={searchCity}
                        >
                            Add
                        </Button>}
                    {searchError && <span className="badge-danger">{searchError}</span>}
                </Col>
            </Form.Row>
        </Form>
    )
}

export default Search;
