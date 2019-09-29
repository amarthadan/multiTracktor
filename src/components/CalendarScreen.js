import React, {Fragment, useState, useEffect} from 'react'
import {NavigationEvents} from 'react-navigation'
import {CalendarList} from 'react-native-calendars'
import {format, parseISO} from 'date-fns'
import {useNavigation} from 'react-navigation-hooks'

import {EVENTS} from '../navigation/routes'
import {getEvents, getEventByDate} from '../helpers/database'

const CalendarScreen = () => {
  const {navigate} = useNavigation()
  const [events, setEvents] = useState([])
  const [markedDates, setMarkedDates] = useState({})
  const loadEvents = async () => setEvents(await getEvents())

  const openEvent = async (dayData) => {
    if (!Object.keys(markedDates).includes(dayData.dateString)) {
      return
    }

    const event = await getEventByDate(parseISO(dayData.dateString))
    navigate(EVENTS.EVENT, {eventId: event.id})
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
        futureScrollRange={0}
        markedDates={markedDates}
      />
    </Fragment>

  )
}

export default CalendarScreen
