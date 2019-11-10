import React from "react";
import { mount, ReactWrapper } from "enzyme";

import { Root } from "Root";
import { App } from "js/components/App";
import { Pocket } from "js/components/Pocket";
import { INITIAL_STATE as initialStateBalance } from "js/store/reducers/balancesReducer";
import { INITIAL_STATE as initialStateCurrencyRates } from "js/store/reducers/currencyRatesReducer";
import { IStoreState } from "js/store/reducers";
import { IRates, RATES_WE_USE, currencySymbols } from "js/store/actions/types";
import { calculateValueBetweenCurrencies } from "js/utils/services";

let wrapped: ReactWrapper;

const mockStoreRates: IRates = {
  [RATES_WE_USE.EUR]: 1,
  [RATES_WE_USE.GBP]: 0.8,
  [RATES_WE_USE.USD]: 0.1
};

const defaultRate = RATES_WE_USE.EUR;

const initialState: IStoreState = {
  currencyRates: { ...initialStateCurrencyRates, rates: mockStoreRates },
  balances: initialStateBalance
};

beforeEach(() => {
  wrapped = mount(
    <Root initialState={initialState}>
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
      expect(
        wrapped
          .find(".to-add")
          .find("input")
          .prop("value")
      ).toEqual(testValue);
    });
  });

  describe("subtract dropdown", () => {
    const rateToChange = RATES_WE_USE.GBP;

    const changeValue = calculateValueBetweenCurrencies(
      Number(testValue),
      rateToChange,
      defaultRate,
      2,
      mockStoreRates
    );

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
        const subtractBalanceText = `Balance: ${
          currencySymbols[rateToChange]
        } ${initialStateBalance[rateToChange] - Number(testValue)}`;

        const addBalanceText = `Balance: ${
          currencySymbols[defaultRate]
        } ${initialStateBalance[defaultRate] + Number(changeValue)}`;

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
