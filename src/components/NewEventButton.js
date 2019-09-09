import React, {useState} from 'react'
import {View, TouchableOpacity, TextInput} from 'react-native'
import Realm from 'realm'
import uuid from 'uuid'

import {schemas} from '../database/schemas'

import style from './NewEventButton.style'

const NewEventScreen = ({lat, long}) => {
  const [placeName, setPlaceName] = useState('')

  const onPress = async () => {
    const realm = await Realm.open({schema: schemas})
    realm.write(() => {
      const event = realm.create('Event', {
        id: uuid(),
        timestamp: Date.now(),
      })
      const place = realm.create('Place', {
        id: uuid(),
        name: placeName,
      })
      const position = realm.create('Position', {
        id: uuid(),
        lat,
        long,
      })

      position.place = place
      event.place = place
    })
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.button}>
        <TextInput
          placeholder={'Place'}
          value={placeName}
          onChangeText={setPlaceName}
          style={style.input}
        />
      </View>
    </TouchableOpacity>
  )
}

export default NewEventScreen
