import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "js/store/reducers";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);
