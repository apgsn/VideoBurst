import React, { Component } from "react";
import { connect } from "react-redux";
import { likeVideo } from "../../actions/videoActions";
import "./Like.css";

class Like extends Component {
  onClick = e => {
    console.log("clicky");
    this.props.likeVideo(this.props.videoElem.videoId);
  };

  isLiked = () => {
    const userId = this.props.auth.isAuthenticated
      ? this.props.auth.user.id
      : null;
    const liked = this.props.videoElem.likes
      .map(like => like._id)
      .filter(like => like === userId).length;
    return liked ? " liked" : "";
  };

  render() {
    const classes = "col panel-icon-like " + this.isLiked();
    return (
      <div className={classes} onClick={this.onClick}>
        <i className="panel-icons fas fa-heart" />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  video: state.video,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { likeVideo }
)(Like);
