import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { BalanceLabel, IBalanceLabelProps } from "js/components/BalanceLabel";
import { RATES_WE_USE, currencySymbols } from "js/store/actions/types";

let wrapped: ShallowWrapper<FunctionComponent<IBalanceLabelProps>>;

const props: IBalanceLabelProps = {
  balance: 1.3,
  selectedCurrency: RATES_WE_USE.EUR
};

beforeEach(() => {
  wrapped = shallow(<BalanceLabel {...props} />);
});

it("shows the correct balance label", () => {
  const expectedText = `Balance: ${currencySymbols[props.selectedCurrency]} ${
    props.balance
  }`;
  expect(wrapped.render().text()).toContain(expectedText);
});

it("displays 1 div and 1 span", () => {
  expect(wrapped.find("div").length).toEqual(1);
  expect(wrapped.find("span").length).toEqual(1);
});
