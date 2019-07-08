// --------------- REDUCERS ---------------

import { combineReducers } from 'redux'
import flightsReducer  from './flights/duck'
import TouristsReducer from './tourists/duck'

const rootReducer = combineReducers({
  flights: flightsReducer,
  tourists: TouristsReducer
})

export default rootReducer