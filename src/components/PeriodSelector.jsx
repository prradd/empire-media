import React from 'react';
import { Button, ButtonGroup, Grid } from '@mui/material';
import PropTypes from 'prop-types';

import './PeriodSelector.css';

function PeriodSelector({ period, onPeriodChange }) {
  return (
    <Grid container className="period-selector">
      <ButtonGroup className="button-group" aria-label="time period buttons">
        <Button
          className={period === '1m' ? 'contained' : 'outlined'}
          onClick={() => onPeriodChange('1m')}
        >
          1 Minute
        </Button>
        <Button
          className={period === '5m' ? 'contained' : 'outlined'}
          onClick={() => onPeriodChange('5m')}
        >
          5 Minutes
        </Button>
        <Button
          className={period === '1h' ? 'contained' : 'outlined'}
          onClick={() => onPeriodChange('1h')}
        >
          1 Hour
        </Button>
        <Button
          className={period === '1w' ? 'contained' : 'outlined'}
          onClick={() => onPeriodChange('1w')}
        >
          1 Week
        </Button>
      </ButtonGroup>
    </Grid>
  );
}

PeriodSelector.propTypes = {
  period: PropTypes.string.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
};
export default PeriodSelector;
