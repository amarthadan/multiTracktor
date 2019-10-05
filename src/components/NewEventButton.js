import React, {useState} from 'react'
import {View, TouchableOpacity, TextInput, Text} from 'react-native'
import {useDispatch} from 'react-redux'
import {useNavigation} from 'react-navigation-hooks'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {format} from 'date-fns'

import {MAIN} from '../navigation/routes'
import {coordinatesSelected, eventExistsModalUpdated} from '../redux/actions'
import {usePlace} from '../hooks/database'
import {saveEvent, saveEventWithPlace, isEventOnDate} from '../helpers/database'

import style from './NewEventButton.style'

const NewEventButton = ({coordinates, placeId, placeName}) => {
  const {navigate, goBack} = useNavigation()
  const [moreOptions, setMoreOptions] = useState(false)
  const [dateTimePicker, setDateTimePicker] = useState(false)
  const [newPlaceName, setNewPlaceName] = useState('')
  const [date, setDate] = useState(new Date())
  const place = usePlace(placeId)
  const dispatch = useDispatch()

  const toggleMoreOptions = () => setMoreOptions(!moreOptions)
  const toggleDateTimePicker = () => setDateTimePicker(!dateTimePicker)
  const selectDateTime = (date) => {
    setDate(date)
    toggleDateTimePicker()
  }

  const onPress = async () => {
    if (await isEventOnDate(date)) {
      dispatch(eventExistsModalUpdated(true))
      return
    }

    place
      ? await saveEventWithPlace(date, coordinates, place)
      : await saveEvent(date, coordinates, newPlaceName)

    dispatch(coordinatesSelected(null))
    goBack()
  }

  return (
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
  )
}

export default NewEventButton
