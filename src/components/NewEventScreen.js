import React, {Fragment} from 'react'
import {FlatList, View} from 'react-native'
import {useSelector} from 'react-redux'

import {INITIAL_NUMBER_OF_LIST_ITEMS} from '../constants'
import {
  selectedCoordinatesSelector,
  currentPositionSelector,
  eventExistsModalSelector,
} from '../redux/selectors'
import {usePlaces} from '../hooks/database'

import NewEventButton from './NewEventButton'
import EventExistsModal from './EventExistsModal'

const NewEventScreen = () => {
  const selectedCoordinates = useSelector(selectedCoordinatesSelector)
  const currentPosition = useSelector(currentPositionSelector)
  const places = usePlaces(currentPosition)
  const {visible: eventExistsModalVisible} = useSelector(eventExistsModalSelector)

  return (
    <Fragment>
      <View>
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
        />
        <NewEventButton coordinates={selectedCoordinates || currentPosition} />
      </View>
      <EventExistsModal isVisible={eventExistsModalVisible} />
    </Fragment>
  )
}

export default NewEventScreen
