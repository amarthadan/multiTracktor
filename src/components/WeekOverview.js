import React from 'react'
import {View, Text, TouchableOpacity, FlatList} from 'react-native'
import {format} from 'date-fns'
import {useNavigation} from 'react-navigation-hooks'

import {INITIAL_NUMBER_OF_LIST_ITEMS} from '../constants'
import {EVENTS} from '../navigation/routes'
import {useEventByDate} from '../hooks/database'
import {useCurrentWeek} from '../hooks/date'

import style, {rowStyle} from './WeekOverview.style'

const WeekOverviewRow = ({date}) => {
  const {navigate} = useNavigation()
  const day = format(date, 'EEE')
  const event = useEventByDate(date)

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

const WeekOverview = () => {
  const dates = useCurrentWeek()

  return (
    <FlatList
      data={dates}
      renderItem={({item: date}) => <WeekOverviewRow date={date} />}
      keyExtractor={(date) => `${date.getTime()}`}
      initialNumToRender={INITIAL_NUMBER_OF_LIST_ITEMS}
      style={style.wrapper}
    />
  )
}

export default WeekOverview
