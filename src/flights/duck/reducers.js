// ----- REDUCERS ------

import types from './types';

const INITIAL_STATE = {
    listName: 'FlightList',
    list: [

    ]
}
const flightsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // ----- add a flight-----

        case types.ADD_FLIGHT:
            return {
                ...state, list: [...state.list, action.item]
            }

        // ----- delete a flight -----

        case types.DEL_FLIGHT:
            let list = state.list;
            for (var i = 0; i < list.length; i++)
                if (list[i].id === action.item)
                    list.splice(i, 1)

            return { ...state, list: list };

        // ----- add tourist to flight -----

        case types.ADD_FLIGHT_TOURIST:
            console.log(action.item)
            let newTouristList = state.list;

            for (var i = 0; i < newTouristList.length; i++)
                if (newTouristList[i].id === action.item.flight)
                    newTouristList[i].tourists.push(action.item.tourist)
                    
            return { ...state, list: newTouristList };


        // ----- delete tourist from flight ----

        case types.DEL_TOURIST:

            let newList = state.list;

            for (var i = 0; i < newList.length; i++) {
                if (newList[i].id === action.item.flight) {
                    for (let j = 0; j < newList[i].tourists.length; j++) {
                        if (newList[i].tourists[j] === action.item.tourist) {
                            newList[i].tourists.splice(j, 1);
                        }
                    }
                }
            }
            return { ...state, list: newList };

        // ----- delete tourist from all flights -----

        case types.DEL_TOURIST_ALL:
            let readyList = state.list
            for(let i= 0; i< readyList.length; i++){
                for(let j= 0; j< readyList[i].tourists.length; j++){
                    if(readyList[i].tourists[j]=== action.item){
                        readyList[i].tourists.splice(j,1)
                    }
                }
            }
            return { ...state, list: readyList };


        // ----- default case -----

        default:
            return state;

    }
}

export default flightsReducer;