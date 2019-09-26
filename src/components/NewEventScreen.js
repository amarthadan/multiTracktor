import React, {useState, useEffect} from 'react'
import {View} from 'react-native'
import {useSelector} from 'react-redux'
import Realm from 'realm'

import {schemas, NAMES} from '../database/schemas'
import {selectedCoordinatesSelector, currentPositionSelector} from '../redux/selectors'
import {distanceFromNearest} from '../helpers/maps'

import NewEventButton from './NewEventButton'

const NewEventScreen = () => {
  const [places, setPlaces] = useState([])

  const selectedCoordinates = useSelector(selectedCoordinatesSelector)
  const currentPosition = useSelector(currentPositionSelector)

  useEffect(() => {
    const loadPlaces = async () => {
      const realm = await Realm.open({schema: schemas})
      const dbPlaces = realm.objects(NAMES.PLACE)
      if (currentPosition) {
        const sortedPlaces = dbPlaces
          .map((place) =>
            ({...place, distance: distanceFromNearest(currentPosition, place.positions)}))
          .sort((a, b) => a.distance - b.distance)
        setPlaces(sortedPlaces)

        return
      }

      setPlaces(dbPlaces)
    }

    loadPlaces()
  }, [currentPosition])

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
