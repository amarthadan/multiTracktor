import React, {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigation} from 'react-navigation-hooks'

import {DEFAULT_COORDINATES, ZOOM_LEVEL} from '../constants'
import {coordinatesSelected} from '../redux/actions'
import {locationPermissionsGrantedSelector, currentPositionSelector} from '../redux/selectors'
import {useIpPosition} from '../hooks/position'

import style from './SelectPlaceScreen.style'

const SelectPlaceScreen = () => {
  const [coordinates, setCoordinates] = useState(null)
  const dispatch = useDispatch()
  const {goBack} = useNavigation()
  const locationPermissionsGranted = useSelector(locationPermissionsGrantedSelector)
  const currentPosition = useSelector(currentPositionSelector)
  const ipPosition = useIpPosition()

  const centerCoordinates = currentPosition || ipPosition || DEFAULT_COORDINATES
  const zoom = currentPosition
    ? ZOOM_LEVEL.gpsPosition
    : ipPosition
      ? ZOOM_LEVEL.ipPosition
      : ZOOM_LEVEL.defaultPositon

  const selectPlace = (event) => {
    const {geometry} = event
    setCoordinates(geometry.coordinates)
  }

  const confirmSelection = () => {
    dispatch(coordinatesSelected(coordinates))
    goBack()
  }

  return (
    <View style={style.wrapper}>
      <MapboxGL.MapView style={style.map} onPress={selectPlace}>
        <MapboxGL.Camera
          centerCoordinate={[centerCoordinates.longitude, centerCoordinates.latitude]}
          zoomLevel={zoom}
        />
        {locationPermissionsGranted && <MapboxGL.UserLocation />}
        {coordinates &&
        <MapboxGL.PointAnnotation
          id={'selectedCoordinate'}
          coordinate={coordinates}
        />
        }
      </MapboxGL.MapView>
      <TouchableOpacity onPress={confirmSelection}>
        <Text>Ok</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectPlaceScreen
