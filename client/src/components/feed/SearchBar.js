import React, { Component } from "react";
import { connect } from "react-redux";
import { addVideo, loadVideos } from "../../actions/videoActions";
import "./SearchBar.css";

import Input from "../common/Input";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.input);
    this.props.addVideo({ videoUrl: this.state.input });
    this.props.loadVideos();
  };

  render() {
    return (
      <div className="nav-link">
        <form className="form-inline" onSubmit={this.onSubmit}>
          {this.props.auth.isAuthenticated && (
            <div className="inner-row">
              <Input
                name="youtube-search"
                placeholder="Paste a YouTube link here"
                type="search"
                onChange={this.onChange}
                errors={this.props.errors.video}
              />
              <button className="btn btn-danger mx-1" type="submit">
                <i className="fas fa-arrow-circle-right" />
              </button>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video,
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addVideo, loadVideos }
)(SearchBar);
