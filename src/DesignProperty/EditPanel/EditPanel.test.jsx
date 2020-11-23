import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from 'enzyme';

import EditPanel from "./EditPanel";
import * as defaultTheme from "../../themes/default";
import AppContext from "../../context/AppContext";

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
          <EditPanel reference={reference} currentValue={currentValue} onClose={onClose} />,);
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
});