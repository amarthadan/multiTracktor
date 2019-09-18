import React, {useState} from 'react'
import {View, TouchableOpacity, TextInput, Text} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import Realm from 'realm'
import uuid from 'uuid'
import {format, getTime} from 'date-fns'
import {useNavigation} from 'react-navigation-hooks'
import {useSelector} from 'react-redux'

import {MAIN} from '../navigation/routes'
import {schemas} from '../database/schemas'
import {selectedCoordinatesSelector} from '../redux/selectors'

import style from './NewEventButton.style'

const NewEventScreen = () => {
  const {navigate} = useNavigation()
  const [moreOptions, setMoreOptions] = useState(false)
  const [dateTimePicker, setDateTimePicker] = useState(false)
  const [placeName, setPlaceName] = useState('')
  const [date, setDate] = useState(new Date())
  const [longitude, latitude] = useSelector(selectedCoordinatesSelector)

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
                <Text>Lat: {latitude}</Text>
                <Text>Long: {longitude}</Text>
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
