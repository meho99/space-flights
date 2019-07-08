// ---------------  SERVER COMMUNICATION  ---------------

import { address, defaultOptions } from '../../serverConfig';

import actions from './actions';


const fetchFlights = async (Data = { 'hello': 'world' }, where = '/') => {

    const response = await fetch(address(where), defaultOptions(Data))
    const json = await response.json()

    return json
}

// ----- get all flights from server -----

export const getAllFlights = () =>
    async (dispatch) => {
        const flightsList = await fetchFlights()
        flightsList.map(flight => {
            let tourists = flight.tourists.split(',')

            if (tourists[0] === "") // avoid empty touirst fields
                tourists.splice(0,1)

            dispatch(actions.add({ ...flight, tourists: tourists }))

        })
    }

// ----- add flight to database -----

export const addFlightToDatabase = (data) =>
    async (dispatch) => {

        const flight = await fetchFlights(data, '/addFlight')
        if (flight.ok)
            dispatch(actions.add(data))
    }

// ----- delete flight from database -----

export const delFlightDatabase = (data) =>
    async (dispatch) => {

        const flight = await fetchFlights({ id: data }, '/delFlight')

        if (flight.ok)
            dispatch(actions.del(data))
    }

// ----- add Tourist to Flight in database -----

export const addTouristToFlightDatabase = (data) =>
    async (dispatch) => {

        const flight = await fetchFlights({ flight: data.flight, tourist: data.tourist }, '/addTouristToFlight')

        if (flight.ok)
            dispatch(actions.addTourist(data))
    }

// ----- del Tourist from Flight in database -----

export const delTouristFromFlightDatabase = (data) =>
    async (dispatch) => {

        const flight = await fetchFlights({ flight: data.flight, tourist: data.tourist }, '/delTouristFromFlight')

        if (flight.ok)
            dispatch(actions.delTourist(data))
    }

// ----- del Tourist from all Flights in database -----

export const deltouristFromAllDatabase = (data) =>
    async (dispatch) => {

        const flight = await fetchFlights({ tourist: data }, '/delTouristFromAll')

        if (flight.ok)
            dispatch(actions.delTouristFromAll(data))
    }

