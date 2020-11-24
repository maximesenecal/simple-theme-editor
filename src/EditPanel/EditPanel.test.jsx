import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from 'enzyme';

import EditPanel from "./EditPanel";
import * as defaultTheme from "../themes/default";
import AppContext from "../context/AppContext";

const header = "General colors";
const reference = 'colors.primary';
const currentValue = '#ffffff';
const onClose = jest.fn();
const updateTheme = jest.fn();

describe('<EditPanel />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AppContext.Provider value={{ updateTheme }}>
        <ThemeProvider theme={defaultTheme}>
          <EditPanel header={header} reference={reference} currentValue={currentValue} onClose={onClose} />,);
      </ThemeProvider>
      </AppContext.Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  })

  test("should update theme when change value and click on update button", () => {
    const input = wrapper.find('input[type="text"]');
    input.simulate('focus');
    input.simulate('change', { target: { value: '12' }});
    const button = wrapper.find('button#update-button');
    button.simulate('click');
    expect(updateTheme).toHaveBeenCalledWith('colors.primary', '12');
  });
  test("should update theme when change value with reference and click on update button", () => {
    const input = wrapper.find('input[type="text"]');
    input.simulate('focus');
    input.simulate('change', { target: { value: '{colors.secondary}' }});
    const button = wrapper.find('button#update-button');
    button.simulate('click');
    expect(updateTheme).toHaveBeenCalledWith('colors.primary', '{colors.secondary}');
  });
  test("should display error message and disable button when typing wrong reference", () => {
    const input = wrapper.find('input[type="text"]');
    input.simulate('focus');
    input.simulate('change', { target: { value: '{sizes.borderWidth} solid {colors.toto}' }});
    const error = wrapper.find('span#error-message');
    const button = wrapper.find('button#update-button');
    expect(button.props().disabled).toBe(true);
    expect(error.exists()).toBe(true);
  });
});