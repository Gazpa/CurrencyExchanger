export enum CURRENCY_RATES_ACTION_TYPES {
  FETCH_LATEST = "fetchLatest"
}

export enum BALANCES_ACTION_TYPES {
  SUBTRACT_FROM_BALANCE = "subtractFromBalance",
  ADD_TO_BALANCE = "addToBalance"
}

export interface ICurrencyRatesAction {
  type: CURRENCY_RATES_ACTION_TYPES;
  payload: any;
}

interface IBalanceActionPayload {
  currency: RATES_WE_USE;
  value: number;
}

export interface IBalanceAction {
  type: BALANCES_ACTION_TYPES;
  payload: IBalanceActionPayload;
}

export interface IRates {
  [key: string]: number;
}

export enum RATES_WE_USE {
  EUR = "EUR",
  GBP = "GBP",
  USD = "USD"
}
export type TRatesWeUse =
  | RATES_WE_USE.EUR
  | RATES_WE_USE.GBP
  | RATES_WE_USE.USD;
export type TRatesWeUseMap = { [key in TRatesWeUse]: number };

export interface ICurrencyRatesAPIResponseData {
  base: string;
  disclaimer: string;
  license: string;
  rates: IRates;
  timestamp: number;
}

export const currencySymbols = {
  [RATES_WE_USE.EUR]: "€",
  [RATES_WE_USE.GBP]: "£",
  [RATES_WE_USE.USD]: "$"
};
