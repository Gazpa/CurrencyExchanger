import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Tools, IToolsProps } from "js/components/Tools";
import { CurrencySwap } from "js/components/CurrencySwap";
import { RateLabel } from "js/components/RateLabel";
import { RATES_WE_USE } from "js/store/actions/types";

let wrapped: ShallowWrapper<FunctionComponent<IToolsProps>>;

const props: IToolsProps = {
  onClickCurrencySwap: () => null,
  currencyFrom: RATES_WE_USE.EUR,
  currencyTo: RATES_WE_USE.GBP
};

beforeEach(() => {
  wrapped = shallow(<Tools {...props} />);
});

it("shows a dropdowns to select currencies", () => {
  expect(wrapped.find(CurrencySwap).length).toEqual(1);
});

it("shows balance label for that currency", () => {
  expect(wrapped.find(RateLabel).length).toEqual(1);
});
