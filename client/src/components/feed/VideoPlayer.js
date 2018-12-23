import React, { Component } from "react";
import AnimateHeight from "react-animate-height";
import { connect } from "react-redux";
import { likeVideo } from "../../actions/videoActions.js";
import "./VideoPlayer.css";

import Like from "../common/Like.js";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 430
    };
  }

  toggleView = () => {
    this.setState({
      height: this.state.height === 70 ? 430 : 70
    });
  };

  render() {
    return (
      <AnimateHeight duration={500} height={this.state.height}>
        <div className="player-container">
          <iframe
            className="youtube-player"
            title="Youtube player"
            width="480"
            height="315"
            src="https://www.youtube.com/embed/1FGtd3oH_PQ"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            autoplay="0"
          />
          <div>
            <i
              className="fas fa-times player-cross"
              onClick={this.toggleView}
            />
            {/*<Like />*/}
          </div>
        </div>
      </AnimateHeight>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { likeVideo }
)(VideoPlayer);
