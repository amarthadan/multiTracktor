import React, {Fragment} from 'react'
import {TouchableOpacity, Text} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'
import {useDispatch} from 'react-redux'

import {MAIN} from '../navigation/routes'
import {formatTimestamp} from '../helpers/formatting'
import {eventActionsModalUpdated} from '../redux/actions'

import style from './EventButton.style'

const EventButton = ({id, place, timestamp, eventActionsModalId}) => {
  const {navigate} = useNavigation()
  const dispatch = useDispatch()

  const openEvent = () => navigate(MAIN.EVENT, {eventId: id})
  const openActions = () => dispatch(eventActionsModalUpdated(true, id, eventActionsModalId))

  return (
    <Fragment>
      <TouchableOpacity onPress={openEvent} onLongPress={openActions}>
        <Text style={style.place}>{place}</Text>
        <Text style={style.dateTime}>{formatTimestamp(timestamp)}</Text>
      </TouchableOpacity>
    </Fragment>

  )
}

export default EventButton
