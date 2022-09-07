import PropTypes from 'prop-types';
import { useState } from 'react';
import { Context } from './Context';

export function Provider({ children }) {
  const [user, setUser] = useState([]);

  const contextValue = {
    user,
    setUser,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
