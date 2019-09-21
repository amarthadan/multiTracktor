import {combineReducers} from 'redux'

import {ACTIONS} from './actions'
import {
  getInitialSettings,
  getInitialNewEvent,
  getInitialLocationPermissionsGranted,
  getInitialCurrentPosition,
} from './state'

const settingsReducer = (state = getInitialSettings(), action) => {
  switch (action.type) {
    case ACTIONS.SETTINGS_UPDATED:
      return {...state, ...action.payload}
    default:
      return state
  }
}

const newEventReducer = (state = getInitialNewEvent(), action) => {
  switch (action.type) {
    case ACTIONS.COORDINATES_SELECTED:
      return {...state, selectedCoordinates: action.payload}
    default:
      return state
  }
}

const locationPermissionsGrantedReducer =
  (state = getInitialLocationPermissionsGranted(), action) => {
    switch (action.type) {
      case ACTIONS.LOCATION_PERMISSION_GRANTED_CHANGED:
        return action.payload
      default:
        return state
    }
  }

const currentPositionReducer = (state = getInitialCurrentPosition(), action) => {
  switch (action.type) {
    case ACTIONS.CURRENT_POSITION_UPDATED:
      return {...state, ...action.payload}
    default:
      return state
  }
}

export default combineReducers({
  settings: settingsReducer,
  newEvent: newEventReducer,
  locationPermissionsGranted: locationPermissionsGrantedReducer,
  currentPosition: currentPositionReducer,
})
