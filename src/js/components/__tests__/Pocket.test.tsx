import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Pocket, IPocketProps } from "js/components/Pocket";
import { CurrencySelect } from "js/components/CurrencySelect";
import { BalanceLabel } from "js/components/BalanceLabel";
import { Input } from "js/components/Input";
import { RATES_WE_USE } from "js/store/actions/types";

let wrapped: ShallowWrapper<FunctionComponent<IPocketProps>>;

const props: IPocketProps = {
  selectedCurrency: RATES_WE_USE.EUR,
  onSelectChange: rate => null,
  balance: 1000,
  inputValue: "",
  onInputChange: value => null,
  pocketToAdd: false
};

beforeEach(() => {
  wrapped = shallow(<Pocket {...props} />);
});

it("shows a dropdowns to select currencies", () => {
  expect(wrapped.find(CurrencySelect).length).toEqual(1);
});

it("shows balance label for that currency", () => {
  expect(wrapped.find(BalanceLabel).length).toEqual(1);
});

it("shows an input to introduce an amount", () => {
  expect(wrapped.find(Input).length).toEqual(1);
});
