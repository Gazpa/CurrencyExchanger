import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import {
  CurrencySelect,
  ICurrencySelectProps
} from "js/components/CurrencySelect";
import { TRatesWeUse, RATES_WE_USE } from "js/store/actions/types";

let wrapped: ShallowWrapper<FunctionComponent<ICurrencySelectProps>>;

const props: ICurrencySelectProps = {
  onChangeSelection: (rate: TRatesWeUse) => null,
  selectedValue: RATES_WE_USE.EUR
};

beforeEach(() => {
  wrapped = shallow(<CurrencySelect {...props} />);
});

it("shows the correct number of options", () => {
  expect(wrapped.find("option").length).toEqual(
    Object.keys(RATES_WE_USE).length
  );
});

it("shows the correct option selected", () => {
  // We will simulate the change on App level fom the event
  expect(
    wrapped
      .render()
      .find("select [selected]")
      .val()
  ).toEqual(props.selectedValue);
});
