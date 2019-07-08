// ---------------  SERVER COMMUNICATION  ---------------

import { address, defaultOptions } from '../../serverConfig';

import actions from './actions';


const fetchTourists = async (Data = { 'hello': 'world' }, where = '/') => {

    const response = await fetch(address(where), defaultOptions(Data))
    const json = await response.json()

    return json
}

// ----- get all tourists from server -----

export const gelAllTourists = () =>
    async (dispatch) => {
        const touristsList = await fetchTourists({hello: 'world'}, '/allTourists')

        touristsList.map(tourist => {
            let flights = tourist.flights.split(',')

                if(flights[0]=== "") // avoid empty flights fields
                    flights.splice(0,1)
            
            dispatch(actions.add({ ...tourist, flights: flights }))


        })
    }

// ----- add tourist to database -----

export const addTouristToDatabase = (data) =>
    async (dispatch) => {

        const flight = await fetchTourists(data, '/addTourist')
        if (flight.ok)
            dispatch(actions.add(data))
    }

// ----- delete tourist from database -----

export const delTouristDatabase = (data) =>
    async (dispatch) => {

        const tourist = await fetchTourists({ id: data }, '/delTourist')

        if (tourist.ok)
            dispatch(actions.del(data))
    }

// ----- add Tourist's Flight in database -----

export const addTouristFlightDatabase = (data) =>
    async (dispatch) => {

        const tourist = await fetchTourists({ flight: data.flight, tourist: data.tourist }, '/addFlightToTourist')

        if (tourist.ok)
            dispatch(actions.addFlight(data))
    }

// ----- del Flight from Tourist in database -----

export const delFlightFromTouristDatabase = (data) =>
    async (dispatch) => {

        const tourist = await fetchTourists({ flight: data.flight, tourist: data.tourist }, '/delFlightFromTourist')

        if (tourist.ok)
            dispatch(actions.delFlight(data))
    }

// ----- del Flight from all Tourists in database -----

export const delFlightFromAllDatabase = (data) =>
    async (dispatch) => {
        console.log(data)
        const flight = await fetchTourists({ flight: data }, '/delFlightFromAll')

        if (flight.ok)
            dispatch(actions.delFlightFromAll(data))
    }

