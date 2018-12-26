import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteVideo } from "../../actions/videoActions";

class Trash extends Component {
  onClick = e => {
    this.props.deleteVideo(this.props.video, this.props.videoState.nowPlaying);
  };

  render() {
    return (
      <div className="col trash">
        <i className="panel-icons fas fa-trash" onClick={this.onClick} />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  videoState: state.video
});

export default connect(
  mapStateToProps,
  { deleteVideo }
)(Trash);
