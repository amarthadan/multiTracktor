import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'
import Realm from 'realm'

import {schemas, NAMES} from '../database/schemas'

const EventScreen = () => {
  const {getParam} = useNavigation()
  const eventId = getParam('eventId')
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const loadEvent = async () => {
      const realm = await Realm.open({schema: schemas})
      const dbEvent = realm.objectForPrimaryKey(NAMES.EVENT, eventId)
      setEvent(dbEvent)
    }

    loadEvent()
  }, [eventId])

  return (
    <View>
      {event &&
      <View>
        <Text>{event.id}</Text>
        <Text>{event.timestamp}</Text>
        <Text>Place:</Text>
        <Text>{event.place.id}</Text>
        <Text>{event.place.name}</Text>
        {event.place.positions.map((position) => (
          <View key={position.id}>
            <Text>Position:</Text>
            <Text>{position.id}</Text>
            <Text>{position.lat}</Text>
            <Text>{position.long}</Text>
          </View>
        ))}
      </View>
      }
    </View>
  )
}

export default EventScreen
