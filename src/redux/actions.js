export const ACTIONS = {
  SETTINGS_UPDATED: 'Settings updated',
  COORDINATES_SELECTED: 'Coordinates selected',
  LOCATION_PERMISSION_GRANTED_CHANGED: 'Location permission granted changed',
  CURRENT_POSITION_UPDATED: 'Current position updated',
}

export const settingsUpdated = (settings) => (
  {
    type: ACTIONS.SETTINGS_UPDATED,
    payload: settings,
  }
)

export const coordinatesSelected = (coordinates) => (
  {
    type: ACTIONS.COORDINATES_SELECTED,
    payload: coordinates,
  }
)

export const locationPermissionGrantedChanged = (granted) => (
  {
    type: ACTIONS.LOCATION_PERMISSION_GRANTED_CHANGED,
    payload: granted,
  }
)

export const currentPositionUpdated = (position) => {
  const {latitude, longitude} = position.coords

  return {
    type: ACTIONS.CURRENT_POSITION_UPDATED,
    payload: {latitude, longitude},
  }
}
