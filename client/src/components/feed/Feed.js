import React, { Component } from "react";
import VideoCollection from "./VideoCollection";
import "./Feed.css";

export default class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <VideoCollection />
      </div>
    );
  }
}
