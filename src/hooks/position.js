import {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import MapboxGL from '@react-native-mapbox-gl/maps'
import {getDistance} from 'geolib'

import {POSITION_UPDATE_RADIUS} from '../constants'
import {currentPositionUpdated} from '../redux/actions'
import {locationPermissionsGrantedSelector, currentPositionSelector} from '../redux/selectors'

export const useCurrentPosition = () => {
  const dispatch = useDispatch()
  const locationPermisionsGranted = useSelector(locationPermissionsGrantedSelector)

  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const locationManager = MapboxGL.locationManager
        const location = await locationManager.getLastKnownLocation()
        dispatch(currentPositionUpdated(location))
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(`Error getting current position: ${error}`)
      }
    }

    if (locationPermisionsGranted) {
      getCurrentPosition()
    }
  }, [dispatch, locationPermisionsGranted])
}

export const useUpdateCurrentPosition = () => {
  const dispatch = useDispatch()
  const locationPermisionsGranted = useSelector(locationPermissionsGrantedSelector)
  const currentPosition = useSelector(currentPositionSelector)

  useEffect(() => {
    const locationManager = MapboxGL.locationManager
    locationManager.removeAllListeners()
    locationManager.start()

    if (locationPermisionsGranted) {
      locationManager.addListener((position) => {
        if (
          !currentPosition
          || getDistance(position.coords, currentPosition) >= POSITION_UPDATE_RADIUS
        ) {
          dispatch(currentPositionUpdated(position))
        }
      })
    }
  }, [currentPosition, dispatch, locationPermisionsGranted])
}

export const useIpPosition = () => {
  const [position, setPosition] = useState()

  useEffect(() => {
    const getIpPosition = async () => {
      const response = await fetch('https://extreme-ip-lookup.com/json')
      const json = response.json()
      if (json.lat && json.lon) {
        setPosition({latitude: json.lat, longitude: json.lon})
      }
    }

    getIpPosition()
  }, [])

  return position
}
