import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import './Body.css';
import TabPanel from './TabPanel';
import HistoryTable from './HistoryTable';

function Body() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          className="tabs-container"
        >
          <Tab label="Overview" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="History" id="tab-1" aria-controls="tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HistoryTable />
      </TabPanel>
    </Box>
  );
}

export default Body;
