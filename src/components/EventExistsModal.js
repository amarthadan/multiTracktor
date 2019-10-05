import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import {useDispatch} from 'react-redux'

import {eventExistsModalUpdated} from '../redux/actions'

import style from './EventExistsModal.style'

const EventExistsModal = ({isVisible}) => {
  const dispatch = useDispatch()
  const toggle = () => dispatch(eventExistsModalUpdated(false))

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={toggle}
      onBackdropPress={toggle}
    >
      <View style={style.wrapper}>
        <Text>Event already exists for selected date.</Text>
        <TouchableOpacity onPress={toggle}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

export default EventExistsModal
