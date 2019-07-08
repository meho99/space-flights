// ----------  adding a tourist forms   ----------

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import { addTouristToFlightDatabase } from '../flights/duck/operations';
import { addTouristToDatabase } from './duck/operations'

import plusIcon from '../assets/+.png'
import xicon from '../assets/x.png'

// ----- style -----

const Icon = styled.img`
    width: ${props => props.mini ? '1vw' : '2.5vw'};
`
const Action = styled.button`
    width: 25%;
    background: none;
    cursor: pointer
`
const Heading = styled.h2`
    font-size: 2vw;
    margin: 2vw 0;
`
const Label = styled.label`
    width: 21vw;
    padding: 2vw 1vw;
    font-weight: bold;
    font-size: 1.2vw;
    & > input{
        font-weight: bold;
        margin: 0 1vw;
        border: 0.2vw solid white;
        background: none;
        border-radius: 2vw;
        color: #4287f5;
        width: 19vw;
        font-size: 1.4vw;
    }
`
const Forms = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 90vw;
    margin-bottom: 2vw;
`
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 4vw;
`
const OneSide = styled.div`
    width: 45%;
`
const MiniHeader = styled.p`
    font-size: 1.5vw;
    color: #4287f5
`

// ----- component -----

class AddTourist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            firstName: '',
            secoundName: '',
            sex: '',
            country: '',
            birth: '',
            notes: '',
            flights: []
        }
    }
    // ----- submit form and add tourist -----

    add = () => {
        if (this.state.id && this.state.firstName && this.state.secoundName && this.state.sex && this.state.country && this.state.birth) { // checking data
            this.props.addTourist(this.state)

            // ----- add new flight to selected tourists

            for (let i = 0; i < this.state.flights.length; i++) {
                this.props.addFlightToTourist({
                    flight: this.state.flights[i],
                    tourist: this.state.id
                })
            }
            this.goBack()
        }
        else {
            alert("Fill in all fields !")
        }
        this.setState()
    }

    // ----- change value in inputs 

    changeValue = (e, property) => {
        this.setState({
            [property]: e.target.value
        })
    }

    // ----- go back to previous page -----

    goBack = () => {
        this.props.history.goBack();
    }

    // ----- delete  flight -----

    delFlight = (id) => {
        let flightsList = this.state.flights
        for (let i = 0; i < this.state.flights.length; i++) {
            if (this.state.flights[i] === id) {
                flightsList.splice(i, 1)
            }
        }

        this.setState({ flights: flightsList })
    }

    // ----- add flight to tourist -----

    addFlight = (id) => {
        let flightsList = this.state.flights;
        flightsList.push(id)
        this.setState({ flights: flightsList })
    }

    // ----- avaliable seats control -----

    isAvaliable = (flight) => {
        if (flight.seatsNumber > flight.tourists.length)
            return true;
        else
            return false;
    }

    render() {
        return (
            <div>
                <Heading>ADD A TOURIST</Heading>
                <Forms>
                    <Label>FIRST NAME : <input type='text' value={this.state.firstName} onChange={(e) => { this.changeValue(e, 'firstName') }} /></Label>
                    <Label>SECOUND NAME : <input type='text' value={this.state.secoundName} onChange={(e) => { this.changeValue(e, 'secoundName') }} /></Label>
                    <Label>ID : <input type='text' value={this.state.id} onChange={(e) => { this.changeValue(e, 'id') }} /></Label>
                    <Label>GENDER : <input type='text' value={this.state.sex} onChange={(e) => { this.changeValue(e, 'sex') }} /></Label>
                    <Label>COUNTRY : <input type='text' value={this.state.country} onChange={(e) => { this.changeValue(e, 'country') }} /></Label>
                    <Label>BIRTH DATE : <input type='text' value={this.state.birth} onChange={(e) => { this.changeValue(e, 'birth') }} /> </Label>
                    <Label>NOTES :  <input type='text' value={this.state.notes} onChange={(e) => { this.changeValue(e, 'notes') }} /></Label>

                </Forms>

                <FlexRow>
                    <OneSide>
                        <MiniHeader>Current tourist's flights :</MiniHeader>

                        {
                            // ----- showing list of flights  -----

                            this.props.flights.map((i, index) => {
                                let flight = this.state.flights.map((j, index2) => {
                                    if (i.id === j) {
                                        return <div key={index2}>
                                            {i.id}<Action onClick={() => { this.delFlight(i.id) }}><Icon mini src={xicon} alr='cancel' /></Action>
                                        </div>
                                    }
                                })
                                return flight
                            })
                        }
                    </OneSide>
                    <OneSide>
                        <MiniHeader>Add flight : </MiniHeader>
                        {
                            // ----- showing list of flights that you can add to tourist -----

                            this.props.flights.map((i, index) => {
                                var isUserinflight = false;
                                let flight = this.state.flights.map((j, index2) => {
                                    if (i.id === j)
                                        isUserinflight = true;
                                })
                                if (!isUserinflight) {
                                    if (this.isAvaliable(i)) {
                                        flight = <div key={index}>
                                            {i.id}<Action onClick={() => { this.addFlight(i.id) }}><Icon mini src={plusIcon} alr='add' /></Action>
                                        </div>
                                    }
                                    else {
                                        flight = <div key={index}>
                                            {i.id} (NO AVALIABLE SEATS)
                                        </div>

                                    }

                                }
                                return flight
                            })
                        }
                    </OneSide>
                </FlexRow>
                <Action onClick={this.goBack}><Icon src={xicon} alr='cancel' /></Action>
                <Action onClick={this.add}><Icon src={plusIcon} alr='add' /></Action>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    flights: state.flights.list
})

const mapDispatchToProps = {
    addTourist: action => addTouristToDatabase(action),
    addFlightToTourist: action => addTouristToFlightDatabase(action)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTourist);