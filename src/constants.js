export const SETTINGS_KEYS = {
  RUNNED: '@runned',
  TIME_PERIOD: '@time_period',
  GOAL: '@goal',
}

export const DEFAULT_SETTINGS = {
  [SETTINGS_KEYS.RUNNED]: 'true',
  [SETTINGS_KEYS.TIME_PERIOD]: '6',
  [SETTINGS_KEYS.GOAL]: '18',
}

export const TIME_PERIODS = ['1', '3', '6', '12']

export const COLORS = {
  primary: {
    normal: '#6200ea',
    light: '#9d46ff',
    dark: '#0a00b6',
    text: '#ffffff',
  },
  secondary: {
    normal: '#ff6d00',
    light: '#ff9e40',
    dark: '#c43c00',
    text: '#000000',
  },
}

export const DATETIME_FORMAT = 'dd.MM.yyyy HH:mm'

export const DEFAULT_COORDINATES = {
  longitude: 18,
  latitude: 49,
}

export const ZOOM_LEVEL = {
  gpsPosition: 12,
  ipPosition: 10,
  defaultPositon: 5,
}

export const POSITION_RADIUS = 100

export const INITIAL_NUMBER_OF_LIST_ITEMS = 30
