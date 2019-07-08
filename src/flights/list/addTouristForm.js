// ---------------  form with adding new tourists to flight  ---------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {addTouristFlightDatabase, delFlightFromTouristDatabase} from '../../tourists/duck/operations'
import {addTouristToFlightDatabase, delTouristFromFlightDatabase} from '../duck/operations'

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
`
const Icon = styled.img`
    width: 1vw;
`
const Action = styled.button`
    padding: 0.3vw;
    background: none;
    cursor: pointer;
    ${
        props=> props.corner
        ?
        'position: absolute;right: 0.2vw;top: 0.2vw;'
        :
        'background-color: none'
    }
    
`

// ----- component -----

class AddTouristForm extends Component {

    // ----- delete tourist from flight -----

    delTuristFromFlight = async (touristName, flightName) => {
        let action = {
            tourist: touristName,
            flight: flightName
        }
        await this.props.delTouristFromFlight(action)
        await this.props.delTouristsFlight(action)

        this.setState({})
    }

    // ----- add tourist to flight -----

    addTourits = async (id, flightId) => {
        let action = {
            flight: flightId,
            tourist: id
        }
        if (this.isAvaliable()) {
            await this.props.addUserToFlight(action)
            await this.props.addFlightToUser(action)

            this.setState({})
        }
        else {
            alert('NO SEATS AVALIABLE !')
        }


        
    }

    // ----- avaliable seats control -----

    isAvaliable = () => {
        if (this.props.seats > this.props.touristsInFlight.length)
            return true;
        else
            return false;
    }

    render() {
        return (
            <Container>
                <Action corner onClick={this.props.hide}><Icon src={xIcon} alt='x'/></Action>
                <h2>Flight: {this.props.flightName}</h2>
                <MiniHeader>Avaliable seats: {this.props.seats - this.props.touristsInFlight.length}/{this.props.seats}</MiniHeader>
                <FlexRow>
                    <OneSide>
                        <MiniHeader>Current tourists :</MiniHeader>
                    {
                            // ----- showing list of tourist in flight with full name -----

                            this.props.tourists.map((i, index) => {
                                let tourist = this.props.touristsInFlight.map((j, index2) => {
                                    if (i.id === j) {
                                        return <div key={index2}>
                                            {i.firstName + ' ' + i.secoundName + ' ( ' + i.id + ' ) '}<Action onClick={() => { this.delTuristFromFlight(i.id, this.props.flightName) }}><Icon src={xIcon} alt='x'/></Action>
                                        </div>
                                    }
                                })
                                return tourist
                            })
                        }
                    </OneSide>
                    <OneSide>
                        <MiniHeader>Add tourist :</MiniHeader>
                    {
                            // ----- showing list of tourist that you can add to flight -----

                            this.props.tourists.map((i, index) => {
                                var isUserinflight = false;
                                let tourist = this.props.touristsInFlight.map((j, index2) => {
                                    if (i.id === j)
                                        isUserinflight = true;
                                })
                                if (!isUserinflight) {
                                    tourist = <div key={index}>
                                        {i.firstName + ' ' + i.secoundName + ' ( ' + i.id + ' ) '}<Action onClick={() => { this.addTourits(i.id, this.props.flightName) }}><Icon src={plusIcon} alt='+'/></Action>
                                    </div>
                                }
                                return tourist
                            })
                        }
                    </OneSide>
                </FlexRow>

            </Container>
        );
    }
}
AddTouristForm.propTypes = {
    touristsInFlight: PropTypes.array.isRequired,
    flightName: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
    tourists: state.tourists.list
})

const mapDispatchToProps = dispatch => ({
    delTouristFromFlight: action => dispatch(delTouristFromFlightDatabase(action)),
    delTouristsFlight: action => dispatch(delFlightFromTouristDatabase(action)),
    addUserToFlight: action => dispatch(addTouristToFlightDatabase(action)),
    addFlightToUser: action => dispatch(addTouristFlightDatabase(action))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddTouristForm);