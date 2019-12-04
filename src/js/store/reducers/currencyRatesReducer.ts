import {
  CURRENCY_RATES_ACTION_TYPES,
  ICurrencyRatesAction,
  TRates,
  RATES_WE_USE
} from "js/store/actions/types";

export interface ICurrencyRatesState {
  rates: TRates;
  base: RATES_WE_USE;
  lastFetched: number;
}

export const INITIAL_STATE: ICurrencyRatesState = {
  rates: {
    [RATES_WE_USE.EUR]: 0,
    [RATES_WE_USE.GBP]: 0,
    [RATES_WE_USE.USD]: 0
  },
  base: RATES_WE_USE.USD,
  lastFetched: 0
};

export const currencyRatesReducer = (
  state: ICurrencyRatesState = INITIAL_STATE,
  action: ICurrencyRatesAction
): ICurrencyRatesState => {
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
