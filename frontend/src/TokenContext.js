import React, { createContext, useState, useContext, useEffect } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  // Update localStorage whenever the token changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => useContext(TokenContext);
