import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "js/store/reducers";
import { Root } from "Root";
import { App } from "js/components/App";
import { Pocket } from "js/components/Pocket";
import { INITIAL_STATE as initialStateBalance } from "js/store/reducers/balancesReducer";
import { INITIAL_STATE as initialStateCurrencyRates } from "js/store/reducers/currencyRatesReducer";
import { IStoreState } from "js/store/reducers";
import { TRates, RATES_WE_USE, currencySymbols } from "js/store/actions/types";
import { calculateValueBetweenCurrencies } from "js/utils/services";

let wrapped: ReactWrapper;

const mockStoreRates: TRates = {
  [RATES_WE_USE.EUR]: 1,
  [RATES_WE_USE.GBP]: 0.8,
  [RATES_WE_USE.USD]: 0.1
};

const decimalsToShow = 2;

const initialState: IStoreState = {
  currencyRates: { ...initialStateCurrencyRates, rates: mockStoreRates },
  balances: initialStateBalance
};

const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

beforeEach(() => {
  wrapped = mount(
    <Root store={store}>
      <App />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("shows 2 currency pockets", () => {
  expect(wrapped.find(Pocket).length).toEqual(2);
});

describe("a full cycle for balance change", () => {
  const testValue = "1.5";

  beforeEach(() => {
    wrapped
      .find(".to-subtract")
      .find("input")
      .simulate("change", { target: { value: testValue } });

    wrapped.update();
  });

  describe("subtract input", () => {
    it("has the value entered", () => {
      expect(
        wrapped
          .find(".to-subtract")
          .find("input")
          .prop("value")
      ).toEqual(testValue);
    });

    it("changes the value to add", () => {
      const rateToSubtract = wrapped
        .find(".to-subtract")
        .find("select")
        .props().value as RATES_WE_USE;
      const rateToAdd = wrapped
        .find(".to-add")
        .find("select")
        .props().value as RATES_WE_USE;

      const changeValue = calculateValueBetweenCurrencies(
        Number(testValue),
        rateToSubtract,
        rateToAdd,
        decimalsToShow,
        mockStoreRates
      );

      expect(
        wrapped
          .find(".to-add")
          .find("input")
          .prop("value")
      ).toEqual(changeValue);
    });
  });

  describe("subtract dropdown", () => {
    const rateToChange = RATES_WE_USE.USD;
    let changeValue = "0";

    beforeEach(() => {
      wrapped
        .find(".to-subtract")
        .find("select")
        .simulate("change", { target: { value: rateToChange } });

      wrapped.update();
    });

    it("shows value when changed", () => {
      expect(
        wrapped
          .find(".to-subtract")
          .find("select")
          .props().value
      ).toContain(rateToChange);
    });

    it("changes the value of the input to add", () => {
      const rateToAdd = wrapped
        .find(".to-add")
        .find("select")
        .props().value as RATES_WE_USE;

      changeValue = calculateValueBetweenCurrencies(
        Number(testValue),
        rateToChange,
        rateToAdd,
        decimalsToShow,
        mockStoreRates
      );

      expect(
        wrapped
          .find(".to-add")
          .find("input")
          .prop("value")
      ).toEqual(changeValue);
    });

    describe("clicking on exchange button", () => {
      beforeEach(() => {
        expect(wrapped.find(".exchange-button").simulate("click"));

        wrapped.update();
      });

      it("changes the balances with the amounts introduced", () => {
        const rateToAdd = wrapped
          .find(".to-add")
          .find("select")
          .props().value as RATES_WE_USE;

        const subtractBalanceText = `Balance: ${
          currencySymbols[rateToChange]
        } ${initialStateBalance[rateToChange] - Number(testValue)}`;

        const addBalanceText = `Balance: ${
          currencySymbols[rateToAdd]
        } ${initialStateBalance[rateToAdd] + Number(changeValue)}`;

        expect(
          wrapped
            .find(".to-add")
            .find(".balance-label")
            .text()
        ).toContain(addBalanceText);

        expect(
          wrapped
            .find(".to-subtract")
            .find(".balance-label")
            .text()
        ).toContain(subtractBalanceText);
      });

      it("clears the inputs values", () => {
        expect(
          wrapped
            .find(".to-subtract")
            .find("input")
            .prop("value")
        ).toEqual("");
        expect(
          wrapped
            .find(".to-add")
            .find("input")
            .prop("value")
        ).toEqual("");
      });
    });
  });
});
