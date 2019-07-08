// ---------------  FLIGHT MAIN COMPONENT  ----------------

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import FlightList from './list/flightList'

import plusIcon from '../assets/+.png'


// ----------  style  ----------

const Heading = styled.h2`
    font-size: 2vw;
    margin: 2vw 0;
`
const Icon = styled.img`
    width: 2.5vw;
`

// ----------   component  ----------

class FlightMainComponent extends Component {

    render() {
        return (
            <div>
                <Heading>FLIGHTS</Heading>
                <Link to={'flights/add'}><Icon src={plusIcon} alt='add'/></Link>
                <FlightList/>
            </div>
        );
    }
}

export default FlightMainComponent;