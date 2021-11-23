import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

import NotificationProvider from "./components/Notification/NotificationProvider";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
