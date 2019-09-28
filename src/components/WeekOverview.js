import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {format} from 'date-fns'
import {useNavigation} from 'react-navigation-hooks'

import {EVENTS} from '../navigation/routes'
import {useEventByDate} from '../hooks/database'
import {useCurrentWeek} from '../hooks/date'

import style, {rowStyle} from './WeekOverview.style'

const WeekOverviewRow = ({date}) => {
  const {navigate} = useNavigation()
  const dayName = format(date, 'EEE')
  const event = useEventByDate(date)

  // TODO: Fix back navigation
  const openEvent = () => navigate(EVENTS.EVENT, {eventId: event.id})

  return (
    <View style={rowStyle.wrapper}>
      {
        event
          ? <TouchableOpacity style={rowStyle.row} onPress={openEvent}>
            <Text>{dayName}:</Text>
            <Text>{event.place.name}</Text>
          </TouchableOpacity>
          : <View>
            <Text>{dayName}: -</Text>
          </View>
      }
    </View>
  )
}

const WeekOverview = () => {
  const days = useCurrentWeek()

  return (
    <View style={style.wrapper}>
      {days.map((day) => <WeekOverviewRow date={day} key={day} />)}
    </View>
  )
}

export default WeekOverview
