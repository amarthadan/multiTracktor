import React, {Fragment, useState} from 'react'
import {FlatList} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {useSelector} from 'react-redux'

import {INITIAL_NUMBER_OF_LIST_ITEMS} from '../constants'
import {getEvents} from '../helpers/database'
import {eventActionsModalSelector} from '../redux/selectors'

import EventButton from './EventButton'
import EventActionsModal from './EventActionsModal'

const EventsScreen = () => {
  const [events, setEvents] = useState([])
  const loadEvents = async () => setEvents(await getEvents())
  const {
    eventId: actionsModalEventId,
    visible: actionsModalVisible,
    modalId: actionsModalId,
  } = useSelector(eventActionsModalSelector)
  const eventsScreenModalId = 'eventsScreenEventActionsModal'

  return (
    <Fragment>
      <NavigationEvents
        onWillFocus={loadEvents}
      />
      <FlatList
        data={events}
        renderItem={({item: event}) =>
          (<EventButton
            id={event.id}
            timestamp={event.timestamp}
            place={event.place.name}
            eventActionsModalId={eventsScreenModalId}
          />)
        }
        keyExtractor={(event) => event.id}
        initialNumToRender={INITIAL_NUMBER_OF_LIST_ITEMS}
      />
      <EventActionsModal
        isVisible={actionsModalVisible && actionsModalId === eventsScreenModalId}
        eventId={actionsModalEventId}
        update={loadEvents}
      />
    </Fragment>
  )
}

export default EventsScreen
