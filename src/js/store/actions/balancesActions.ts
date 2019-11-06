import {
  BALANCES_ACTION_TYPES,
  RATES_WE_USE,
  IBalanceAction
} from "js/store/actions/types";

export const subtractFromBalanceAction = (
  currency: RATES_WE_USE,
  value: number
): IBalanceAction => {
  return {
    type: BALANCES_ACTION_TYPES.SUBTRACT_FROM_BALANCE,
    payload: {
      currency,
      value
    }
  };
};

export const addToBalanceAction = (
  currency: RATES_WE_USE,
  value: number
): IBalanceAction => {
  return {
    type: BALANCES_ACTION_TYPES.ADD_TO_BALANCE,
    payload: {
      currency,
      value
    }
  };
};
