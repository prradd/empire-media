import React from 'react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from 'recharts';
import PropTypes from 'prop-types';

function OverviewChart({ stockData }) {
  return (
    <AreaChart
      width={window.innerWidth * 0.9}
      height={400}
      data={stockData}
      margin={{
        top: 10,
        right: 20,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Date" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="Close" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}

OverviewChart.propTypes = {
  stockData: PropTypes.arrayOf(PropTypes.shape({
    Close: PropTypes.number,
    Date: PropTypes.string,
  })),
};

OverviewChart.defaultProps = {
  stockData: [],
};

export default OverviewChart;
