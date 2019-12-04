import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import {
  ExchangeButton,
  IExchangeButtonProps
} from "js/components/ExchangeButton";

let wrapped: ShallowWrapper<FunctionComponent<IExchangeButtonProps>>;

const props: IExchangeButtonProps = {
  onClick: () => null,
  errorMessage: ""
};

describe("ExchangeButton", () => {
  beforeEach(() => {
    wrapped = shallow(<ExchangeButton {...props} />);
  });

  it("shows a button with text Exchange", () => {
    expect(wrapped.find("button").length).toEqual(1);
    expect(wrapped.render().text()).toContain("Exchange");
  });

  it("does not show error message", () => {
    expect(wrapped.find(".error-message").length).toEqual(0);
  });

  it("shows error message", () => {
    const errorText = "I am an error";
    const propsWithError: IExchangeButtonProps = {
      onClick: () => null,
      errorMessage: errorText
    };

    const wrappedWithError: ShallowWrapper<FunctionComponent<
      IExchangeButtonProps
    >> = shallow(<ExchangeButton {...propsWithError} />);

    expect(wrappedWithError.find(".error-message").length).toEqual(1);
    expect(wrappedWithError.render().text()).toContain(errorText);
  });
});
