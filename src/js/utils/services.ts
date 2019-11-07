import { RATES_WE_USE } from "js/store/actions/types";
import { store } from "js/store/store";

// We use these patterns to take out zeros from the right
const patternRightZeros = /[.]0+$/;
const patternLastZero = /[.][1-9]0$/;

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
    const valueFixed = calculatedValue.toFixed(numDecimals);

    const regex = new RegExp(patternLastZero);
    const matchesRegExp = regex.test(valueFixed);

    if (matchesRegExp) {
      return valueFixed.slice(0, -1);
    } else {
      return valueFixed.replace(patternRightZeros, "");
    }
  }

  return "0";
};
