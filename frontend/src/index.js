import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TokenProvider } from './TokenContext';

ReactDOM.render(
  <TokenProvider>
    <App />
  </TokenProvider>,
  document.getElementById('root')
);