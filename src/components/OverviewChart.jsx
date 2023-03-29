import React from 'react';
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import PropTypes from 'prop-types';

import CustomTooltip from './CustomTooltip';

function OverviewChart({ stockData }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={stockData}
        margin={{
          top: 10,
          right: 20,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="Date"
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
        />
        <YAxis orientation="right" />
        <Tooltip
          content={<CustomTooltip />}
          labelFormatter={(label) => new Date(label).toLocaleDateString()}
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2F80E2FF" stopOpacity={0.1} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="Close" stroke="#2F80E2FF" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
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
