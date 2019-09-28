import React, {Fragment, useState} from 'react'
import {View, TouchableOpacity, TextInput, Text} from 'react-native'
import Modal from 'react-native-modal'
import {useDispatch} from 'react-redux'
import {useNavigation} from 'react-navigation-hooks'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {format} from 'date-fns'

import {MAIN} from '../navigation/routes'
import {coordinatesSelected} from '../redux/actions'
import {usePlace} from '../hooks/database'
import {saveEvent, saveEventWithPlace, isEventOnDate} from '../helpers/database'

import style, {modalStyle} from './NewEventButton.style'

const NewEventButton = ({coordinates, placeId, placeName}) => {
  const {navigate, goBack} = useNavigation()
  const [moreOptions, setMoreOptions] = useState(false)
  const [dateTimePicker, setDateTimePicker] = useState(false)
  const [newPlaceName, setNewPlaceName] = useState('')
  const [date, setDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)
  const place = usePlace(placeId)
  const dispatch = useDispatch()

  const toggleMoreOptions = () => setMoreOptions(!moreOptions)
  const toggleDateTimePicker = () => setDateTimePicker(!dateTimePicker)
  const selectDateTime = (date) => {
    setDate(date)
    toggleDateTimePicker()
  }
  const toggleModal = () => setModalVisible(!modalVisible)

  const onPress = async () => {
    if (await isEventOnDate(date)) {
      toggleModal()
      return
    }

    place
      ? await saveEventWithPlace(date, coordinates, place)
      : await saveEvent(date, coordinates, newPlaceName)

    dispatch(coordinatesSelected(null))
    goBack()
  }

  return (
    <Fragment>
      <View style={style.wrapper}>
        <View style={style.inputWrapper}>
          <TouchableOpacity onPress={onPress}>
            {
              placeId
                ? <Text>{placeName}</Text>
                : <TextInput
                  placeholder={'Place'}
                  value={newPlaceName}
                  onChangeText={setNewPlaceName}
                  style={style.input}
                />
            }
            {
              moreOptions &&
              <View>
                <TouchableOpacity onPress={toggleDateTimePicker}>
                  <Text>{format(date, 'dd.MM.yyyy HH:mm')}</Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={dateTimePicker}
                  onConfirm={selectDateTime}
                  onCancel={toggleDateTimePicker}
                  date={date}
                  mode={'datetime'}
                  is24Hour
                />
                {
                  !placeId &&
                  <TouchableOpacity onPress={() => navigate(MAIN.SELECT_PLACE)}>
                    <Text>Select place</Text>
                  </TouchableOpacity>
                }
              </View>
            }
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={toggleMoreOptions}
          style={style.moreOptionsButton}
        />
      </View>
      <Modal
        isVisible={modalVisible}
        onBackButtonPress={toggleModal}
        onBackdropPress={toggleModal}
      >
        <View style={modalStyle.wrapper}>
          <Text>Event already exists for selected date.</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Fragment>
  )
}

export default NewEventButton
