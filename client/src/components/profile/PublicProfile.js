import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/userActions.js";
import "./PublicProfile.css";

class PublicProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfile(this.props.match.params.username);
    }
  }

  render() {
    const { profile } = this.props.user;
    return (
      <div className="container my-3">
        <div className="row">
          <svg
            width="120"
            height="120"
            data-jdenticon-value={profile.username}
            className="rounded shadow"
          />
          <div className="col my-1">
            <h1>{profile.username}</h1>
            <div className="my-1">Likes given: {profile.likesGiven}</div>
            <div className="my-1">Likes received: {profile.likesCount}</div>
          </div>
        </div>
        <h4 className="my-4">Uploads:</h4> {/*TODO*/}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { getProfile }
)(PublicProfile);
