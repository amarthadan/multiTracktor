import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import Modal from 'react-native-modal'
import {useDispatch} from 'react-redux'

import {deleteEvent} from '../helpers/database'
import {eventActionsModalUpdated} from '../redux/actions'

import style from './EventActionsModal.style'

const EventActionsModal = ({isVisible, eventId, update}) => {
  const dispatch = useDispatch()

  const toggle = () => dispatch(eventActionsModalUpdated(false, null, null))
  const removeEvent = () => {
    deleteEvent(eventId)
    update()
    toggle()
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View style={style.wrapper}>
        <TouchableOpacity onPress={removeEvent}>
          <Text>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggle}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default EventActionsModal
