import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { CurrencySwap, ICurrencySwapProps } from "js/components/CurrencySwap";

let wrapped: ShallowWrapper<FunctionComponent<ICurrencySwapProps>>;

const props: ICurrencySwapProps = {
  onClick: () => null
};

beforeEach(() => {
  wrapped = shallow(<CurrencySwap {...props} />);
});

it("shows a button", () => {
  expect(wrapped.find("button").length).toEqual(1);
});
