import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './ReduxStore//reducers'
import middleware from './ReduxStore/middleware';




const store = createStore(reducer, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
