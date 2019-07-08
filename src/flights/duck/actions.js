
// ----- akcje ----- 

import types from './types';

const add = item => ({
    type: types.ADD_FLIGHT, item
})

const addTourist = item =>({
    type: types.ADD_FLIGHT_TOURIST, item
})

const del = item => ({
    type: types.DEL_FLIGHT, item
})

const delTourist = item => ({
    type: types.DEL_TOURIST, item
})
const delTouristFromAll = item=> ({
    type: types.DEL_TOURIST_ALL, item
})

export default {
    add,
    addTourist,
    del,
    delTourist,
    delTouristFromAll
}