// ---------------  MENU COMPONENT  ---------------

import React from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types';
import styled from 'styled-components'

// ----------  style  ----------

var Button = styled.p`
    width: 25vw;
    margin: 0 5vw;
    font-size: 1.5vw;
    cursor: pointer;
    color: #4287f5;
    border-radius: 2vw;
`
const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
`

// ---------- component  ----------

const index = props => {
    return (
        <FlexRow>
            {
                props.data.map((item, index) =>
                    <NavLink exact={true} activeClassName='is-active' to={`/${item.toLowerCase()}`} key={index}><Button>{item}</Button></NavLink>
                )
            }
        </FlexRow>

    );
};

index.propTypes = {
    data: PropTypes.array.isRequired
};

export default index;