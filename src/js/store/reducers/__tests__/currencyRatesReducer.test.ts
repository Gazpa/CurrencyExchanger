import {
  currencyRatesReducer,
  INITIAL_STATE,
  ICurrencyRatesState
} from "js/store/reducers/currencyRatesReducer";
import {
  CURRENCY_RATES_ACTION_TYPES,
  RATES_WE_USE
} from "js/store/actions/types";

it("handles actions of type FETCH_LATEST", () => {
  const action = {
    type: CURRENCY_RATES_ACTION_TYPES.FETCH_LATEST,
    payload: {
      rates: {
        [RATES_WE_USE.EUR]: 0.9,
        [RATES_WE_USE.GBP]: 0.7,
        [RATES_WE_USE.USD]: 0.8
      },
      base: RATES_WE_USE.USD,
      timestamp: Date.now()
    }
  };

  const RESULT_STATE: ICurrencyRatesState = {
    ...INITIAL_STATE,
    base: action.payload.base,
    rates: action.payload.rates,
    lastFetched: action.payload.timestamp
  };

  const newState = currencyRatesReducer(INITIAL_STATE, action);

  expect(newState).toEqual(RESULT_STATE);
});
