import {Dimensions, StyleSheet} from 'react-native'
import {COLORS} from '../constants'

export const buttonSize =
  Math.min(
    Dimensions.get('window').width,
    Dimensions.get('window').height
  ) / 2

export const gaugeWidth = 30

export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize,
    backgroundColor: COLORS.primary.normal,
    alignItems: 'center',
    justifyContent: 'center',
    top: gaugeWidth,
    left: gaugeWidth,
  },
})
