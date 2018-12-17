import React, { Component } from "react";
import VideoCollection from "./VideoCollection";

export default class Feed extends Component {
  render() {
    return (
      <div id="feed" style={{ marginTop: "100px" }}>
        <VideoCollection />
      </div>
    );
  }
}
