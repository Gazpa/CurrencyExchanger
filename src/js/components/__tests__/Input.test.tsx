import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Input, IInputProps } from "js/components/Input";

let wrapped: ShallowWrapper<FunctionComponent<IInputProps>>;

const value = "Text";
const valueToAdd = false;

const props: IInputProps = {
  value,
  onInputChange: (value: string) => null,
  valueToAdd
};

beforeEach(() => {
  wrapped = shallow(<Input {...props} />);
});

it("shows an input", () => {
  expect(wrapped.find("input").length).toEqual(1);
});

it("shows the right sign", () => {
  if (valueToAdd) {
    expect(wrapped.render().text()).toContain("+");
  } else {
    expect(wrapped.render().text()).toContain("-");
  }
});

it("show the text in the input from the props", () => {
  expect(wrapped.find("input").props().value).toContain(value);
});
