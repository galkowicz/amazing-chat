import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MessageCreator from '../components/MessageCreator';
import localStorage from '../mocks/localStorage'

configure({adapter: new Adapter()});

let wrapper, ins;

describe('MessageCreator tests', () => {
    beforeAll(() => {
        wrapper = mount(<MessageCreator onSendMessage={() => {
            return true
        }}/>);
        ins = wrapper.instance();
    });

    it('Should mount MessageList', () => {
        expect(wrapper.html()).toContain('message-creator');
    });

    it('Should set component state (isEmptyMessage) on empty submit', () => {
        const ins = wrapper.instance();
        ins.handleSubmit();
        expect(wrapper.state('isEmptyMessage')).toBe(true);
    });

    it('Should set component state (username) according to input change', () => {
        const e = {target: {name: 'username', value: 'anna'}};
        ins.handleChange(e);
        expect(wrapper.state('username')).toBe('anna');
    });

    it('Should set component state (text) according to input change', () => {
        const e = {target: {name: 'text', value: 'one two'}};
        ins.handleChange(e);
        expect(wrapper.state('text')).toBe('one two');
    });

    it('Should set component state (username) according to input change', () => {
        const e = {target: {name: 'username', value: 'anna'}};
        ins.handleChange(e);
        expect(wrapper.state('username')).toBe('anna');
    });

    it('Should set component state (isEmptyMessage) on valid submit', () => {
        const ins = wrapper.instance();
        ins.handleSubmit();
        expect(wrapper.state('isEmptyMessage')).toBe(false);
    });
});