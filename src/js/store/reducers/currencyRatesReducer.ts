import {
  CURRENCY_RATES_ACTION_TYPES,
  ICurrencyRatesAction,
  IRates,
  RATES_WE_USE
} from "js/store/actions/types";

export interface ICurrencyRatesState {
  rates?: IRates;
  base: RATES_WE_USE;
  lastFetched: number;
}

export const INITIAL_STATE: ICurrencyRatesState = {
  rates: {},
  base: RATES_WE_USE.USD,
  lastFetched: 0
};

export const currencyRatesReducer = (
  state: ICurrencyRatesState = INITIAL_STATE,
  action: ICurrencyRatesAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CURRENCY_RATES_ACTION_TYPES.FETCH_LATEST:
      return {
        ...state,
        base: payload.base,
        rates: payload.rates,
        lastFetched: payload.timestamp
      };
    default:
      return state;
  }
};
