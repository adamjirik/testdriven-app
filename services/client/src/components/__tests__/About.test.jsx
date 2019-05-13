import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import About from '../About';

test('About renders properly', () => {
    const wrapper = shallow(<About/>);
    const element = wrapper.find('p');
    expect(element.length).toBe(1);
    expect(element.text()).toBe('Test driven app built on Flask, ReactJS, running on Amazon EC2/ECR and Docker.')
});

test('About snapshot renders correctly', () => {
    const tree = renderer.create(<About/>).toJSON();
    expect(tree).toMatchSnapshot();
});