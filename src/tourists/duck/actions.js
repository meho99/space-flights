
// ----- actions ----- 

import types from './types';

const add = item => ({
    type: types.ADD_TOURIST, item
})
const addFlight = item =>({
    type: types.ADD_TOURIST_FLIGHT, item
})

const del = item =>({
    type: types.DEL_TOURIST, item
})

const delFlight = item=>({
    type: types.DEL_TOURIST_FLIGHT, item
})

const delFlightFromAll = item =>({
    type: types.DEL_FLIGHT_FROM_ALL_TOURISTS, item
})

export default {
    add,
    addFlight,
    del,
    delFlight,
    delFlightFromAll
}