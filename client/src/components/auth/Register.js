import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import Input from "../common/Input";
import ErrorPopup from "../common/ErrorPopup";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div id="register" style={{ marginTop: "100px" }}>
        <div className="w-50 bg-light p-3 mb-2 border rounded shadow border-grey container custom-control ">
          <h3>Sign up</h3>
          <form onSubmit={this.onSubmit}>
            <Input
              name="username"
              placeholder="Username"
              errors={this.props.errors.username}
              onChange={this.onChange}
            />
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
            <Input
              name="password2"
              placeholder="Repeat password"
              type="password"
              errors={this.props.errors.password2}
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
  { registerUser }
)(Register);
