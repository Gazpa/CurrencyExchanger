import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "js/store/reducers";

export const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
