import React, { Component } from "react";
import AnimateHeight from "react-animate-height";
import { connect } from "react-redux";
import { closeVideo } from "../../actions/videoActions.js";
import "./VideoPlayer.css";

import SecondIcon from "../common/SecondIcon.js";

const HEIGHT_CLOSED = 70;
const HEIGHT_OPEN = 430;

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: HEIGHT_CLOSED
    };
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.video.nowPlaying).length) {
      this.setState({ height: HEIGHT_OPEN });
    }
    if (!Object.keys(nextProps.video.nowPlaying).length) {
      this.setState({ height: HEIGHT_CLOSED });
    }
  }

  toggleView = () => {
    this.props.closeVideo();
  };

  render() {
    const nowPlaying = this.props.video.nowPlaying;
    console.log();
    return (
      nowPlaying && (
        <AnimateHeight duration={500} height={this.state.height}>
          <div className="player-container">
            <iframe
              className="youtube-player"
              title="Youtube player"
              width="560"
              height="315"
              src={
                "https://www.youtube.com/embed/" +
                nowPlaying.videoId +
                "?autoplay=1"
              }
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div>
              <i
                className="fas fa-times player-cross"
                onClick={this.toggleView}
              />
              <SecondIcon video={nowPlaying} />
            </div>
          </div>
        </AnimateHeight>
      )
    );
  }
}

const mapStateToProps = state => ({
  video: state.video
});

export default connect(
  mapStateToProps,
  { closeVideo }
)(VideoPlayer);
