import React from 'react'
import {TouchableOpacity, Text} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'

import {EVENTS} from '../navigation/routes'
import {formatTimestamp} from '../helpers/formatting'

import style from './EventButton.style'

const EventButton = ({id, place, timestamp}) => {
  const {navigate} = useNavigation()

  const openEvent = () => navigate(EVENTS.EVENT, {eventId: id})

  return (
    <TouchableOpacity onPress={openEvent}>
      <Text style={style.place}>{place}</Text>
      <Text style={style.dateTime}>{formatTimestamp(timestamp)}</Text>
    </TouchableOpacity>
  )
}

export default EventButton
