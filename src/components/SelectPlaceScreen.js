import React, {useState} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'
import {useDispatch} from 'react-redux'
import {useNavigation} from 'react-navigation-hooks'

import {DEFAULT_COORDINATES} from '../constants'
import {coordinatesSelected} from '../redux/actions'

import style from './SelectPlaceScreen.style'

const SelectPlaceScreen = () => {
  const [coordinates, setCoordinates] = useState(DEFAULT_COORDINATES)
  const dispatch = useDispatch()
  const {goBack} = useNavigation()

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
        <MapboxGL.Camera centerCoordinate={DEFAULT_COORDINATES} zoomLevel={12} />
        <MapboxGL.PointAnnotation
          id={'selectedCoordinates'}
          coordinate={coordinates}
        />
      </MapboxGL.MapView>
      <TouchableOpacity onPress={confirmSelection}>
        <Text>Ok</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectPlaceScreen
