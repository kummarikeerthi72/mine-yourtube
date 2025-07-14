import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import { thunk } from 'redux-thunk'; // ✅ Correct import for latest version
import { GoogleOAuthProvider } from '@react-oauth/google';
import Reducers from './Reducers';

const store = createStore(Reducers, compose(applyMiddleware(thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </GoogleOAuthProvider>
  </Provider>
);

reportWebVitals();
