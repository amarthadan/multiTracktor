import React from 'react'

import {useInitializeSettings} from './hooks/settings'
import AppContainer from './navigation/container'

const App = () => {
  useInitializeSettings()

  return (<AppContainer />)
}

export default App
