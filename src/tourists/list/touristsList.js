// ---------------  TOURISTS LIST  ---------------

import React, { Component } from 'react';
import { connect } from 'react-redux';
import TouristsListItem from './touristsListItem';
import {deltouristFromAllDatabase} from '../../flights/duck/operations'
import { delTouristDatabase } from '../duck/operations';

// ----------  style  ----------



// ----------  component  ----------

class TouristsList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            default: {
                fullName: 'FULL NAME',
                id: 'ID',
                sex: 'GENDER',
                country: 'COUNTRY',
                birth: 'BIRTH DATE',
                notes: 'NOTES',
                flights: 'FLIGHTS'
            }
        }
    }

    //----- delete a flight function -----

    delete = (Id) => {
        this.props.delTourist(Id)
        this.props.delTouristFromAll(Id)
    }

    render() {
        return (
            <div>
                <TouristsListItem default fullName={this.state.default.fullName} id={this.state.default.id} sex={this.state.default.sex} country={this.state.default.country} birth={this.state.default.birth} notes={this.state.default.notes} flights={this.state.default.flights} del={this.delete}  />
                {

                    this.props.tourists.list.map((item, index) => {
                        if (item.id)
                            return <TouristsListItem fullName={item.firstName+' '+item.secoundName} id={item.id} sex={item.sex} country={item.country} birth={item.birth} flights={item.flights} notes={item.notes} del={this.delete} key={index} />

                    })
                }
            </div >
        );
    }

};

const mapStateToProps = state => ({
    tourists: state.tourists
})

const mapDispatchToProps = dispatch => ({
    delTourist: action => dispatch(delTouristDatabase(action)),
    delTouristFromAll: action => dispatch(deltouristFromAllDatabase(action))
})


export default connect(mapStateToProps, mapDispatchToProps)(TouristsList);