const getStockCandles = async ({
  period, Precision, StartTime, EndTime,
}) => {
  const apiUrl = 'https://test.fxempire.com/api/v1/en/stocks/chart/candles';
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
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export default getStockCandles;
