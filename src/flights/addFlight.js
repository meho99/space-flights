// ----------  adding a flight forms   ----------

import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'

import { addTouristFlightDatabase } from '../tourists/duck/operations'
import {addFlightToDatabase} from './duck/operations'

import plusIcon from '../assets/+.png'
import xicon from '../assets/x.png'

// ----- style -----

const Icon = styled.img`
    width: ${props=> props.mini? '1vw':'2.5vw'};
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
    width: 25vw;
    padding: 2vw 1vw;
    font-size: 1.2vw;
    font-weight: bold;
    & > input{
        font-weight: bold;
        margin: 0 1vw;
        width: 22vw;
        border: 0.2vw solid white;
        background: none;
        border-radius: 2vw;
        color: #4287f5;
        font-size: 1.3vw;
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
const FlexRow= styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 4vw;
`
const OneSide = styled.div`
    width: 45%;
`
const MiniHeader= styled.p`
    font-size: 1.5vw;
    color: #4287f5
`

// ----- component -----

class AddFlight extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            arrival: '',
            departure: '',
            seatsNumber: 0,
            price: 0,
            tourists: []
        }
    }
    // ----- submit form and add flight -----

    add = () => {
        if (this.state.id && this.state.seatsNumber && this.state.price && this.state.arrival) { // checking data
            this.props.addFlight(this.state)

            // ----- add new flight to selected tourists

            for (let i = 0; i < this.state.tourists.length; i++) {
                this.props.addTouristToFlight({
                    tourist: this.state.tourists[i],
                    flight: this.state.id
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

    // ----- delete tourist from flight -----

    delTuristFromFlight = (touristName) => {
        let touristList = this.state.tourists
        for (let i = 0; i < this.state.tourists.length; i++) {
            if (this.state.tourists[i] === touristName) {
                touristList.splice(i, 1)
            }
        }

        this.setState({ tourist: touristList })
    }

    // ----- add tourist to flight -----

    addTourits = (id) => {
        if (this.isAvaliable()) {
            let touristList = this.state.tourists;
            touristList.push(id)
            this.setState({ tourists: touristList })
        }
        else {
            alert('NO SEATS AVALIABLE !')
        }

    }

    // ----- avaliable seats control -----

    isAvaliable = () => {
        console.log(this.state, 'i')
        if (this.state.seatsNumber > this.state.tourists.length)
            return true;
        else
            return false;
    }

    render() {
        return (
            <div>
                <Heading>ADD A FLIGHT</Heading>
                <Forms>
                    <Label> ID: <input type='text' value={this.state.id} onChange={(e) => { this.changeValue(e, 'id') }}  /></Label>
                    <Label>ARRIVAL TIME: <input type='text' value={this.state.arrival} onChange={(e) => { this.changeValue(e, 'arrival') }}  /></Label>
                    <Label>DEPERTURE TIME: <input type='text' value={this.state.departure} onChange={(e) => { this.changeValue(e, 'departure') }}  /></Label>
                    <Label>SEATS NUMBER: <input type='number' value={this.state.seatsNumber} onChange={(e) => { this.changeValue(e, 'seatsNumber') }} /></Label>
                    <Label> PRICE: <input type='text' value={this.state.price} onChange={(e) => { this.changeValue(e, 'price') }} /></Label>
                </Forms>
                <Heading>Tourists :</Heading>
                <FlexRow>
                    <OneSide>
                        
                        <MiniHeader>Current tourists in this flight :</MiniHeader>
                    {
                            // ----- showing list of tourist in flight with full name -----

                            this.props.tourists.map((i, index) => {
                                let tourist = this.state.tourists.map((j, index2) => {
                                    if (i.id === j) {
                                        return <div key={index2}>
                                            {i.firstName + ' ' + i.secoundName + ' ( ' + i.id + ' ) '}<Action onClick={() => { this.delTuristFromFlight(i.id) }}><Icon mini src={xicon} alr='cancel' /></Action>
                                        </div>
                                    }
                                })
                                return tourist
                            })
                        }
                    </OneSide>
                    <OneSide>
                        <MiniHeader>Add flight :</MiniHeader>
                    {
                            // ----- showing list of tourist that you can add to flight -----

                            this.props.tourists.map((i, index) => {
                                var isUserinflight = false;
                                let tourist = this.state.tourists.map((j, index2) => {
                                    if (i.id === j)
                                        isUserinflight = true;
                                })
                                if (!isUserinflight) {
                                    tourist = <div key={index}>
                                        {i.firstName + ' ' + i.secoundName + ' ( ' + i.id + ' ) '}<Action onClick={() => { this.addTourits(i.id) }}><Icon mini src={plusIcon} alr='add' /></Action>
                                    </div>
                                }
                                return tourist
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
    tourists: state.tourists.list
})

const mapDispatchToProps = {
    addFlight: action => addFlightToDatabase(action),
    addTouristToFlight: action => addTouristFlightDatabase(action)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFlight);