// ----- REDUCERS ------

import types from './types';

const INITIAL_STATE = {
    listName: 'TouristsList',
    list: [
    ]
}
const TouristsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // ----- add a tourist-----

        case types.ADD_TOURIST:
            return {
                ...state, list: [...state.list, action.item]
            }

        // ----- delete a tourist -----

        case types.DEL_TOURIST:
            let list = state.list;
            for (var i = 0; i < list.length; i++)
                if (list[i].id === action.item)
                    list.splice(i, 1)

            return { ...state, list: list };

        // ----- add tourist's flight -----

        case types.ADD_TOURIST_FLIGHT:
            let newFlightList = state.list;

            for (var i = 0; i < newFlightList.length; i++)
                if (newFlightList[i].id === action.item.tourist)
                    newFlightList[i].flights.push(action.item.flight)

            return { ...state, list: newFlightList };

        // ----- delete tourist's flight  ----

        case types.DEL_TOURIST_FLIGHT:

            let newList = state.list
            for (let i = 0; i < newList.length; i++) {
                if (newList[i].id === action.item.tourist) {
                    for (let j = 0; j < newList[i].flights.length; j++) {
                        if (newList[i].flights[j] === action.item.flight) {
                            newList[i].flights.splice(j, 1)
                        }
                    }
                }
            }

            return { ...state, list: newList };

        // ----- delete flight from all tourists -----

        case types.DEL_FLIGHT_FROM_ALL_TOURISTS:

            let modifiedList = state.list;
            for (let i = 0; i < modifiedList.length; i++) {
                for (let j = 0; j < modifiedList[i].flights.length; j++) {
                    if (modifiedList[i].flights[j] === action.item) {
                        modifiedList[i].flights.splice(j, 1)
                    }
                }
            }

            return { ...state, list: modifiedList };

        // ----- default case -----

        default:
            return state;

    }
}

export default TouristsReducer;