import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { RateLabelComponent, IRateLabelProps } from "js/components/RateLabel";
import { RATES_WE_USE, TRates, currencySymbols } from "js/store/actions/types";
import { LeftArrowIcon } from "js/components/icons/LeftArrowIcon";
import { calculateValueBetweenCurrencies } from "js/utils/services";
import { MAX_DECIMALS_RATE_LABEL } from "js/utils/constants";

let wrapped: ShallowWrapper<FunctionComponent<IRateLabelProps>>;

const mockStoreRates: TRates = {
  [RATES_WE_USE.EUR]: 0.7,
  [RATES_WE_USE.GBP]: 0.8,
  [RATES_WE_USE.USD]: 0.9
};

const props: IRateLabelProps = {
  currencyFrom: RATES_WE_USE.EUR,
  currencyTo: RATES_WE_USE.GBP,
  rates: mockStoreRates
};

describe("RateLabel", () => {
  beforeEach(() => {
    wrapped = shallow(<RateLabelComponent {...props} />);
  });

  it("shows left arrow icon with the right direction", () => {
    expect(wrapped.find(LeftArrowIcon).length).toEqual(1);
    expect(wrapped.find(".arrow-up").length).toEqual(1);
  });

  it("calculates the rate properly and shows it", () => {
    const changeValue = calculateValueBetweenCurrencies(
      1,
      props.currencyFrom,
      props.currencyTo,
      MAX_DECIMALS_RATE_LABEL,
      mockStoreRates
    );

    const labelText = `${currencySymbols[props.currencyFrom]} 1 = ${
      currencySymbols[props.currencyTo]
    } ${changeValue}`;

    expect(wrapped.find("span").length).toEqual(1);
    expect(
      wrapped
        .render()
        .find("span")
        .text()
    ).toContain(labelText);
  });
});
