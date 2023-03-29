import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { calcPercentChange } from '../helpers/dataFormat';

import './HistoryTable.css';

export const tableColumns = [
  { id: 'Date', label: 'Date' },
  { id: 'High', label: 'High' },
  { id: 'Low', label: 'Low' },
  { id: 'Open', label: 'Open' },
  { id: 'Close', label: 'Close' },
  { id: 'percentChange', label: '% Change' },
];

function HistoryTable({ stockData }) {
  const [rows, setRows] = useState(stockData);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');

  const onRequestSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
    const sortedData = [...rows]
      .sort((a, b) => (isAsc ? a[orderBy] - b[orderBy] : b[orderBy] - a[orderBy]));
    setRows(sortedData);
  };

  return (
    <Paper>
      <TableContainer>
        <Table className="table">
          <TableHead className="table-head">
            <TableRow className="table-head-row">
              {tableColumns.map(({ id, label }) => (
                <TableCell
                  key={id}
                  sortDirection={orderBy === id ? order : false}
                >
                  <TableSortLabel
                    direction={orderBy === id ? order : 'asc'}
                    onClick={() => onRequestSort(id)}
                  >
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className="table-body">
            {rows.map(({
              StartDate, StartTime, High, Low, Open, Close,
            }) => {
              const percentChange = calcPercentChange(Open, Close);
              return (
                <TableRow hover key={StartDate + StartTime}>
                  <TableCell>{StartDate}</TableCell>
                  <TableCell>{High}</TableCell>
                  <TableCell>{Low}</TableCell>
                  <TableCell>{Open}</TableCell>
                  <TableCell>{Close}</TableCell>
                  <TableCell
                    className={percentChange > 0 ? 'green-text' : 'red-text'}
                  >
                    {percentChange}
                    %
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

HistoryTable.propTypes = {
  stockData: PropTypes.arrayOf(PropTypes.shape({
    StartDate: PropTypes.string,
    StartTime: PropTypes.string,
    High: PropTypes.number,
    Low: PropTypes.number,
    Open: PropTypes.number,
    Close: PropTypes.number,
    Date: PropTypes.string,
  })),
};

HistoryTable.defaultProps = {
  stockData: [],
};
export default HistoryTable;
