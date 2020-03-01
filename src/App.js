// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import './App.css';
import '@gooddata/react-components/styles/css/main.css';
import { ColumnChart } from '@gooddata/react-components';
import { BarChart } from '@gooddata/react-components';
import { AreaChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths =
  '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

class App extends Component {
  constructor() {
    super();
    this.state = {
      defaultValue: '1',
      defaultYear: '2015',
      defaultChart: ColumnChart
    };
  }

  handleMonth = event => {
    const value = event.target.value;
    this.setState({ defaultValue: value });
  };

  handleYear = event => {
    const value = event.target.value;
    this.setState({ defaultYear: value });
  };

  handleChart = event => {
    const value = event.target.value;
    switch (value) {
      case 'ColumnChart':
        this.setState({ defaultChart: ColumnChart });
        break;
      case 'BarChart':
        this.setState({ defaultChart: BarChart });
        break;
      case 'AreaChart':
        this.setState({ defaultChart: AreaChart });
        break;
      default:
        this.setState({ defaultChart: ColumnChart });
    }
  };

  getMonthFilter() {
    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute
        },
        from: `${this.state.defaultYear}-${this.state.defaultValue}-01`,
        to: `${this.state.defaultYear}-${this.state.defaultValue}-31`
      }
    };
  }

  getMeasures() {
    return [
      {
        measure: {
          localIdentifier: 'm1',
          definition: {
            measureDefinition: {
              item: {
                uri: grossProfitMeasure
              }
            }
          },
          alias: '$ Gross Profit'
        }
      }
    ];
  }

  getViewBy() {
    return {
      visualizationAttribute: {
        displayForm: {
          uri: dateAttributeInMonths
        },
        localIdentifier: 'a1'
      }
    };
  }

  renderDropdown() {
    return (
      <select
        defaultValue={this.state.defaultValue}
        onChange={this.handleMonth}
        className='selectMonth'>
        <option value='1' className='selectMonth1'>
          January
        </option>
        <option value='2'>February</option>
        <option value='3'>March</option>
        <option value='4'>April</option>
        <option value='5'>May</option>
        <option value='6'>June</option>
        <option value='7'>July</option>
        <option value='8'>August</option>
        <option value='9'>September</option>
        <option value='10'>October</option>
        <option value='11'>November</option>
        <option value='12'>December</option>
      </select>
    );
  }

  renderYear() {
    return (
      <select
        defaultValue={this.state.defaultYear}
        onChange={this.handleYear}
        className='selectYear'>
        <option value='2015' className='selectYear1'>
          2015
        </option>
        <option value='2016'>2016</option>
        <option value='2017'>2017</option>
      </select>
    );
  }

  renderChartType() {
    return (
      <select
        defaultValue={this.state.defaultChart}
        onChange={this.handleChart}
        className='selectChart'>
        <option value='ColumnChart' className='selectChart1'>
          Column Chart
        </option>
        <option value='BarChart'>Bar Chart</option>
        <option value='AreaChart'>Area Chart</option>
      </select>
    );
  }

  render() {
    const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
    const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();

    return (
      <div className='App'>
        <h1>
          $ Gross Profit in month {this.renderDropdown()} {this.renderYear()}{' '}
          {this.renderChartType()}
        </h1>
        <div className='chart'>
          <this.state.defaultChart
            measures={measures}
            filters={filters}
            projectId={projectId}
          />
        </div>
        <h1>$ Gross Profit - All months</h1>
        <div className='chart'>
          <this.state.defaultChart
            measures={measures}
            viewBy={viewBy}
            projectId={projectId}
          />
        </div>
      </div>
    );
  }
}

export default App;
