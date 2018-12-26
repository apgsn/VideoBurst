import React, { Component } from "react";
import { connect } from "react-redux";
import { loadLeaderboard } from "../../actions/userActions.js";

class Leaderboard extends Component {
  componentDidMount() {
    this.props.loadLeaderboard();
  }

  render() {
    return (
      <div className="w-50 pt-5 container leaderboard">
        <h3>Leaderboard</h3>
        <ul className="row center-block list-group shadow">
          {this.props.user.leaderboard.map(user => (
            <li className="p-3 list-group-item d-flex justify-content-between align-items-center">
              {user.username}
              <span className="badge badge-danger badge-pill">
                Likes received: &nbsp;
                <span className="h6"> {user.likesCount}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { loadLeaderboard }
)(Leaderboard);
