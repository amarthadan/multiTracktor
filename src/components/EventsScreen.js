import React, {useState, useCallback} from 'react'
import {View, FlatList} from 'react-native'
import Realm from 'realm'
import {NavigationEvents} from 'react-navigation'

import {schemas, NAMES} from '../database/schemas'
import EventButton from './EventButton'

const EventsScreen = () => {
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
      <FlatList
        data={events}
        renderItem={({item: event}) =>
          <EventButton id={event.id} timestamp={event.timestamp} place={event.place.name} />
        }
        keyExtractor={(event) => event.id}
      />
    </View>
  )
}

export default EventsScreen
