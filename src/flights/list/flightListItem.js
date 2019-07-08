// ---------------  FLIGHT LIST ITEM  ---------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddTouristForm from './addTouristForm'

import editIcon from '../../assets/edit.png';
import xIcon from '../../assets/x.png'

// ----------  style  ----------

const FlightInfo = styled.p`
    width: 13vw;
    text-align: center;
    font-size: 1.2vw;
    padding: 1vw 0;
    margin: 0.5vw 0;
    height: 4vw;
`
const Container = styled.div`
    margin: ${props=> props.default?'1vw 0':'0.5vw 0'};
    background-color: ${props=> props.default?'#4287f5':'none'};
    border:${props=> props.default?'':'0.1vw solid #4287f5'};
    border-radius: 2vw;
    display: flex;
    flex-direction: row;
    width: 95vw;
    justify-content: space-evenly;
    & > p {
        color: ${props=> props.default?'black':'none'};
    }
`
const Action = styled.button`
    width: 45%;
    background: none;
    cursor: pointer
`
const Icon = styled.img`
    width: 1vw;
`

// ----------  component  ----------

class FlightListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addTourist: false
        }
    }

    // ----- showing form with avaliable users -----

    addTourist= ()=>{
        this.setState({
            addTourist: !this.state.addTourist
        })
    }

    render() {
        return (
            <Container default={this.props.default}>
                <FlightInfo>{this.props.name}</FlightInfo>
                {
                    // ----- tourists list -----

                    this.props.default
                        ?
                        <FlightInfo>{this.props.tourists[0]}</FlightInfo>
                        :
                        <FlightInfo>{this.props.tourists.length}<Action onClick={this.addTourist}><Icon src={editIcon} alt='add'/></Action></FlightInfo>


                }
                {
                    // ----- heading or number of avaliable seats -------

                    this.props.seatsText
                        ?
                        <FlightInfo>{this.props.seatsText}</FlightInfo>
                        :
                        <FlightInfo>{`${this.props.seats - this.props.tourists.length}/${this.props.seats}`}</FlightInfo>
                }

                <FlightInfo>{this.props.price}</FlightInfo>
                <FlightInfo>{this.props.departure}</FlightInfo>
                <FlightInfo>{this.props.arrival}</FlightInfo>

                {
                    // ----- delete, edit -----

                    this.props.default
                        ?
                        <FlightInfo>DELETE</FlightInfo>
                        :
                        <FlightInfo>
                            <Action onClick={() => { this.props.del(this.props.name) }}><Icon src={xIcon} alt='x'/></Action>
                        </FlightInfo>
                }
                {
                    // ----- add tourist to flight form -----

                    this.state.addTourist
                    ?
                    <AddTouristForm hide={this.addTourist} flightName={this.props.name} touristsInFlight={this.props.tourists} seats={this.props.seats} />
                    :
                    <div>

                    </div>
                }


            </Container>
        );
    }

};

FlightListItem.propTypes = {
    name: PropTypes.string.isRequired,
    tourists: PropTypes.array.isRequired,
    seats: PropTypes.number.isRequired,
    arrival: PropTypes.string.isRequired,
    departure: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired
};

export default FlightListItem;