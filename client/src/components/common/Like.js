import React, { Component } from "react";
import { connect } from "react-redux";
import { likeVideo } from "../../actions/videoActions";

class Like extends Component {
  onClick = e => {
    this.props.likeVideo(this.props.video, this.props.videoState.nowPlaying);
  };

  render() {
    const classes =
      "col panel-icon-like " + (this.props.isLiked ? "liked" : "");

    return (
      <div className={classes}>
        <i className="panel-icons fas fa-heart" onClick={this.onClick} />
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
  { likeVideo }
)(Like);
