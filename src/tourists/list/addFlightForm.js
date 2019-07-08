// ---------------  form with adding new flights to tourists  ---------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {addTouristFlightDatabase, delFlightFromTouristDatabase} from '..//duck/operations'
import {addTouristToFlightDatabase, delTouristFromFlightDatabase} from '../../flights/duck/operations'

import xIcon from '../../assets/x.png'
import plusIcon from '../../assets/+.png'

// ----- style -----

const Container = styled.div`
    position: absolute;
    width: 50vw;
    padding: 2vw 0;
    background-color: rgba(0,0,0,.7);
    border: 0.2vw solid #8099c2;
    color: white;
    & > h2{
        font-size: 2vw;
        color: #0AA40C;
    }
`
const Icon = styled.img`
    width: 1vw;
`
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
`
const MiniHeader = styled.h3`
    font-size: 1.3vw;
`
const OneSide= styled.div`
    width: 40%;
    & > div > span{
        width: 10vw;
    }
`
const Action = styled.button`
    padding: 0.3vw;
    background: none;
    cursor: pointer;
    ${
    props => props.corner
        ?
        'position: absolute;right: 0.2vw;top: 0.2vw;'
        :
        'background-color: none'
    }
    
`

// ----- component -----

class AddFlightForm extends Component {

    // ----- delete tourist from flight -----

    delTuristFlight = async (flightName, touristName) => {
        let action = {
            tourist: touristName,
            flight: flightName
        }
        await this.props.delTouristFromFlight(action)
        await this.props.delTouristsFlight(action)

        this.setState({})

        console.log(flightName, touristName)

        
    }

    // ----- add tourist to flight -----

    addTourits = async (flightId, id) => {
        let action = {
            flight: flightId,
            tourist: id
        }
        if (this.isAvaliable(flightId)) {
            await this.props.addUserToFlight(action)
            await this.props.addFlightToUser(action)

            this.setState({})
        }
        else{
            alert("NO SEATS AVALIABLE !")
        }


        
    }

    // ----- avaliable seats control -----

    isAvaliable = (id) => {
        for(let i= 0; i< this.props.flights.length; i++){
            if(this.props.flights[i].id=== id){
                if(this.props.flights[i].tourists.length< this.props.flights[i].seatsNumber){
                    return true
                }
                else
                    return false
            }
        }
    }

    render() {
        return (
            <Container>
                <Action corner onClick={this.props.hide}><Icon src={xIcon} alt='x' /></Action>
                <h2>Tourist: {this.props.tourist+' ( '+this.props.id +' )'}</h2>
                <FlexRow>
                    <OneSide>
                        <MiniHeader>Current flights :</MiniHeader>
                        {
                            // ----- showing list of tourist's flights -----

                            this.props.flights.map((i, index) => {
                                let flight = this.props.touristFlights.map((j, index2) => {
                                    if (i.id === j) {
                                        return <div key={index2}>
                                            <FlexRow>{i.id}<Action onClick={() => { this.delTuristFlight(i.id, this.props.id) }}><Icon src={xIcon} alt='x' /></Action></FlexRow>
                                        </div>
                                    }
                                })
                                return flight
                            })
                        }
                    </OneSide>
                    <OneSide>
                        <MiniHeader>Add flight :</MiniHeader>
                        {
                            // ----- showing list of flights that you can add to flight -----

                            this.props.flights.map((i, index) => {
                                var isUserinflight = false;
                                let flight = this.props.touristFlights.map((j, index2) => {
                                    if (i.id === j)
                                        isUserinflight = true;
                                })
                                if (!isUserinflight) {
                                    flight = <div key={index}>
                                        <FlexRow>{i.id}<Action onClick={() => { this.addTourits(i.id, this.props.id) }}><Icon src={plusIcon} alt='plus' /></Action></FlexRow>
                                    </div>
                                }
                                return flight
                            })
                        }
                    </OneSide>
                </FlexRow>

            </Container>
        );
    }
}
AddFlightForm.propTypes = {
    tourist: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    touristFlights: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    flights: state.flights.list
})

const mapDispatchToProps = dispatch => ({
    delTouristFromFlight: action => dispatch(delTouristFromFlightDatabase(action)),
    delTouristsFlight: action => dispatch(delFlightFromTouristDatabase(action)),
    addUserToFlight: action => dispatch(addTouristToFlightDatabase(action)),
    addFlightToUser: action => dispatch(addTouristFlightDatabase(action))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddFlightForm);