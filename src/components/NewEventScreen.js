import React from 'react'
import {FlatList} from 'react-native'
import {useSelector} from 'react-redux'

import {INITIAL_NUMBER_OF_LIST_ITEMS} from '../constants'
import {selectedCoordinatesSelector, currentPositionSelector} from '../redux/selectors'
import {usePlaces} from '../hooks/database'

import NewEventButton from './NewEventButton'

const NewEventScreen = () => {
  const selectedCoordinates = useSelector(selectedCoordinatesSelector)
  const currentPosition = useSelector(currentPositionSelector)
  const places = usePlaces(currentPosition)

  return (
    <FlatList
      data={places}
      renderItem={({item: place}) =>
        (<NewEventButton
          placeId={place.id}
          placeName={place.name}
          coordinates={currentPosition}
          key={place.id}
        />)
      }
      keyExtractor={(place) => place.id}
      initialNumToRender={INITIAL_NUMBER_OF_LIST_ITEMS}
      ListFooterComponent={
        () => <NewEventButton coordinates={selectedCoordinates || currentPosition} />
      }
    />

  )
}

export default NewEventScreen
