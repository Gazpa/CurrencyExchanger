import {
  balancesReducer,
  INITIAL_STATE,
  IBalancesState
} from "js/store/reducers/balancesReducer";
import { BALANCES_ACTION_TYPES, RATES_WE_USE } from "js/store/actions/types";

it("handles actions of type ADD_TO_BALANCE", () => {
  const action = {
    type: BALANCES_ACTION_TYPES.ADD_TO_BALANCE,
    payload: {
      currency: RATES_WE_USE.EUR,
      value: 200
    }
  };

  const RESULT_STATE: IBalancesState = {
    ...INITIAL_STATE,
    [action.payload.currency]:
      INITIAL_STATE[action.payload.currency] + action.payload.value
  };

  const newState = balancesReducer(INITIAL_STATE, action);

  expect(newState).toEqual(RESULT_STATE);
});

it("handles actions of type SUBTRACT_FROM_BALANCE", () => {
  const action = {
    type: BALANCES_ACTION_TYPES.SUBTRACT_FROM_BALANCE,
    payload: {
      currency: RATES_WE_USE.EUR,
      value: 200
    }
  };

  const RESULT_STATE: IBalancesState = {
    ...INITIAL_STATE,
    [action.payload.currency]:
      INITIAL_STATE[action.payload.currency] - action.payload.value
  };

  const newState = balancesReducer(INITIAL_STATE, action);

  expect(newState).toEqual(RESULT_STATE);
});
