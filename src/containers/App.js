import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { requestRobots, setSearchField } from '../action.js'

//console.log(searchField);

const mapStateToProps = state =>{
  return {
    searchField: state.setSearchField.searchField,
    robots: state.requsetRobots.robots,
    isPending: state.requsetRobots.isPending,
    error: state.requsetRobots.error
  }
}

const mapDispatchToProps = (dispacth) => {
  return {
    onSearchChange:(event) => dispacth(setSearchField(event.target.value)),
    onRequestRobots: () => dispacth(requestRobots())
}
}

class App extends Component {
componentDidMount() {
this.props.onRequestRobots();
  }

  render() {
    const { searchField, onSearchChange, robots, isPending} = this.props;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);