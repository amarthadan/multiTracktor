import React, {useState} from 'react'
import {View, FlatList} from 'react-native'
import {NavigationEvents} from 'react-navigation'

import {INITIAL_NUMBER_OF_LIST_ITEMS} from '../constants'
import {getEvents} from '../helpers/database'
import EventButton from './EventButton'

const EventsScreen = () => {
  const [events, setEvents] = useState([])
  const loadEvents = async () => setEvents(await getEvents())

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
        initialNumToRender={INITIAL_NUMBER_OF_LIST_ITEMS}
      />
    </View>
  )
}

export default EventsScreen
