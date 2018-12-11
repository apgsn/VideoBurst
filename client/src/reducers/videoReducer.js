import { ADD_VIDEO } from "../actions/types";

const initialState = {
  videoList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEO:
      return { ...state, posts: [action.payload, ...state.videoList] };
    default:
      return state;
  }
}
