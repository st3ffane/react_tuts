import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom';

import reducers from './reducers'
import thunk from 'redux-thunk';

import { IntlProvider } from 'react-intl'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './routes/router';

require('./scss/main.scss');

const api = require('./api/rest.api');
let store = createStore( reducers,
   applyMiddleware(thunk.withExtraArgument(api))
);

ReactDOM.render(
  <Provider store={store}>
  <IntlProvider locale='en'>
    <BrowserRouter>
      <MuiThemeProvider><App/></MuiThemeProvider>
    </BrowserRouter>
  </IntlProvider>
  </Provider>
    , document.getElementById('example'))
