import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeDescription } from "../../actions/userActions.js";
import "./Description.css";

import Input from "../common/Input.js";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingBio: false,
      editingSocial: false,
      bio: "",
      social: {
        youtube: "",
        twitter: "",
        facebook: "",
        instagram: "",
        website: "",
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.bio !== this.state.bio) {
      this.setState({ bio: nextProps.profile.bio });
    }
    if (nextProps.profile.social !== this.state.social) {
      this.setState({ social: nextProps.profile.social });
    }
  }

  onBioChange = e => this.setState({ bio: e.target.value });

  onChange = e => {
    this.setState({
      social: {
        ...this.state.social,
        [e.target.name]: e.target.value,
      }
    });
  };

  onIconClick = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: !this.state[e.target.id] });
  };

  onBioSubmit = e => {
    e.preventDefault();
    this.setState({ editingBio: false });
    const { bio } = this.state;
    this.props.changeDescription({ data: bio, type: "bio" });
  };

  onSocialSubmit = e => {
    e.preventDefault();
    this.setState({ editingSocial: false });
    const { social } = this.state;
    this.props.changeDescription({ data: social, type: "social" });
  };

  render() {
    const { profile } = this.props;
    const { personal } = this.props;

    return (
      <React.Fragment>
        <h4 className="my-3">
          {/* bio */}
          About this user{" "}
          {personal ? (
            this.state.editingBio ? (
              <i
                id="editingBio"
                className="fas fa-times text-primary edit mx-2"
                style={{ cursor: "pointer" }}
                onClick={this.onIconClick}
              />
            ) : (
                <i
                  id="editingBio"
                  className="fas fa-edit text-primary edit mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={this.onIconClick}
                />
              )
          ) : null}
        </h4>
        {this.state.editingBio ? (
          <div className="row desc-form-container input bg-light p-3 mb-2 border rounded shadow border-grey">
            <form
              className="form-group w-100"
              autoComplete="off"
              onSubmit={this.onBioSubmit}
            >
              <div className="form-group ">
                <textarea
                  placeholder="Write something about you..."
                  className="form-control w-100"
                  name="bio"
                  onChange={this.onBioChange}
                  value={this.state.bio}
                />
              </div>
              <button
                className="btn btn-primary m-1 w-25 btn-block mt-4"
                type="submit"
              >
                <i className="fas fa-arrow-circle-right" />
              </button>
            </form>
          </div>
        ) : (
            <p className="bio">
              {this.state.bio ? (
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
                id="editingSocial"
                className="fas fa-times text-primary edit mx-2"
                style={{ cursor: "pointer" }}
                onClick={this.onIconClick}
              />
            ) : (
                <i
                  id="editingSocial"
                  className="fas fa-edit text-primary edit mx-2"
                  style={{ cursor: "pointer" }}
                  onClick={this.onIconClick}
                />
              )
          ) : null}
        </h4>
        {this.state.editingSocial ? (
          <div className="row desc-form-container input bg-light p-3 mb-2 border rounded shadow border-grey">
            <form autoComplete="off" onSubmit={this.onSocialSubmit}>
              <div className="d-inline-flex p-2 w-100">
                <Input
                  placeholder="Link to Youtube profile"
                  value={this.state.social.youtube}
                  name="youtube"
                  onChange={this.onChange}
                />
                <div className="icon-div my-1">
                  <i className="fab fa-youtube fa-2x" />
                </div>
              </div>
              <div className="d-inline-flex p-2">
                <Input
                  placeholder="Link to Twitter profile"
                  value={this.state.social.twitter}
                  name="twitter"
                  onChange={this.onChange}
                />
                <div className="icon-div my-1">
                  <i className="fab fa-twitter fa-2x" />
                </div>
              </div>
              <div className="d-inline-flex p-2">
                <Input
                  placeholder="Link to Facebook profile"
                  value={this.state.social.facebook}
                  name="facebook"
                  onChange={this.onChange}
                />
                <div className="icon-div my-1">
                  <i className="fab fa-facebook fa-2x" />
                </div>
              </div>
              <div className="d-inline-flex p-2">
                <Input
                  placeholder="Link to Instagram profile"
                  value={this.state.social.instagram}
                  name="instagram"
                  onChange={this.onChange}
                />
                <div className="icon-div my-1">
                  <i className="fab fa-instagram fa-2x" />
                </div>
              </div>
              <div className="d-inline-flex p-2">
                <Input
                  placeholder="Link to a personal website"
                  value={this.state.social.website}
                  name="website"
                  onChange={this.onChange}
                />
                <div className="icon-div my-1">
                  <i className="fas fa-globe fa-2x" />
                </div>
              </div>
              <button
                className="btn btn-primary m-1 w-25 btn-block mt-4"
                type="submit"
              >
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

Description.propTypes = {
  changeDescription: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    bio: PropTypes.string,
    social: PropTypes.shape({}),
    username: PropTypes.string,
  }),
  personal: PropTypes.bool,
}

Description.defaultProps = {
  profile: {
    bio: '',
    social: {},
    username: '',
  },
  personal: false,
}


const mapStateToProps = state => ({
  profile: state.user.profile,
});

export default connect(
  mapStateToProps,
  { changeDescription }
)(Description);
