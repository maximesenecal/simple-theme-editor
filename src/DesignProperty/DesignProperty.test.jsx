import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from 'enzyme';

import DesignProperty from "./DesignProperty";
import * as defaultTheme from "../themes/default";

const component = 'colors';
const item = 'primary';
const value = '#ffffff';
const type = 'color';
const label = 'Primary font color';

describe('<DesignProperty />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <ThemeProvider theme={defaultTheme}>
        <DesignProperty component={component} item={item} value={value} type={type} label={label} />,);
      </ThemeProvider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  test("should open edit panel when user click on header panel", () => {
    const button = wrapper.find('button#header-panel');
    button.simulate('click');
    const editPanel = wrapper.find('EditPanel');
    expect(editPanel.exists()).toBe(true);
  });
  test("should close edit panel when user click on close button", () => {
    const button = wrapper.find('button#header-panel');
    button.simulate('click');
    const close = wrapper.find('button#close-button');
    close.simulate('click');
    const editPanel = wrapper.find('EditPanel');
    expect(editPanel.exists()).toBe(false);
  });
});

test("should replace reference in header when detect one", () => {
  const valueWithRef = '{sizes.borderWidth}px solid {colors.primary}';

  const wrapper = mount(
    <ThemeProvider theme={defaultTheme}>
        <DesignProperty component={component} item={item} value={valueWithRef} type={type} label={label} />,);
    </ThemeProvider>
  );

  const headerPanel = wrapper.find('p#value');
  expect(headerPanel.text()).toBe('Primary font color(color) - 1px solid #393b44');
});







