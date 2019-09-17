import React from 'react'
import MapboxGL from '@react-native-mapbox-gl/maps'

import {useInitializeSettings} from './hooks/settings'
import AppContainer from './navigation/container'

const MAPBOX_ACCESS_TOKEN = 'sk.eyJ1IjoibXVsdGl0cmFja3RvciIsImEiOiJjazBmcDhvMWswazh0M25wMmJwaHB4NWF2In0.QsseOG_uNPMsrElKJrphyQ'

MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN)

const App = () => {
  useInitializeSettings()

  return (<AppContainer />)
}

export default App
