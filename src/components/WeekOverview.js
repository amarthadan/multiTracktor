import React from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import {format, startOfWeek, addDays, isSameDay} from 'date-fns'
import {useNavigation} from 'react-navigation-hooks'

import {INITIAL_NUMBER_OF_LIST_ITEMS} from '../constants'
import {EVENTS} from '../navigation/routes'

import style, {rowStyle} from './WeekOverview.style'

const WeekOverviewRow = ({date, event}) => {
  const {navigate} = useNavigation()
  const day = format(date, 'EEEE')

  // TODO: Fix back navigation
  const openEvent = () => navigate(EVENTS.EVENT, {eventId: event.id})

  return (
    <View style={rowStyle.wrapper}>
      {
        event
          ? <TouchableOpacity style={rowStyle.row} onPress={openEvent}>
            <Text>{day}:</Text>
            <Text>{event.place.name}</Text>
          </TouchableOpacity>
          : <View>
            <Text>{day}: -</Text>
          </View>
      }
    </View>
  )
}

const WeekOverview = ({events}) => {
  const currentDate = new Date()
  const dates = Array(7)
    .fill(startOfWeek(currentDate, {weekStartsOn: 1}))
    .map((date, i) => addDays(date, i))
  const datesAndEvents = dates.map((date) =>
    [date, events.find((e) => isSameDay(e.timestamp, date))]
  )

  return (
    <FlatList
      data={datesAndEvents}
      renderItem={({item: [date, event]}) => <WeekOverviewRow date={date} event={event} />}
      keyExtractor={([date, event]) => `${date.getTime()}`}
      initialNumToRender={INITIAL_NUMBER_OF_LIST_ITEMS}
      style={style.wrapper}
    />
  )
}

export default WeekOverview
