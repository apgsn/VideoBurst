import React, { Component } from "react";

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
    console.log(this.state.input);
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("submitted");
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

export default SearchBar;
