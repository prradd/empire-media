import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Grid, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { formatSocketMessage } from '../helpers/dataFormat';

import './Header.css';

const wsUrl = 'wss://wstest.fxempire.com?token=btctothemoon';

function Header({ stockName, instrument }) {
  const [stockData, setStockData] = useState({});

  const instruments = [instrument];
  const subscribeMsg = JSON.stringify({ type: 'SUBSCRIBE', instruments });
  const unsubscribeMsg = JSON.stringify({ type: 'UNSUBSCRIBE', instruments });

  const isStockUp = stockData?.change > 0;

  useEffect(() => {
    const ws = new ReconnectingWebSocket(wsUrl, [], {
      WebSocket: window.WebSocket,
      connectionTimeout: 4000,
      maxRetries: 10,
    });

    ws.addEventListener('open', () => {
      ws.send(subscribeMsg); // Subscribe to the AAPL stock updates
    });

    ws.addEventListener('message', (event) => {
      const msgData = JSON.parse(event.data);
      if (msgData[instrument]) {
        setStockData(formatSocketMessage(msgData[instrument]));
      }
    });

    ws.addEventListener('close', () => {
      setStockData({});
    });

    return () => {
      ws.send(unsubscribeMsg); // Unsubscribe from the AAPL stock updates
      ws.close();
    };
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 1,
        margin: 2,
        padding: 4,
        minHeight: 100,
      }}
      className="header"
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={3}
      >
        <Grid item md={4} lg={3}>
          <Typography variant="h4" align="left" className="title">
            {stockName}
          </Typography>
          {stockData?.lastUpdate && (
            <Typography component="p" align="left" className="under-title">
              As of:
              {' '}
              {stockData.lastUpdate}
            </Typography>
          )}
        </Grid>
        <Grid item md={4} lg={6} />
        <Grid item md={4} lg={3}>
          {stockData?.last && (
            <Box className="">
              <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} className="stock-value">
                  <Grid container direction="row" alignItems="center">
                    <Typography variant="h6" component="h3">
                      {isStockUp ? (
                        <div className="up-arrow" />
                      ) : (
                        <div className="down-arrow" />
                      )}
                    </Typography>
                    <Typography variant="h2" className="price">
                      {stockData.last}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    className={isStockUp ? 'green-text' : 'red-text'}
                    sx={{ mt: -1 }}
                  >
                    <Typography variant="h6" component="h3" className="">
                      {stockData.change}
                    </Typography>
                    <Typography variant="h6" component="h3" className="">
                      (
                      {stockData.percentChange}
                      )
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

Header.propTypes = {
  stockName: PropTypes.string,
  instrument: PropTypes.string,
};

Header.defaultProps = {
  stockName: 'Apple Inc',
  instrument: 's-aapl',
};
export default Header;
