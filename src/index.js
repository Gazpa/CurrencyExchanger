import React from "react";
import ReactDOM from "react-dom";

import { Root } from "Root";
import { App } from "js/components/App";

import "styles/index.scss";

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById("root")
);
