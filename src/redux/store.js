import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'

import rootReducer from './reducers'
import {getInitialState} from './state'

const middlewares = []

// eslint-disable-next-line no-undef
if (__DEV__) {
  middlewares.push(logger)
}

export default createStore(
  rootReducer,
  getInitialState(),
  applyMiddleware(...middlewares)
)
