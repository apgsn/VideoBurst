import React, { Component } from "react";
import Like from "./Like";
import { playVideo } from "../../actions/videoActions.js";
import { connect } from "react-redux";

import "./Video.css";

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayerVisible: false
    };
  }

  onClick = e => {
    this.props.playVideo(this.props.video);
  };

  render() {
    const { video } = this.props;
    return (
      <div className="video">
        <div className="video-panel">
          <div className="m-2 mx-4">
            <div className="panel-title">{video.title}</div>
            <div className="panel-user user my-3">
              Uploaded by <strong>{video.user.username}</strong>
            </div>
            <div className="container">
              <div className="row my-9 text-center">
                <div className="col panel-icon-play">
                  <i
                    className="panel-icons fas fa-play"
                    onClick={this.onClick}
                  />
                </div>
                <Like video={video} />
              </div>
            </div>
          </div>
        </div>
        <img src={video.thumbnail} alt={video.title} />
      </div>
    );
  }
}
export default connect(
  null,
  { playVideo }
)(Video);
