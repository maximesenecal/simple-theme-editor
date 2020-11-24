import React from "react";
import { mount } from 'enzyme';

import App from "./App";
import * as defaultTheme from "./themes/default";

describe('<App />', () => {
    let wrapper;

    afterEach(() => {
        wrapper.unmount();
    })

    test("should save current theme in local when click on save button", () => {
        wrapper = mount(<App />);
        const spy = jest.spyOn(window.localStorage, 'setItem');
        const button = wrapper.find('button#save-button');
        button.simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    test("should load local theme when exists on mount", () => {
        window.localStorage.setItem('simpleEditorTheme', JSON.stringify(defaultTheme));
        const spy = jest.spyOn(window.localStorage, 'getItem');
        wrapper = mount(<App />);
        expect(spy).toHaveBeenCalled();
    });
});