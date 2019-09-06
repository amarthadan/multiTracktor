import {Dimensions, StyleSheet} from 'react-native'
import {COLORS} from '../constants'

export const buttonSize =
  Math.min(
    Dimensions.get('window').width,
    Dimensions.get('window').height
  ) / 2

export const gaugeWidth = 40

export default StyleSheet.create({
  innerButton: {
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
  mainButton: {
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: COLORS.primary.text,
  },
})
