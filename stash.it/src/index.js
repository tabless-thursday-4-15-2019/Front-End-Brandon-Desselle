import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk'
import reducer from './components/reducer/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

import './reset.css'
import App from './App'

/* STORE */
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, logger))
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)