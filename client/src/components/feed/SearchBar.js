import React, { Component } from "react";
import { connect } from "react-redux";
import { addVideo } from "../../actions/videoActions";

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
    this.props.addVideo([encodeURIComponent(this.state.input)]);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onChange}
            type="text"
            placeholder="Paste a YouTube link here"
          />
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
