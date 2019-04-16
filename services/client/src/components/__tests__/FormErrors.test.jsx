import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';

import FormErrors from '../forms/FormErrors';
import { registerFormRules, loginFormRules } from '../forms/form-rules.js';

const testData = [{
        formType: 'Register',
        formRules: registerFormRules,
    },
    {
        formType: 'Login',
        formRules: loginFormRules,
    }
]
testData.forEach((data) => {
    test(`FormErrors (with ${data.formType} form) renders properly.`, () => {
        const wrapper = shallow(<FormErrors {...data}/>);
        const ul = wrapper.find('ul');
        expect(ul.length).toBe(1);
        const li = wrapper.find('li');
        switch(data.formType) {
            case 'Regsiter':
                expect(li.length).toBe(4);
                expect(li.get(0).props.children).toContain('Username must be greater than 5 characters.');
                expect(li.get(1).props.children).toContain('Email must be greater than 5 characters.');
                expect(li.get(2).props.children).toContain('Email must be a valid email address.');
                expect(li.get(3).props.children).toContain('Password must be at least 8 characters.');
                break;
            case 'Login':
                expect(li.length).toBe(2);
                expect(li.get(0).props.children).toContain('Email is required.');
                expect(li.get(1).props.children).toContain('Password is required.');
                break;
        }


    })
    
    test(`FormErrors ${data.formType} snapshot renders properly.`, () => {
        const tree = renderer.create(<Router><FormErrors {...data} /></Router>).toJSON();
        expect(tree).toMatchSnapshot();
    })
});