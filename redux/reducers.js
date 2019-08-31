import {combineReducers} from 'redux'

import {ACTIONS} from './actions'
import {getInitialSettings} from './state'

const settingsReducer = (state = getInitialSettings(), action) => {
  switch (action.type) {
    case ACTIONS.SETTINGS_UPDATED:
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  settings: settingsReducer,
})
