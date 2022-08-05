import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './ReduxStorage/storage';
import {positions, transitions, Provider as AlertProvider} from '@blaumaus/react-alert'
import AlertTemplate from './components/Toaster/ToastTemplate';

const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  timeout : 5000,
  position : positions.BOTTOM_CENTER,
  transition : transitions.SCALE
};

root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);
