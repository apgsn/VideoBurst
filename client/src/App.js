import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./actions/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import VideoCollection from "./components/feed/VideoCollection";
import Leaderboard from "./components/leaderboard/Leaderboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import VideoPlayer from "./components/feed/VideoPlayer";
import PublicProfile from "./components/profile/PublicProfile";

// IIFE for automatic check of expired tokens (every minute)
(() => {
  setInterval(() => {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decoded));
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser("expired token"));
      }
    }
  }, 60000);
})();

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
              <Route exact path="/u/:username" component={PublicProfile} />
            </Switch>
            <Footer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}
export default App;
