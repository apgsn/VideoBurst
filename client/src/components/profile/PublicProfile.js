import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/userActions.js";

import Video from "../common/Video.js";

class PublicProfile extends Component {
  componentDidMount() {
    const username = this.props.match.params.username;
    if (username) {
      this.props.getProfile(username);
    }
  }

  componentWillReceiveProps(nextProps) {
    const username = this.props.match.params.username;
    if (nextProps.video !== this.props.video) {
      this.props.getProfile(username);
    }
  }

  render() {
    const { profile } = this.props.user;
    return (
      this.props.user.profile !== {} && (
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
          {profile.uploads && Boolean(profile.uploads.length) && (
            <React.Fragment>
              <h4 className="my-4">Uploads:</h4>
              <div className="feed profile">
                {profile.uploads.map((video, index) => {
                  return <Video key={index} video={video} />;
                })}
              </div>
            </React.Fragment>
          )}
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  video: state.video
});

export default connect(
  mapStateToProps,
  { getProfile }
)(PublicProfile);
