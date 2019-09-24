import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'

import {selectedCoordinatesSelector, currentPositionSelector} from '../redux/selectors'

import NewEventButton from './NewEventButton'

const NewEventScreen = () => {
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()

  const selectedCoordinates = useSelector(selectedCoordinatesSelector)
  const currentPosition = useSelector(currentPositionSelector)

  useEffect(() => {
    if (selectedCoordinates) {
      setLatitude(selectedCoordinates.latitude)
      setLongitude(selectedCoordinates.longitude)
    } else {
      if (currentPosition) {
        setLatitude(currentPosition.latitude)
        setLongitude(currentPosition.longitude)
      }
    }
  }, [currentPosition, selectedCoordinates])

  return (
    <View>
      <NewEventButton latitude={latitude} longitude={longitude} />
    </View>
  )
}

export default NewEventScreen
