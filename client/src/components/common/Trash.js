import React, { Component } from "react";
import { connect } from "react-redux";

import "./SecondIcon.css";

class Trash extends Component {
  onClick = e => {
    // TODO: delete video action
  };

  render() {
    return (
      <div className="col trash">
        <i className="panel-icons fas fa-trash" onClick={this.onClick} />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Trash);
