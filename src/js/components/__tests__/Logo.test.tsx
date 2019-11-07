import React, { FunctionComponent } from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { Logo } from "js/components/Logo";

let wrapped: ShallowWrapper<FunctionComponent<{}>>;

beforeEach(() => {
  wrapped = shallow(<Logo />);
});

it("renders an image", () => {
  expect(wrapped.find(".logo").length).toEqual(1);
  expect(wrapped.find(".logo").prop("style")).toHaveProperty(
    "backgroundImage",
    "url(/revolut_icon.png)"
  );
});
