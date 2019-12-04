import { RATES_WE_USE, TRates } from "js/store/actions/types";
import { MAX_DECIMALS_RATE_LABEL } from "js/utils/constants";

// We use these patterns to take out zeros from the right
const patternRightZeros = /[.]0+$/;
const patternLastZero = /[.][1-9]0$/;

export const calculateValueBetweenCurrencies = (
  value: number,
  currencyFrom: RATES_WE_USE,
  currencyTo: RATES_WE_USE,
  numDecimals: number,
  rates: TRates
) => {
  // We lose some decimals changing currencies from a static base
  // The API does not let us change the base on the free plan
  // This can be tested introducing same currency for both pockets
  if (Object.entries(rates).length > 0) {
    const calculatedValueBase = value / rates[currencyFrom];
    const calculatedValue =
      Number(calculatedValueBase.toFixed(MAX_DECIMALS_RATE_LABEL)) *
      rates[currencyTo];
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
