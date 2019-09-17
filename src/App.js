import React from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps'

import Config from './config'
import {useInitializeSettings} from './hooks/settings'
import AppContainer from './navigation/container'

MapboxGL.setAccessToken(Config.MAPBOX_ACCESS_TOKEN)

const App = () => {
  useInitializeSettings()

  return (<AppContainer />)
}

export default App
