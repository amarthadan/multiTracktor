import React from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps'

import Config from './config'
import {useInitializeSettings} from './hooks/settings'
import {useAskLocationPermissions} from './hooks/permissions'
import AppContainer from './navigation/container'

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN)
MapboxGL.setTelemetryEnabled(false)

const App = () => {
  useInitializeSettings()
  useAskLocationPermissions()

  return (<AppContainer />)
}

export default App
