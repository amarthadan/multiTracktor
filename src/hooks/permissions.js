import {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import MapboxGL from '@react-native-mapbox-gl/maps'

import {locationPermissionGrantedChanged} from '../redux/actions'

export const useAskLocationPermissions = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const askPermissions = async () => {
      const granted = await MapboxGL.requestAndroidLocationPermissions()
      dispatch(locationPermissionGrantedChanged(granted))
    }

    askPermissions()
  }, [dispatch])
}
