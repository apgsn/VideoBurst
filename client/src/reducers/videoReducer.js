import { LIST_VIDEOS } from "../actions/types";

const initialState = {
  videoList: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LIST_VIDEOS:
      return { ...state, videoList: [...action.payload] };
    default:
      return state;
  }
}
