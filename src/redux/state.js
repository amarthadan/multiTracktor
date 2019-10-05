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

export const getInitilModals = () => (
  {
    eventActions: getInitialEventActions(),
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
