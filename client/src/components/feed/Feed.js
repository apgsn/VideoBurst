import React, { Component } from "react";
import SearchBar from "./SearchBar";
import VideoCollection from "./VideoCollection";

export default class Feed extends Component {
  render() {
    return (
      <div id="feed">
        <SearchBar />
        <VideoCollection />
      </div>
    );
  }
}
