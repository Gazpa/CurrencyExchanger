import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers, { IStoreState } from "js/store/reducers";

interface IRootProps {
  children: React.ReactNode;
  initialState: IStoreState | {};
}

export const Root: FunctionComponent<IRootProps> = ({
  children,
  initialState
}) => {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(reduxThunk)
  );

  return <Provider store={store}>{children}</Provider>;
};
