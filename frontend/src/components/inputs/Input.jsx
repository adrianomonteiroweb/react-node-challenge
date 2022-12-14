import PropTypes from 'prop-types';
import React from 'react';

export default function Input({ type, className, value, id, onChange }) {
  return (
    <label htmlFor={id}>
      <input
        type={type}
        className={className}
        value={value}
        id={id}
        onChange={onChange}
      />
    </label>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;
