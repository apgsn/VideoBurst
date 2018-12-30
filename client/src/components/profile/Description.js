import React, { Component } from "react";
import { connect } from "react-redux";
import { changeDescription, getProfile } from "../../actions/userActions.js";

import Input from "../common/Input.js";

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
    if (nextProps.user.profile.bio !== this.props.user.profile.bio) {
      this.setState({
        bio: nextProps.user.profile.bio
      });
    }
    if (nextProps.user.profile.social !== this.props.user.profile.social) {
      this.setState({
        youtube: nextProps.user.profile.social.youtube,
        twitter: nextProps.user.profile.social.twitter,
        facebook: nextProps.user.profile.social.facebook,
        instagram: nextProps.user.profile.social.instagram,
        website: nextProps.user.profile.social.website
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onBioIconClick = e => {
    e.preventDefault();
    this.setState({ editingBio: !this.state.editingBio });
  };

  onBioSubmit = e => {
    e.preventDefault();
    this.onBioIconClick(e);
    this.props.changeDescription({ data: this.state.bio, type: "bio" });
  };

  onSocialIconClick = e => {
    e.preventDefault();
    this.setState({ editingSocial: !this.state.editingSocial });
  };

  onSocialSubmit = e => {
    e.preventDefault();
    this.onSocialIconClick(e);
    const newSocial = {
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      website: this.state.website
    };
    this.props.changeDescription({ data: newSocial, type: "social" });
  };

  render() {
    const { profile } = this.props.user;
    const { isAuthenticated } = this.props.auth;
    const personal =
      isAuthenticated && profile.username === this.props.auth.user.username;
    return (
      <React.Fragment>
        <h4 className="my-3">
          About this user{" "}
          {personal ? (
            this.state.editingBio ? (
              <i
                className="fas fa-times text-primary edit mx-2"
                style={{ cursor: "pointer" }}
                onClick={this.onBioIconClick}
              />
            ) : (
              <i
                className="fas fa-edit text-primary edit mx-2"
                style={{ cursor: "pointer" }}
                onClick={this.onBioIconClick}
              />
            )
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
            <textarea
              name="bio"
              onChange={this.onChange}
              value={this.state.bio}
            />
            <button className="btn btn-primary mx-1" type="submit">
              <i className="fas fa-arrow-circle-right" />
            </button>
          </form>
        ) : (
          <p className="bio">
            {this.state.bio && this.state.bio !== "" ? (
              <span>{this.state.bio}</span>
            ) : (
              <span className="font-italic">
                {profile.username} doesn't have a bio
              </span>
            )}
          </p>
        )}

        {/* social */}

        <h4 className="my-3">
          Social{" "}
          {personal ? (
            this.state.editingSocial ? (
              <i
                className="fas fa-times text-primary edit mx-2"
                style={{ cursor: "pointer" }}
                onClick={this.onSocialIconClick}
              />
            ) : (
              <i
                className="fas fa-edit text-primary edit mx-2"
                style={{ cursor: "pointer" }}
                onClick={this.onSocialIconClick}
              />
            )
          ) : null}
        </h4>
        {this.state.editingSocial ? (
          <div className="row social input">
            <form
              className="form-inline"
              autoComplete="off"
              onSubmit={this.onSocialSubmit}
              type="submit"
              value="submit"
            >
              <Input
                placeholder="Link to Youtube profile"
                value={this.state.youtube}
                name="youtube"
                onChange={this.onChange}
              />
              <Input
                placeholder="Link to Twitter profile"
                value={this.state.twitter}
                name="twitter"
                onChange={this.onChange}
              />
              <Input
                placeholder="Link to Facebook profile"
                value={this.state.facebook}
                name="facebook"
                onChange={this.onChange}
              />
              <Input
                placeholder="Link to Instagram profile"
                value={this.state.instagram}
                name="instagram"
                onChange={this.onChange}
              />
              <Input
                placeholder="Link to a personal website"
                value={this.state.website}
                name="website"
                onChange={this.onChange}
              />{" "}
              <button className="btn btn-primary mx-1" type="submit">
                <i className="fas fa-arrow-circle-right" />
              </button>
            </form>
          </div>
        ) : profile.social && Object.keys(profile.social).length ? (
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
  auth: state.auth,
  user: state.user
});

export default connect(
  mapStateToProps,
  { changeDescription, getProfile }
)(Description);
