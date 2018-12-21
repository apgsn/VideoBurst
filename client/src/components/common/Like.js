import React, { Component } from "react";
import { connect } from "react-redux";
import { likeVideo } from "../../actions/videoActions";
import "./Like.css";

class Like extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  onClick = e => {
    console.log("clicky");
    this.props.likeVideo(this.props.videoElem.videoId);
  };

  render() {
    const auth = this.props.auth.isAuthenticated;
    const userId = auth ? this.props.auth.user.id : null;
    const likesList = this.props.videoElem.likes.map(likes => likes._id);
    console.log(likesList);
    const color = likesList.filter(like => like === userId).length
      ? "liked"
      : "";
    console.log(color);
    const classes = "col panel-icon-like " + color;
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
