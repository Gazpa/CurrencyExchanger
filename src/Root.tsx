import React, { FunctionComponent } from "react";
import { Store } from "redux";
import { Provider } from "react-redux";

interface IRootProps {
  children: React.ReactNode;
  store: Store;
}

export const Root: FunctionComponent<IRootProps> = ({ children, store }) => {
  return <Provider store={store}>{children}</Provider>;
};
