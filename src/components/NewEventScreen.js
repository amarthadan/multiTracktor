import React from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'

import {selectedCoordinatesSelector, currentPositionSelector} from '../redux/selectors'
import {usePlaces} from '../hooks/database'

import NewEventButton from './NewEventButton'

const NewEventScreen = () => {
  const selectedCoordinates = useSelector(selectedCoordinatesSelector)
  const currentPosition = useSelector(currentPositionSelector)
  const places = usePlaces(currentPosition)

  return (
    <View>
      {
        places.map((place) => (
          <NewEventButton
            placeId={place.id}
            placeName={place.name}
            coordinates={currentPosition}
            key={place.id}
          />
        ))
      }
      <NewEventButton coordinates={selectedCoordinates || currentPosition} />
    </View>
  )
}

export default NewEventScreen
