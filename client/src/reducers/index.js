import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import videoReducer from "./videoReducer";

export default combineReducers({
  video: videoReducer,
  error: errorReducer
});
