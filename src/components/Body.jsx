import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel';
import HistoryTable from './HistoryTable';
import OverviewChart from './OverviewChart';
import getStockCandles from '../api/stockApi';
import { formatTime } from '../helpers/dataFormat';

import './Body.css';

function Body() {
  const [tabValue, setTabValue] = React.useState(0);
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const endTime = new Date();
    const startTime = new Date(endTime.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

    getStockCandles({
      period: 24,
      Precision: 'Hours',
      StartTime: formatTime(startTime),
      EndTime: formatTime(endTime),
    }).then((data) => {
      setStockData(data);
    });
  }, []);

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
        <OverviewChart stockData={stockData} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <HistoryTable stockData={stockData} />
      </TabPanel>
    </Box>
  );
}

export default Body;
