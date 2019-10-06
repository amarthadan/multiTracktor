import React, {Fragment, useState, useEffect} from 'react'
import {NavigationEvents} from 'react-navigation'
import {CalendarList} from 'react-native-calendars'
import {format, parseISO} from 'date-fns'
import {useNavigation} from 'react-navigation-hooks'
import {useSelector, useDispatch} from 'react-redux'

import {MAIN} from '../navigation/routes'
import {getEvents, getEventByDate} from '../helpers/database'
import {eventActionsModalSelector} from '../redux/selectors'
import {eventActionsModalUpdated} from '../redux/actions'

import EventActionsModal from './EventActionsModal'

const CalendarScreen = () => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()
  const [events, setEvents] = useState([])
  const [markedDates, setMarkedDates] = useState({})
  const loadEvents = async () => setEvents(await getEvents())
  const {
    eventId: actionsModalEventId,
    visible: actionsModalVisible,
    modalId: actionsModalId,
  } = useSelector(eventActionsModalSelector)
  const calendarScreenModalId = 'calendarScreenEventActionsModal'

  const selectEvent = (dayData) => {
    if (!Object.keys(markedDates).includes(dayData.dateString)) {
      return null
    }

    return getEventByDate(parseISO(dayData.dateString))
  }

  const openEvent = async (dayData) => {
    const event = await selectEvent(dayData)
    if (event) {
      navigate(MAIN.EVENT, {eventId: event.id})
    }
  }

  const openActions = async (dayData) => {
    const event = await selectEvent(dayData)
    if (event) {
      dispatch(eventActionsModalUpdated(true, event.id, calendarScreenModalId))
    }
  }

  useEffect(() => {
    setMarkedDates(events.reduce((object, event) => ({
      ...object,
      [format(event.timestamp, 'yyyy-MM-dd')]: {selected: true},
    }), {}))
  }, [events])

  return (
    <Fragment>
      <NavigationEvents
        onWillFocus={loadEvents}
      />
      <CalendarList
        maxDate={new Date()}
        firstDay={1}
        onDayPress={openEvent}
        onDayLongPress={openActions}
        futureScrollRange={0}
        markedDates={markedDates}
      />
      <EventActionsModal
        isVisible={actionsModalVisible && actionsModalId === calendarScreenModalId}
        eventId={actionsModalEventId}
        update={loadEvents}
      />
    </Fragment>

  )
}

export default CalendarScreen
