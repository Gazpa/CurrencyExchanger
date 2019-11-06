import { combineReducers } from "redux";
import {
  currencyRatesReducer,
  ICurrencyRatesState
} from "js/store/reducers/currencyRatesReducer";
import {
  balancesReducer,
  IBalancesState
} from "js/store/reducers/balancesReducer";

export interface IStoreState {
  currencyRates: ICurrencyRatesState;
  balances: IBalancesState;
}

const rootReducer = combineReducers<IStoreState>({
  currencyRates: currencyRatesReducer,
  balances: balancesReducer
});

export default rootReducer;
