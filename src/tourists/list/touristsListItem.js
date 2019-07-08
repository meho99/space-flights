// ---------------  TOURISTS LIST ITEM  ---------------

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AddFlightForm from './addFlightForm'

import editIcon from '../../assets/edit.png';
import xIcon from '../../assets/x.png'

// ----------  style  ----------

const TouristInfo = styled.div`
    width: 13vw;
    text-align: center;
    font-size: 1.2vw;
    padding: 1vw 0;
    margin: 0.5vw 0;
    height: 4vw;
`
const Container = styled.div`
    margin: ${props => props.default ? '1vw 0' : '0.5vw 0'};
    background-color: ${props => props.default ? '#4287f5' : 'none'};
    border:${props => props.default ? '' : '0.1vw solid #4287f5'};
    border-radius: 2vw;
    display: flex;
    flex-direction: row;
    width: 95vw;
    justify-content: space-evenly;
    & > div {
        color: ${props => props.default ? 'black' : 'none'};
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

class TouristListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addFlight: false
        }
    }

    // ----- showing form with avaliable users -----

    addFlight = () => {
        this.setState({
            addFlight: !this.state.addFlight
        })
    }

    render() {
        return (
            <Container default={this.props.default}>
                <TouristInfo>{this.props.fullName}</TouristInfo>
                <TouristInfo>
                    {
                        // ----- number of flights or heading -----

                        this.props.default
                            ?
                            this.props.flights
                            :
                            <div>
                                {this.props.flights.length}
                                <Action onClick={this.addFlight}><Icon src={editIcon} alt='add'/></Action>
                            </div>

                    }
                </TouristInfo>
                <TouristInfo>{this.props.id}</TouristInfo>
                <TouristInfo>{this.props.country}</TouristInfo>
                <TouristInfo>{this.props.sex}</TouristInfo>
                <TouristInfo>{this.props.birth}</TouristInfo>
                <TouristInfo>{this.props.notes}</TouristInfo>
                {
                    // ----- delete, edit -----

                    this.props.default
                        ?
                        <TouristInfo>DELETE</TouristInfo>
                        :
                        <TouristInfo>
                            <Action onClick={() => { this.props.del(this.props.id) }}><Icon src={xIcon} alt='x'/></Action>
                        </TouristInfo>
                }
                {
                    // ----- add flights to tourist form -----

                    this.state.addFlight
                        ?
                        <AddFlightForm hide={this.addFlight} tourist={this.props.fullName} id={this.props.id} touristFlights={this.props.flights} />
                        :
                        <div>

                        </div>
                }
            </Container>
        );
    }

};

TouristListItem.propTypes = {
    fullName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    sex: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    birth: PropTypes.string.isRequired,
    del: PropTypes.func.isRequired
};

export default TouristListItem;