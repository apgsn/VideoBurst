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
    //console.log(errors);
    let classes = this.state.visible ? "" : "hide ";
    classes += "error-popup alert alert-dismissible fade show";

    // Some errors (eg. Unauthorized) are being sent as plain strings
    // instead of objects. In this case, convert to object
    if (typeof errors === "string") {
      if (errors === "Unauthorized") {
        errors = "Please access your account to use this feature";
      } else {
        errors = "Internal error, please try again later";
      }
      errors = { error: errors };
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
