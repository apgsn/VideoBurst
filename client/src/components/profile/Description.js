import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/userActions.js";

class Description extends Component {
  render() {
    const { profile } = this.props;

    return (
      <React.Fragment>
        <h4 className="my-3">About this user</h4>
        <p className="bio">
          {profile.bio ? (
            <span>{profile.bio}</span>
          ) : (
            <span class="font-italic">
              {profile.username} doesn't have a bio
            </span>
          )}
        </p>
        <h4 className="my-3">Social</h4>
        {Object.keys(profile.social).length ? (
          <div className="row social">
            {profile.social && profile.social.youtube ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            ) : null}
            {profile.social && profile.social.twitter ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            ) : null}
            {profile.social && profile.social.facebook ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            ) : null}
            {profile.social && profile.social.instagram ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            ) : null}
            {profile.social && profile.social.website ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-2x" />
              </a>
            ) : null}
          </div>
        ) : (
          <span class="font-italic">
            {profile.username} is not a social type
          </span>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfile }
)(Description);
