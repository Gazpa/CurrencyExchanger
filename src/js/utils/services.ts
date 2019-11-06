import { RATES_WE_USE } from "js/store/actions/types";
import { store } from "js/store/store";

export const calculateValueBetweenCurrencies = (
  value: number,
  currencyFrom: RATES_WE_USE,
  currencyTo: RATES_WE_USE,
  numDecimals: number
) => {
  const rates = store.getState().currencyRates.rates || {};

  if (Object.entries(rates).length > 0) {
    const calculatedValueBase = value / rates[currencyFrom];
    const calculatedValue = calculatedValueBase * rates[currencyTo];

    return calculatedValue.toFixed(numDecimals);
  }

  return 0;
};
