import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { LeftArrowIcon } from "js/components/icons/LeftArrowIcon";

let wrapped: ShallowWrapper<FunctionComponent<{}>>;

beforeEach(() => {
  wrapped = shallow(<LeftArrowIcon />);
});

it("shows an svg with its path", () => {
  expect(wrapped.find("svg").length).toEqual(1);
  expect(wrapped.find("path").length).toEqual(1);
});
