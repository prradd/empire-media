import moment from 'moment';

const formatTime = (time) => moment(time).format('MM/DD/YYYY HH:mm');

const now = () => moment();

const oneMonthAgo = () => moment().subtract(1, 'months');

const oneDayAgo = () => moment().subtract(1, 'days');

const oneHourAgo = () => moment().subtract(1, 'hours');

export {
  formatTime,
  now,
  oneMonthAgo,
  oneDayAgo,
  oneHourAgo,
};
