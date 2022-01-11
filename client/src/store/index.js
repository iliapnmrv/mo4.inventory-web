import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";

import { authReducer } from "./reducers/authReducer";
import { infoReducer } from "./reducers/infoReducer";
import { modalReducer } from "./reducers/modalReducer";
import { totalReducer } from "./reducers/totalReducer";
import { userReducer } from "./reducers/userReducer";
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    total: totalReducer,
    info: infoReducer,
    modal: modalReducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: ['total, info, modal'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);