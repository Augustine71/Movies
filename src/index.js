import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-p4avgs26tdfvfxro.us.auth0.com"
      clientId="55RVEZnVBGIjSLDC2OJWvIlGgLhUjVk9"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <Provider store={store}>
      <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
