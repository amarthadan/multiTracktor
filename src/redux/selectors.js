import {SETTINGS_KEYS} from '../constants'

export const settingsGoalSelector = (state) => state.settings[SETTINGS_KEYS.GOAL]

export const settingsTimePeriodSelector = (state) => state.settings[SETTINGS_KEYS.TIME_PERIOD]

export const selectedCoordinatesSelector = (state) => state.newEvent.selectedCoordinates

export const locationPermissionsGrantedSelector = (state) => state.locationPermissionsGranted

export const currentPositionSelector = (state) => state.currentPosition

export const eventActionsModalSelector = (state) => state.modals.eventActions
