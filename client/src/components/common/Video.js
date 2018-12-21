import React, { Component } from "react";
import Like from "./Like";
import "./Video.css";

class Video extends Component {
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
                  <i className="panel-icons fas fa-play" />
                </div>
                <Like videoElem={video} />
              </div>
            </div>
          </div>
        </div>
        <img src={video.thumbnail} alt={video.title} />
      </div>
    );
  }
}
export default Video;
