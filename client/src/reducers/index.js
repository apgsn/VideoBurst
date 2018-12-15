import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import videoReducer from "./videoReducer";
import authReducer from "./authReducer";

export default combineReducers({
  video: videoReducer,
  error: errorReducer,
  auth: authReducer
});
