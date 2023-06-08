import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/SignupReducer.js";
import { loginReducer } from "./login/LoginReducer.js" // add import 

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer // <--- add reducer
  });

export default createRootReducer;