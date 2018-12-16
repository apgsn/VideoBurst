import React, { Component } from "react";
import { connect } from "react-redux";
import { addVideo } from "../../actions/videoActions";
import "./SearchBar.css";

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
  };

  render() {
    return (
      <div className="nav-link">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="inner-row">
            <input
              className="form-control"
              type="search"
              aria-label="Paste a YouTube link here"
              onChange={this.onChange}
              placeholder="Paste a YouTube link here"
            />
            <button className="btn btn-danger mx-1" type="submit">
              <i class="fas fa-arrow-circle-right" />
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  video: state.video,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addVideo }
)(SearchBar);
