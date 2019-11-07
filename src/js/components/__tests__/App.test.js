import React from "react";
import { mount } from "enzyme";

import { Root } from "Root";
import { App } from "js/components/App";
import { Pocket } from "js/components/Pocket";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

it("shows 2 currency pockets", () => {
  expect(wrapped.find(Pocket).length).toEqual(2);
});
