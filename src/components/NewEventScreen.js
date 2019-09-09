import React from 'react'
import {View} from 'react-native'

import NewEventButton from './NewEventButton'

const NewEventScreen = () => {

  return (
    <View>
      <NewEventButton lat={0.0} long={0.0} />
    </View>
  )
}

export default NewEventScreen
