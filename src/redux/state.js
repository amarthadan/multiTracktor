export const getInitialSettings = () => ({})

const getInitialSelectedCoordinates = () => null

export const getInitialNewEvent = () => (
  {
    selectedCoordinates: getInitialSelectedCoordinates(),
  }
)

export const getInitialLocationPermissionsGranted = () => false

export const getInitialCurrentPosition = () => null

const getInitialEventActions = () => (
  {
    visible: false,
    eventId: null,
    modalId: null,
  }
)

const getInitialEventExists = () => (
  {
    visible: false,
  }
)

export const getInitilModals = () => (
  {
    eventActions: getInitialEventActions(),
    eventExists: getInitialEventExists(),
  }
)

export const getInitialState = () => (
  {
    settings: getInitialSettings(),
    newEvent: getInitialNewEvent(),
    locationPermissionsGranted: getInitialLocationPermissionsGranted(),
    currentPosition: getInitialCurrentPosition(),
  }
)
