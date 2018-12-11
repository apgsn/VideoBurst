import axios from "axios";
import { GET_ERRORS, ADD_VIDEO } from "./types";

// Add video
export const addVideo = videoUrl => dispatch => {
  axios
    .post("/api/video/add", videoUrl)
    .then(res =>
      dispatch({
        type: ADD_VIDEO,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
