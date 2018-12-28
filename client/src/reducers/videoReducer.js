import {
  LIST_VIDEOS,
  PLAY_VIDEO,
  CLOSE_VIDEO,
  UPDATE_NOW_PLAYING
} from "../actions/types";

const initialState = {
  loading: false,
  videoList: [],
  nowPlaying: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_VIDEOS:
      return { ...state, videoList: [...action.payload], loading: false };
    case PLAY_VIDEO:
      return { ...state, nowPlaying: action.payload };
    case CLOSE_VIDEO:
      return { ...state, nowPlaying: {} };
    case UPDATE_NOW_PLAYING:
      return { ...state, nowPlaying: action.payload };
    default:
      return state;
  }
}
