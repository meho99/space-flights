// ---------------  FLIGHT LIST  ---------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlightListItem from './flightListItem';

import { delFlightFromAllDatabase } from '../../tourists/duck/operations';
import  {delFlightDatabase} from '../duck/operations'


// ----------  style  ----------



// ----------  component  ----------

class FlightList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            default: {
                id: 'FLIGHT ID',
                tourists: ['TOURISTS'],
                price: 'PRICE',
                arrival: 'ARRIVAL TIME',
                departure: 'DEPARTURE TIME',
                seatsNumber: 0,
                seatsText: 'AVALIABLE SEATS'
            }
        }

    }

    //----- delete a flight function -----

    delFlight = (flightId) => {
        this.props.delFlight(flightId)
        this.props.delFlightFromAllTourists(flightId)
    }

    render() {
        return (
            <div>

                <FlightListItem default name={this.state.default.id} seats={this.state.default.seatsNumber} seatsText={this.state.default.seatsText} arrival={this.state.default.arrival} departure={this.state.default.departure} price={this.state.default.price} tourists={this.state.default.tourists} />

                {

                    this.props.flights.list.map((item, index) => {
                        if (item.id)
                            return <FlightListItem name={item.id} del={this.delFlight} delUser={this.delTuristFromFlight} seats={Number(item.seatsNumber)} arrival={item.arrival} departure={item.departure} price={item.price} tourists={item.tourists} key={index} />

                    })
                }
            </div >
        );
    }

};

const mapStateToProps = state => ({
    flights: state.flights
})

const mapDispatchToProps = dispatch => ({
    delFlight: action => dispatch(delFlightDatabase(action)),
    delFlightFromAllTourists: action => dispatch(delFlightFromAllDatabase(action)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FlightList);