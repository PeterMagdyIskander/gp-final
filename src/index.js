import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./ReduxStore//reducers";
import middleware from "./ReduxStore/middleware";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <BrowserRouter>
    {" "}
    <Provider store={store}>
      <App />
    </Provider>{" "}
  </BrowserRouter>,
  document.getElementById("root")
);
