import React, { Component } from "react";
import CardList from "../Components/CardList";
// import { robots } from "./robots"; // its used staticaly for datad
import SearchBox from "../Components/SearchBox";
import "./App.css";
import Scroll from "../Components/Scroll";
import ErrorBoundry from "../Components/ErrorBoundry";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [], //robots
      searchfield: "",
    };
  }
  componentDidMount() {
    // this.setState({ robots: robots })
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ robots: users }));
  }
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robots) => {
      return robots.name
        .toLocaleLowerCase()
        .includes(searchfield.toLocaleLowerCase());
    });
    return !robots.length ? (
      <h1>Loding..</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">Robofriends</h1>
        {/* <hr /> */}
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
          <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
