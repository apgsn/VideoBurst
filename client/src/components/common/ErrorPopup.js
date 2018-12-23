import React, { Component } from "react";
import { connect } from "react-redux";
import { popErrors } from "../../actions/authActions";

import "./ErrorPopup.css";

class ErrorPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors !== this.props.errors) {
      this.setState({ visible: true });
    }
    if (!nextProps.errors) {
      this.setState({ visible: false });
    }
  }

  onClick = () => {
    this.setState({ visible: false });
    this.props.popErrors();
  };

  render() {
    let errors = this.props.errors;
    let classes = this.state.visible ? "" : "hide ";
    classes += "error-popup alert alert-dismissible fade show";

    // Some errors (eg. Unauthorized) are just plain strings
    // instead of objects. In this case, wrap an object around it.
    if (typeof errors === "string") {
      errors === "Unauthorized"
        ? (errors = "Please access your account to use this feature")
        : (errors = "Internal error, please try again later");
      errors = { singleError: errors };
    }

    return (
      <React.Fragment>
        {Object.keys(errors).length ? (
          <div className={classes} role="alert">
            <i className="fas fa-exclamation-triangle" />
            &nbsp; Whoops, something went wrong!
            <ul>
              {Object.values(errors).map((err, index) => (
                <li key={index}> {err}</li>
              ))}
            </ul>
            <button
              type="button"
              className="error-popup-cross"
              onClick={this.onClick}
            >
              &nbsp; &times;
            </button>
          </div>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { popErrors }
)(ErrorPopup);
