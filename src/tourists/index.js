// ---------------  TOURISTS MAIN COMPONENT  ----------------

import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import TouristsList from './list/touristsList'

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

class TouristsMainComponent extends Component {

    render() {
        return (
            <div>
                <Heading>TOURISTS</Heading>
                <Link to={'/touristsAdd'}><Icon src={plusIcon} alt='add'/></Link>
                <TouristsList/>

            </div>
        );
    }
}

export default TouristsMainComponent;