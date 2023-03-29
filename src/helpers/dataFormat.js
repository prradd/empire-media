const formatSocketMessage = ({
  last, change, percentChange, lastUpdate,
}) => {
  const formattedLast = parseFloat(last).toFixed(2);
  const formattedChange = parseFloat(change).toFixed(2);
  const formattedPercentChange = `${percentChange}%`;
  const formattedLastUpdate = new Date(lastUpdate).toLocaleString();
  return {
    last: formattedLast,
    change: formattedChange,
    percentChange: formattedPercentChange,
    lastUpdate: formattedLastUpdate,
  };
};
// function to calculate the positive or negative percent change
const calcPercentChange = (open, close) => {
  const percentChange = ((close - open) / open) * 100;
  return percentChange.toFixed(2);
};

export {
  formatSocketMessage,
  calcPercentChange,
};
