import React from "react";
import { Provider } from "react-redux";

import { store } from "js/store/store";

export const Root = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
