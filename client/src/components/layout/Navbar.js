import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import "./Navbar.css";

import SearchBar from "../feed/SearchBar";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const auth = this.props.auth.isAuthenticated;
    return (
      <nav className="navbar navbar-fixed-top mb-4 navbar-expand-sm navbar-dark ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="fab fa-youtube" />
            &nbsp; VideoBurst
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <SearchBar />
              </li>
              <li className="nav-item my-2">
                <Link className="nav-link" to="/leaderboard">
                  Leaderboard
                </Link>
              </li>
              {!auth && (
                <React.Fragment>
                  <li className="nav-item my-2">
                    <Link className="nav-link" to="/register">
                      Sign Up
                    </Link>
                  </li>
                  <li className="nav-item my-2">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </React.Fragment>
              )}
              {auth && (
                <li className="nav-item my-2" onClick={this.onLogout}>
                  <div className="nav-link logout">Logout</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
