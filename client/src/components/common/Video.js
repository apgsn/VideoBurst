import React, { Component } from "react";

class Video extends Component {
  render() {
    const { video, key } = this.props;
    console.log(video);
    return (
      <div className="video" key={key}>
        <img src={video.thumbnail} alt={video.title} />
      </div>
    );
  }
}
export default Video;
