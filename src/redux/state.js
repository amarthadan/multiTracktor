import {DEFAULT_COORDINATES} from '../constants'

export const getInitialSettings = () => ({})

const getInitialSelectedCoordinates = () => (DEFAULT_COORDINATES)

export const getInitialNewEvent = () => (
  {
    selectedCoordinates: getInitialSelectedCoordinates(),
  }
)

export const getInitialLocationPermissionsGranted = () => false

export const getInitialState = () => (
  {
    settings: getInitialSettings(),
    newEvent: getInitialNewEvent(),
    locationPermissionsGranted: getInitialLocationPermissionsGranted(),
  }
)
