import {
    ADD_CITY,
    REMOVE_CITY,
    UPDATE_CITY
} from "../constants/actionTypes"

const initialState = {
    cities: [],
}

export const cities = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CITY:
            action.city.number = action.number
            return {
                ...state,
                cities: [...state.cities, action.city],
            }
        case REMOVE_CITY:
            return {
                ...state,
                cities: state.cities.filter(city => action.name !== city.name)
            }
        case UPDATE_CITY:
            let cities = state.cities.map(city => {
                if(city.name === action.city.name) {
                    return action.city
                }
                return city
            })
            return {
                ...state,
                cities: cities
            }
        default:
            return state
    }
}