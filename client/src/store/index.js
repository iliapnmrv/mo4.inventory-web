import { combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";
import { totalReducer } from "./totalReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    total: totalReducer
})


export const store = createStore(rootReducer);