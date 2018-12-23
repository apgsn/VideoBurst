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
    console.log(Object.keys(this.props.errors));
    return (
      <div id="register" style={{ marginTop: "100px" }}>
        <div className="container custom-control ">
          <form onSubmit={this.onSubmit}>
            <Input
              name="username"
              placeholder="username"
              errors={this.props.errors.username}
              onChange={this.onChange}
            />
            <Input
              name="email"
              placeholder="email"
              errors={this.props.errors.email}
              onChange={this.onChange}
            />
            <Input
              name="password"
              placeholder="password"
              type="password"
              errors={this.props.errors.password}
              onChange={this.onChange}
            />
            <Input
              name="password2"
              placeholder="repeat password"
              type="password"
              errors={this.props.errors.password2}
              onChange={this.onChange}
            />
            <input type="submit" className="btn btn-info btn-block mt-4" />
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
