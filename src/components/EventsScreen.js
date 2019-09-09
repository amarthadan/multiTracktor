import React, {useState, useCallback} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Realm from 'realm'
import {NavigationEvents} from 'react-navigation'
import {useNavigation} from 'react-navigation-hooks'

import {EVENTS} from '../navigation/routes'
import {schemas, NAMES} from '../database/schemas'

const EventsScreen = () => {
  const {navigate} = useNavigation()
  const [events, setEvents] = useState([])

  const loadEvents = useCallback(async () => {
    const realm = await Realm.open({schema: schemas})
    const dbEvents = realm.objects(NAMES.EVENT)
    setEvents(dbEvents)
  }, [])

  return (
    <View>
      <NavigationEvents
        onWillFocus={loadEvents}
      />
      {
        events.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => navigate(EVENTS.EVENT, {eventId: event.id})}
          >
            <Text>{event.id}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default EventsScreen
