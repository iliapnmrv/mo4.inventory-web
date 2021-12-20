import { combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";
import { infoReducer } from "./infoReducer";
import { modalReducer } from "./modalReducer";
import { totalReducer } from "./totalReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    total: totalReducer,
    info: infoReducer,
    modal: modalReducer,
})


export const store = createStore(rootReducer);