import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "js/store/reducers";
import { Root } from "Root";
import { App } from "js/components/App";

import "styles/index.scss";

const initialState = {};
const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Root store={store}>
    <App />
  </Root>,
  document.getElementById("root")
);
