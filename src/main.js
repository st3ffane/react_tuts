import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom';

import reducers from './reducers'
import thunk from 'redux-thunk';

import { IntlProvider, addLocaleData } from 'react-intl'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './routes/router';

require('./scss/main.scss');

// i18n datas
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import fr from 'react-intl/locale-data/fr';
import it from 'react-intl/locale-data/it';
// Our translated strings
import localeData from './locales/data.json';


addLocaleData([...en, ...es, ...fr, ...it]);
// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) ||
                     navigator.language ||
                     navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;





const api = require('./api/rest.api');
let store = createStore( reducers,
   applyMiddleware(thunk.withExtraArgument(api))
);

// add i18n support
ReactDOM.render(
  <Provider store={store}>
  <IntlProvider locale={language} messages={messages}>
    <BrowserRouter>
      <MuiThemeProvider><App/></MuiThemeProvider>
    </BrowserRouter>
  </IntlProvider>
  </Provider>
    , document.getElementById('example'))
