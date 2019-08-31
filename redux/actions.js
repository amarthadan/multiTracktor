export const ACTIONS = {
  SETTINGS_UPDATED: 'Settings updated',
}

export const settingsUpdated = (settings) => (
  {
    type: ACTIONS.SETTINGS_UPDATED,
    payload: settings,
  }
)
