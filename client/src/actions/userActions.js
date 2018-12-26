import axios from "axios";
import { LOAD_LEADERBOARD, GET_ERRORS } from "./types";

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
