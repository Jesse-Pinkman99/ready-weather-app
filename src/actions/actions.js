import {ADD_CITY, REMOVE_CITY, UPDATE_CITY} from "../constants/actionTypes";

export const addCity = (city, number) => {
    return {
        type: ADD_CITY,
        city,
        number
    }
}

export const removeCity = (name) => {
    return {
        type: REMOVE_CITY,
        name
    }
}

export const updateCity = (city) => {
    return {
        type: UPDATE_CITY,
        city
    }
}