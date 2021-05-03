import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import {useEffect} from "react";
import {getCity} from "./thunks/thunks";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Nav, NavItem, Row} from "react-bootstrap";
import Search from "./components/Search/Search";
import CityCard from "./components/CityCard/CityCard";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import HelloCodica from "./components/HelloCodica/HelloCodica";
import {NavLink} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";


function App() {
    const cities = useSelector(state => state.cities.cities)
    const dispatch = useDispatch()

    //saving order of city list
    let myCities = []
    !window.localStorage.getItem("cities")
        ? window.localStorage.setItem("cities", JSON.stringify([]))
        : myCities = JSON.parse(window.localStorage.getItem("cities"))

    const getCitiesFromLocalStorage = () => {
        for (let i = 0; i < myCities.length; i++) {
            let city = myCities[i]
            dispatch(getCity(city, i))
        }
    }

    useEffect(() => {
        getCitiesFromLocalStorage()
    }, [])

    return (
        <div>
            <Container>
                <h2>Weather App</h2>
                <Row className="justify-content-md-center">
                    <Col>
                        <Search/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4}>
                        <h3>Your cities</h3>
                        <Nav
                            variant="pills"
                        >
                            {cities
                                .sort((a, b) => a.number - b.number)
                                .map((city, index) => <NavItem key={index}>
                                        <NavLink key={index} to={`${city.name}`}>
                                            <CityCard
                                                key={index}
                                                name={city.name}
                                                cityData={city}
                                            />
                                        </NavLink>
                                    </NavItem>
                                )}
                        </Nav>
                    </Col>
                    <Col xs={8}>
                        <h3>Details</h3>
                        <Switch>
                            <Route path="/hello_codica">
                                <HelloCodica/>
                            </Route>
                            <Route path="/:cityName">
                                <WeatherDisplay/>
                            </Route>
                            <Route exact path="/">
                                <Redirect to={`${myCities[0] || "/hello_codica"}`}/>
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
