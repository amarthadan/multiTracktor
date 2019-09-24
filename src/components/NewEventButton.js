import React, {useState} from 'react'
import {View, TouchableOpacity, TextInput, Text} from 'react-native'
import {useDispatch} from 'react-redux'
import {useNavigation} from 'react-navigation-hooks'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Realm from 'realm'
import uuid from 'uuid'
import {format, getTime} from 'date-fns'

import {MAIN} from '../navigation/routes'
import {schemas} from '../database/schemas'
import {coordinatesSelected} from '../redux/actions'

import style from './NewEventButton.style'

const NewEventScreen = ({latitude, longitude}) => {
  const {navigate} = useNavigation()
  const [moreOptions, setMoreOptions] = useState(false)
  const [dateTimePicker, setDateTimePicker] = useState(false)
  const [placeName, setPlaceName] = useState('')
  const [date, setDate] = useState(new Date())
  const dispatch = useDispatch()

  const onPress = async () => {
    const realm = await Realm.open({schema: schemas})
    realm.write(() => {
      const event = realm.create('Event', {
        id: uuid(),
        timestamp: getTime(date),
      })
      const place = realm.create('Place', {
        id: uuid(),
        name: placeName,
      })
      const position = realm.create('Position', {
        id: uuid(),
        latitude,
        longitude,
      })

      position.place = place
      event.place = place
    })

    dispatch(coordinatesSelected(null))
  }

  const toggleMoreOptions = () => setMoreOptions(!moreOptions)
  const toggleDateTimePicker = () => setDateTimePicker(!dateTimePicker)
  const selectDateTime = (date) => {
    setDate(date)
    toggleDateTimePicker()
  }

  return (

    <View style={style.wrapper}>
      <View style={style.inputWrapper}>
        <TouchableOpacity onPress={onPress}>
          <TextInput
            placeholder={'Place'}
            value={placeName}
            onChangeText={setPlaceName}
            style={style.input}
          />
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
              <TouchableOpacity onPress={() => navigate(MAIN.SELECT_PLACE)}>
                <Text>Select place</Text>
              </TouchableOpacity>
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

export default NewEventScreen
