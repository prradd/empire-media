import React from 'react';
import PropTypes from 'prop-types';

import './CustomTooltip.css';

function CustomTooltip({ active, payload, label }) {
  if (active && payload) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Date: ${label}`}</p>
        <p className="value">{`Close: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
}

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
  })),
  label: PropTypes.string,
};

CustomTooltip.defaultProps = {
  active: false,
  payload: [],
  label: '',
};

export default CustomTooltip;
