import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import VideoCollection from "./components/feed/VideoCollection";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VideoPlayer from "./components/feed/VideoPlayer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Navbar />
            <VideoPlayer />
            <Switch>
              <Route exact path="/" component={VideoCollection} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/leaderboard" component={Leaderboard} />
            </Switch>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}
export default App;
