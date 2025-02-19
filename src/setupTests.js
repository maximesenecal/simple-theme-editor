// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
/* eslint-disable */
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const localStorageMock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

configure({ adapter: new Adapter() });