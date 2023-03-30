import { formatTime } from '../helpers/dateAndTime';

const getStockCandles = async ({
  period, precision: Precision, startTime, endTime,
}) => {
  const apiUrl = 'https://test.fxempire.com/api/v1/en/stocks/chart/candles';
  const StartTime = formatTime(startTime);
  const EndTime = formatTime(endTime);

  const queryParams = new URLSearchParams({
    Identifier: 'AAPL.XNAS',
    IdentifierType: 'Symbol',
    AdjustmentMethod: 'All',
    IncludeExtended: 'False',
    period,
    Precision,
    StartTime,
    EndTime,
    _fields: 'ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume',
  });

  const url = `${apiUrl}?${queryParams.toString()}`;

  try {
    const response = await fetch(url, { cache: 'force-cache' });
    return await response.json();
  } catch (error) {
    return [];
  }
};

export default getStockCandles;
