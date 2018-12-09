import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Feed from "./components/feed/Feed";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Feed} />
        </Router>
      </div>
    );
  }
}

export default App;
