// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React from 'react';
import renderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App component', () => {
  it('starts with initial conditions January, 2015 and Column Chart', () => {
    const wrapper = shallow(<App />);
    const month = wrapper.find('option.selectMonth1').text();
    const year = wrapper.find('option.selectYear1').text();
    const chart = wrapper.find('option.selectChart1').text();
    expect(month).toEqual('January');
    expect(year).toEqual('2015');
    expect(chart).toEqual('Column Chart');
  });

  it('when a change event occurs, select should update its value', () => {
    const wrapper = shallow(<App />);
    wrapper
      .find('select.selectMonth')
      .simulate('change', { target: { value: 'March' } });
    wrapper
      .find('select.selectYear')
      .simulate('change', { target: { value: '2016' } });
    wrapper
      .find('select.selectChart')
      .simulate('change', { target: { value: 'Bar Chart' } });
  });
});
