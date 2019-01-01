import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import Input from "../common/Input";
import ErrorPopup from "../common/ErrorPopup";
import "./Auth.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newLogin = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(newLogin, this.props.history);
  };
  render() {
    return (
      <div id="login" className="auth-form">
        <div className="bg-light p-3 mb-2 border rounded shadow border-grey ">
          {" "}
          <h3>Log in</h3>
          <form onSubmit={this.onSubmit}>
            <Input
              name="email"
              placeholder="Email"
              errors={this.props.errors.email}
              onChange={this.onChange}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              errors={this.props.errors.password}
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-success btn-block mt-4" />
          </form>
          <ErrorPopup />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
