import React, { Component } from "react";
import "./ErrorPopup.css";

class ErrorPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }

  onClick = () => {
    this.setState({ visible: false });
  };

  render() {
    console.log(this.props.error);
    let classes = this.state.visible ? "" : "hide ";
    classes += "error-popup alert alert-dismissible fade show";
    return (
      <div className={classes} role="alert">
        {this.props.error}
        <button
          type="button"
          className="error-popup-cross"
          onClick={this.onClick}
        >
          &nbsp; &times;
        </button>
      </div>
    );
  }
}
export default ErrorPopup;
