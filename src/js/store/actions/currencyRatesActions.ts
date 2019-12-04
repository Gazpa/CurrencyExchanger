import { ThunkDispatch } from "redux-thunk";

import {
  CURRENCY_RATES_ACTION_TYPES,
  ICurrencyRatesAction,
  ICurrencyRatesAPIResponseData,
  TRates,
  RATES_WE_USE
} from "js/store/actions/types";
import { API_ENDPOINT, RATES_API_ID } from "js/utils/constants";
import { ICurrencyRatesState } from "js/store/reducers/currencyRatesReducer";

export function fetchLatestAction() {
  // We cannnot change the base with the basic account
  // API_ID should be process.env.REACT_APP_API_ID kept in a .env file
  const queryString = `?app_id=${RATES_API_ID}`;
  const fetchLatestUrl = `${API_ENDPOINT}${queryString}`;

  return (
    dispatch: ThunkDispatch<ICurrencyRatesState, void, ICurrencyRatesAction>
  ) => {
    fetch(fetchLatestUrl)
      .then(response => response.json())
      .then((data: ICurrencyRatesAPIResponseData) => {
        const currencyRatesToUse: TRates = {
          [RATES_WE_USE.EUR]: data.rates[RATES_WE_USE.EUR],
          [RATES_WE_USE.GBP]: data.rates[RATES_WE_USE.GBP],
          [RATES_WE_USE.USD]: data.rates[RATES_WE_USE.USD]
        };

        dispatch({
          type: CURRENCY_RATES_ACTION_TYPES.FETCH_LATEST,
          payload: {
            rates: currencyRatesToUse,
            base: data.base,
            timestamp: data.timestamp
          }
        });
      })
      .catch(err => {
        console.warn("Error while fetching rates: ", err);
      });
  };
}
