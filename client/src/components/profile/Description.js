import React, { Component } from "react";
import { connect } from "react-redux";
import { changeBio } from "../../actions/userActions.js";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingBio: false,
      editingSocial: false,
      bio: "",
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      website: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bio: this.props.profile.bio });
  }

  onBioIconClick = e => {
    e.preventDefault();
    this.setState({ editingBio: !this.state.editingBio });
  };

  onBioChange = e => {
    this.setState({ bio: e.target.value });
  };

  onBioSubmit = e => {
    e.preventDefault();
    this.onBioIconClick(e);
    console.log(this.state.bio);
    this.props.changeBio({ bio: this.state.bio });
  };

  render() {
    const { profile } = this.props;
    const { isAuthenticated } = this.props.auth;
    const personal =
      isAuthenticated && profile.username === this.props.auth.user.username;
    return (
      <React.Fragment>
        <h4 className="my-3">
          About this user{" "}
          {personal ? (
            <i
              className="fas fa-edit text-primary edit mx-2"
              style={{ cursor: "pointer" }}
              onClick={this.onBioIconClick}
            />
          ) : null}
        </h4>
        {this.state.editingBio ? (
          <form
            className="form-inline"
            autoComplete="off"
            onSubmit={this.onBioSubmit}
            type="submit"
            value="submit"
          >
            <textarea onChange={this.onBioChange} value={this.state.bio} />
            <button className="btn btn-primary mx-1" type="submit">
              <i className="fas fa-arrow-circle-right" />
            </button>
          </form>
        ) : (
          <p className="bio">
            {profile.bio ? (
              <span>{profile.bio}</span>
            ) : (
              <span className="font-italic">
                {profile.username} doesn't have a bio
              </span>
            )}
          </p>
        )}
        <h4 className="my-3">Social</h4>
        {profile.social && Object.keys(profile.social).length ? (
          <div className="row social">
            {profile.social.youtube ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube fa-2x" />
              </a>
            ) : null}
            {profile.social.twitter ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter fa-2x" />
              </a>
            ) : null}
            {profile.social.facebook ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook fa-2x" />
              </a>
            ) : null}
            {profile.social.instagram ? (
              <a
                className=" p-2"
                href={"https://" + profile.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram fa-2x" />
              </a>
            ) : null}
            {profile.social.website ? (
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
          <span className="font-italic">
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
  { changeBio }
)(Description);
