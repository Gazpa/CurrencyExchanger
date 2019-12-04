export enum CURRENCY_RATES_ACTION_TYPES {
  FETCH_LATEST = "fetchLatest"
}

export enum BALANCES_ACTION_TYPES {
  SUBTRACT_FROM_BALANCE = "subtractFromBalance",
  ADD_TO_BALANCE = "addToBalance"
}

interface ICurrencyRatesActionPayload {
  base: RATES_WE_USE;
  rates: TRates;
  timestamp: number;
}

export interface ICurrencyRatesAction {
  type: CURRENCY_RATES_ACTION_TYPES;
  payload: ICurrencyRatesActionPayload;
}

interface IBalanceActionPayload {
  currency: RATES_WE_USE;
  value: number;
}

export interface IBalanceAction {
  type: BALANCES_ACTION_TYPES;
  payload: IBalanceActionPayload;
}

export enum RATES_WE_USE {
  EUR = "EUR",
  GBP = "GBP",
  USD = "USD"
}
export type TRates = { [key in RATES_WE_USE]: number };

export interface ICurrencyRatesAPIResponseData {
  base: RATES_WE_USE;
  disclaimer: string;
  license: string;
  rates: TRates;
  timestamp: number;
}

export const currencySymbols = {
  [RATES_WE_USE.EUR]: "€",
  [RATES_WE_USE.GBP]: "£",
  [RATES_WE_USE.USD]: "$"
};
