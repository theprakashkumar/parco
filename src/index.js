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
  "https://726114aa-546e-4e97-9d72-dfdd0f084969-00-ku7epqq2wq7q.janeway.replit.dev/";
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
