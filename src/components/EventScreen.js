import React, {useEffect, useState} from 'react'
import {View, Text} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Realm from 'realm'

import {formatTimestamp} from '../helpers/formatting'
import {mapCenterFromPoints} from '../helpers/maps'
import {schemas, NAMES} from '../database/schemas'

import style from './EventScreen.style'

const EventScreen = () => {
  const {getParam} = useNavigation()
  const eventId = getParam('eventId')
  const [event, setEvent] = useState(null)

  useEffect(() => {
    const loadEvent = async () => {
      const realm = await Realm.open({schema: schemas})
      setEvent(realm.objectForPrimaryKey(NAMES.EVENT, eventId))
    }

    loadEvent()
  }, [eventId])

  return (
    <View style={style.wrapper}>
      {event &&
      <View style={style.wrapper}>
        <Text style={style.place}>{event.place.name}</Text>
        <Text style={style.dateTime}>{formatTimestamp(event.timestamp)}</Text>
        <MapboxGL.MapView style={style.map}>
          <MapboxGL.Camera
            centerCoordinate={mapCenterFromPoints(event.place.positions)}
            zoomLevel={14}
          />
          {event.place.positions.map(
            (position) => (
              <MapboxGL.PointAnnotation
                key={position.id}
                id={position.id}
                coordinate={[position.longitude, position.latitude]}
              />
            )
          )}
        </MapboxGL.MapView>
      </View>
      }
    </View>
  )
}

export default EventScreen
