import {
  BALANCES_ACTION_TYPES,
  IBalanceAction,
  RATES_WE_USE,
  TRatesWeUse
} from "js/store/actions/types";

type IBalancesMap = { [key in TRatesWeUse]: number };
export type IBalancesState = IBalancesMap;

export const INITIAL_STATE: IBalancesState = {
  [RATES_WE_USE.EUR]: 1000,
  [RATES_WE_USE.GBP]: 5000,
  [RATES_WE_USE.USD]: 4000
};

export const balancesReducer = (
  state: IBalancesState = INITIAL_STATE,
  action: IBalanceAction
) => {
  const { type, payload } = action;

  switch (type) {
    case BALANCES_ACTION_TYPES.ADD_TO_BALANCE: {
      const { currency, value } = payload;

      const newValue = state[currency] + value;

      return { ...state, [currency]: newValue };
    }
    case BALANCES_ACTION_TYPES.SUBTRACT_FROM_BALANCE: {
      const { currency, value } = payload;

      const newValue = state[currency] - value;

      return { ...state, [currency]: newValue };
    }
    default:
      return state;
  }
};
