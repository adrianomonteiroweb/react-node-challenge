import PropTypes from 'prop-types';
import React from 'react';

export default function Button({
  text,
  type,
  className,
  id,
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      className={className}
      id={id}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
