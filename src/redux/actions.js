export const ACTIONS = {
  SETTINGS_UPDATED: 'Settings updated',
  COORDINATES_SELECTED: 'Coordinates selected',
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
