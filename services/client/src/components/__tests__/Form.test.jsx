import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Form from '../forms/Form';

const testData = [
    {
        formType: 'Register',
        title: 'Register',
        formData: {
            username: '',
            email: '',
            password: '',
        },
        loginUser: jest.fn(),
        isAuthenticated: false,
    },
    {
        formType: 'Login',
        title: 'Log In',
        formData: {
            email: '',
            password: '',
        },
        loginUser: jest.fn(),
        isAuthenticated: false,
    },
]
describe('When not authenticated', () => {
    testData.forEach((data) => {
        const component = <Form {...data}
        />;
        it(`${data.formType} form renders correctly`, () => {
            const wrapper = shallow(component);
            const h1 = wrapper.find('h1');
            expect(h1.length).toBe(1);
            expect(h1.get(0).props.children).toBe(data.title);
            const formGroup = wrapper.find('.field');
            expect(formGroup.length).toBe(Object.keys(data.formData).length);
            expect(formGroup.get(0).props.children.props.name).toBe(Object.keys(data.formData)[0]);
            expect(formGroup.get(0).props.children.props.value).toBe('');
        });

        it(`${data.formType} submits the form properly`, () => {
            const wrapper = shallow(component);
            wrapper.instance().handleUserFormSubmit = jest.fn();
            wrapper.update();
            const input = wrapper.find('input[type="email"]')
            expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledTimes(0);
            input.simulate(
                'change', { target: { name: 'email', value: 'test@test.com'} });
            wrapper.find('form').simulate('submit', data.formData);
            expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledWith(data.formData);
            expect(wrapper.instance().handleUserFormSubmit).toHaveBeenCalledTimes(1);
        });

        it(`${data.formType} form should be disabled by default`, () => {
            const wrapper = shallow(component);
            const input = wrapper.find('input[type="submit"]');
            expect(input.get(0).props.disabled).toEqual(true);
        });

        it(`${data.formType} form snapshot renders correctly`, () => {
            const component = <Form formType={`${data.formType}`} formData={data.formData} />;
            const tree = renderer.create(component).toJSON();
            expect(tree).toMatchSnapshot();
        });
    })
});

describe('When authenticated', () => {
    testData.forEach((data) => {
        const component = <Form
            formType={data.formType}
            formData={data.formData}
            isAuthenticated={true}
        />;
        it(`${data.formType} redirects properly`, () => {
            const wrapper = shallow(component);
            expect(wrapper.find('Redirect')).toHaveLength(1);
        });
    })
});