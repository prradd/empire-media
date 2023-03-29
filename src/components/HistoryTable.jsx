import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel,
} from '@mui/material';
import getStockCandles from '../api/stockApi';
import { calcPercentChange } from '../helpers/dataFormat';

export const tableColumns = [
  { id: 'date', label: 'Date' },
  { id: 'high', label: 'High' },
  { id: 'low', label: 'Low' },
  { id: 'open', label: 'Open' },
  { id: 'close', label: 'Close' },
  { id: 'percentChange', label: '% Change' },
];

function HistoryTable() {
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('date');

  useEffect(() => {
    getStockCandles({
      period: 1,
      Precision: 'Hours',
      StartTime: '02/22/2023',
      EndTime: '03/01/2023 23:59',
    }).then((data) => {
      setRows(data);
    });
  }, []);

  useEffect(() => {
    const sortedRows = rows.sort((a, b) => {
      if (order === 'asc') {
        return a[orderBy] - b[orderBy];
      }
      return b[orderBy] - a[orderBy];
    });
    setRows(sortedRows);
  }, [order, orderBy]);

  const onRequestSort = (id) => {
    const isAsc = orderBy === id && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(id);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
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

          <TableBody>
            {rows.map(({
              StartDate, StartTime, High, Low, Open, Close,
            }) => (
              <TableRow hover key={StartDate + StartTime}>
                <TableCell>{StartDate}</TableCell>
                <TableCell>{High}</TableCell>
                <TableCell>{Low}</TableCell>
                <TableCell>{Open}</TableCell>
                <TableCell>{Close}</TableCell>
                <TableCell>{calcPercentChange(Open, Close)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default HistoryTable;
