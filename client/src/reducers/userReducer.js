import { LOAD_LEADERBOARD } from "../actions/types";

const initialState = {
  leaderboard: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload
      };
    default:
      return state;
  }
}
