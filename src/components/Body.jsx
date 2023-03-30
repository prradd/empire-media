import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import HistoryTable from './HistoryTable';
import OverviewChart from './OverviewChart';
import getStockCandles from '../api/stockApi';
import {
  now, oneDayAgo, oneHourAgo, oneMonthAgo,
} from '../helpers/dateAndTime';

import './Body.css';

function Body() {
  const [tabValue, setTabValue] = React.useState(0);
  const [stockData, setStockData] = useState([]);
  const [period, setPeriod] = useState('1w');

  useEffect(() => {
    const endTime = now();
    let callObj = {};
    switch (period) {
      case '1m':
        callObj = {
          period: 1,
          precision: 'Minutes',
          startTime: oneHourAgo(),
          endTime,
        };
        break;
      case '5m':
        callObj = {
          period: 5,
          precision: 'Minutes',
          startTime: oneHourAgo(),
          endTime,
        };
        break;
      case '1h':
        callObj = {
          period: 1,
          precision: 'Hours',
          startTime: oneDayAgo(),
          endTime,
        };
        break;
      case '1w':
        callObj = {
          period: 24 * 7,
          precision: 'Hours',
          startTime: oneMonthAgo(),
          endTime,
        };
        break;
      default:
        break;
    }
    getStockCandles(callObj).then((data) => {
      setStockData(data);
    });
  }, [period]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        margin: 2,
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="tabs-container"
        >
          <Tab label="Overview" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="History" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <OverviewChart stockData={stockData} period={period} onPeriodChange={setPeriod} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <HistoryTable stockData={stockData} />
      </TabPanel>
    </Box>
  );
}

export default Body;
