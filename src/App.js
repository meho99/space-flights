// --------------------  application main component  --------------------

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Menu from './menu';
import FlightMainComponent from './flights';
import AddFlight from './flights/addFlight';
import TouristsMainContainer from './tourists';
import AddTourist from './tourists/addTourist'
import { getAllFlights } from './flights/duck/operations'
import { gelAllTourists } from './tourists/duck/operations'

// --------------- style ---------------

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.header`
  border-bottom: 0.2vw solid #0AA40C;
`
const Heading = styled.h1`
  margin: 2vw 0;
  font-size: 3vw;
  color: #4287f5;
`

// --------------- component ---------------

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: ['TOURISTS', 'FLIGHTS']
    }
  }
  // ----- fetch data ----

  componentDidMount = () => {
    this.props.getAllFlights()
    this.props.gelAllTourists()
  }
  render() {
    return (
      <MainContainer>
        <Header>
          <Heading>SPACE FLIGHTS MANAGER</Heading>
          <Menu data={this.state.menu} />
        </Header>


        {/*URL ADDRESSES MANAGING*/}
        <Switch>

          <Route exact path='/' component={FlightMainComponent} />
          <Route exact path='/flights' component={FlightMainComponent} />
          <Route path='/flights/add' component={AddFlight} />
          <Route path='/add' component={AddFlight} />
          <Route path='/tourists' component={TouristsMainContainer} />
          <Route path='/touristsAdd' component={AddTourist} />
        </Switch>
      </MainContainer>
    );
  }
}



const mapDispatchToProps = dispatch => ({
  getAllFlights: () => dispatch(getAllFlights()),
  gelAllTourists: ()=> dispatch(gelAllTourists())
})


export default connect(null, mapDispatchToProps)(App);