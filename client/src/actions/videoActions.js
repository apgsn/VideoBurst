import axios from "axios";
import { GET_ERRORS, CLEAR_ERRORS, LIST_VIDEOS } from "./types";

// Add video
export const addVideo = videoUrl => dispatch => {
  axios
    .post("/api/video/add", videoUrl)
    .then(res => {
      dispatch(loadVideos());
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// load initial set of videos for the main page (VideoCollection comp)
export const loadVideos = () => dispatch => {
  axios
    .post("/api/video/all")
    .then(res => {
      console.log(res.data);
      dispatch({
        type: LIST_VIDEOS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
