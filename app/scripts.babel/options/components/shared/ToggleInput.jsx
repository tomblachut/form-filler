import React from 'react';
import PropTypes from 'prop-types';

const ToggleInput = ({ input, label, type }) => (
  <div className={type}>
    <label>
      <input {...input} type={type}/>
      {label}
    </label>
  </div>
);

ToggleInput.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
};

export default ToggleInput;
