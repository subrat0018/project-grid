import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './styles.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Provider store={store}>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </Provider>
  </HashRouter>
);
