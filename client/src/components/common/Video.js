import React, { Component } from "react";
import "./Video.css";

class Video extends Component {
  render() {
    const { video, key } = this.props;
    console.log(video);
    return (
      <div className="video" key={key}>
        <div className="video-panel">
          <div className="m-2 mx-4">
            <div className="panel-title">{video.title}</div>
            <div className="panel-user user my-3">
              Uploaded by <strong>{video.user.username}</strong>
            </div>
            <div className="container">
              <div className="row my-9 text-center">
                <div className="col panel-icon-play">
                  <i className="panel-icons fas fa-play-circle" />
                </div>
                <div className="col panel-icon-like">
                  <i className="panel-icons fas fa-heart" />
                </div>
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
