import React, { Component } from "react";
import Video from "../common/Video";
import { connect } from "react-redux";
import { loadVideos } from "../../actions/videoActions.js";
import "./VideoCollection.css";

class VideoCollection extends Component {
  componentDidMount() {
    this.props.loadVideos();
  }

  render() {
    return (
      <div className="feed">
        {this.props.video.videoList.map((video, index) => (
          <Video video={video} key={index} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video
});

export default connect(
  mapStateToProps,
  { loadVideos }
)(VideoCollection);
