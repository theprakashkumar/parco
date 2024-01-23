import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import axios from "axios";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL ||
  "https://8a64f86e-cd97-4ba6-95fa-e96d3e59636a-00-otpj4aehas8f.riker.replit.dev/";
axios.defaults.headers.common["authorization"] = JSON.parse(
  localStorage.getItem("token")
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
