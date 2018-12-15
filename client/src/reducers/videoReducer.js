import { ADD_VIDEO, LIST_VIDEOS } from "../actions/types";

const initialState = {
  videoList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEO:
      return { ...state, videoList: [action.payload, ...state.videoList] };
    case LIST_VIDEOS:
      return { ...state, videoList: [...action.payload] };
    default:
      return state;
  }
}
