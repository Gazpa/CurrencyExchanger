import {
  subtractFromBalanceAction,
  addToBalanceAction
} from "js/store/actions/balancesActions";
import { BALANCES_ACTION_TYPES, RATES_WE_USE } from "js/store/actions/types";

const currency = RATES_WE_USE.EUR;
const value = 200;

describe("Balances Actions", () => {
  it("returns action object type SUBTRACT_FROM_BALANCE", () => {
    const action = {
      type: BALANCES_ACTION_TYPES.SUBTRACT_FROM_BALANCE,
      payload: {
        currency,
        value
      }
    };

    const result = subtractFromBalanceAction(currency, value);

    expect(result).toEqual(action);
  });

  it("returns action object type ADD_TO_BALANCE", () => {
    const action = {
      type: BALANCES_ACTION_TYPES.ADD_TO_BALANCE,
      payload: {
        currency,
        value
      }
    };

    const result = addToBalanceAction(currency, value);

    expect(result).toEqual(action);
  });
});
