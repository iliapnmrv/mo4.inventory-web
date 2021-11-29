import { combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer
})


export const store = createStore(rootReducer);