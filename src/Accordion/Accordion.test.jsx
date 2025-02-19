import React from "react";
import { ThemeProvider } from "styled-components";
import { mount } from 'enzyme';

import Accordion from "./Accordion";
import * as defaultTheme from "../themes/default";

const title = 'Global colors';

describe('<Accordion />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <ThemeProvider theme={defaultTheme}>
                <Accordion title={title}>
                    <div id="children">children</div>
                </Accordion>;
            </ThemeProvider>
        );
    });

    afterEach(() => {
        wrapper.unmount();
    })

    test("should open panel children when click on header accordion", () => {
        expect(wrapper.find('#children').exists()).toBe(false);
        const button = wrapper.find('button#accordion0id');
        button.simulate('click'); // Open
        const editPanel = wrapper.find('#children');
        expect(editPanel.exists()).toBe(true);
    });

    test("should close panel children when click on header accordion", () => {
        const button = wrapper.find('button#accordion0id');
        button.simulate('click'); // Open
        button.simulate('click'); // Close
        const editPanel = wrapper.find('#children');
        expect(editPanel.exists()).toBe(false);
    });
});







