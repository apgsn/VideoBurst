import axios from "axios";
import { LOAD_LEADERBOARD, GET_ERRORS, GET_PROFILE } from "./types";

// load leaderboard
export const loadLeaderboard = () => dispatch => {
  axios
    .get("/api/user/leaderboard")
    .then(res => {
      dispatch({
        type: LOAD_LEADERBOARD,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// get public profile of user
export const getProfile = username => dispatch => {
  axios
    .get("/api/user/u/" + username)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// change profile bio
export const changeBio = bio => dispatch => {
  axios
    .post("/api/user/profile/bio", bio)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
