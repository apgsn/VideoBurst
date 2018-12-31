import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile, deleteUser } from "../../actions/userActions.js";

import Video from "../common/Video.js";
import Description from "./Description.js";

class PublicProfile extends Component {
  componentDidMount() {
    const username = this.props.match.params.username;
    if (username) {
      this.props.getProfile(username);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.video !== this.props.video ||
      this.props.match !== nextProps.match
    ) {
      this.props.getProfile(nextProps.match.params.username);
    }
  }

  onDeleteUser = e => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to delete your account?\nThis cannot be undone."
      )
    ) {
      this.props.deleteUser(this.props.history);
    }
  };

  render() {
    const { profile } = this.props.user;
    const { isAuthenticated } = this.props.auth;
    const personal =
      isAuthenticated && profile.username === this.props.auth.user.username;
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

        <Description personal={personal} />

        {personal && (
          <div className="container">
            <div className="row">
              <button
                type="button"
                className="btn btn-danger my-4"
                onClick={this.onDeleteUser}
              >
                Delete Account
              </button>
            </div>
          </div>
        )}

        {profile.uploads && Boolean(profile.uploads.length) && (
          <React.Fragment>
            <h4 className="my-3">Uploads</h4>
            <div className="feed profile">
              {profile.uploads.map((video, index) => {
                return <Video key={index} video={video} />;
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  video: state.video
});

export default connect(
  mapStateToProps,
  { getProfile, deleteUser }
)(PublicProfile);
