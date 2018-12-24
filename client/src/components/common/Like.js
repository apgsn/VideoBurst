import React, { Component } from "react";
import { connect } from "react-redux";
import { likeVideo } from "../../actions/videoActions";
import "./Like.css";

class Like extends Component {
  onClick = e => {
    this.props.likeVideo(this.props.video, this.props.videoState.nowPlaying);
  };

  isLiked = () => {
    if (!Object.keys(this.props.video).length) return "";

    const userId = this.props.auth.isAuthenticated
      ? this.props.auth.user.id
      : null;
    const liked = this.props.video.likes
      .map(like => like._id)
      .filter(like => like === userId).length;
    return liked ? " liked" : "";
  };

  render() {
    const classes = "col panel-icon-like " + this.isLiked();
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
