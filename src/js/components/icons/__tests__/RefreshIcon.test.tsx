import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { RefreshIcon } from "js/components/icons/RefreshIcon";

let wrapped: ShallowWrapper<FunctionComponent<{}>>;

beforeEach(() => {
  wrapped = shallow(<RefreshIcon />);
});

it("shows an svg with its path", () => {
  expect(wrapped.find("svg").length).toEqual(1);
  expect(wrapped.find("path").length).toEqual(1);
});
