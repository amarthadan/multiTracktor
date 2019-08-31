import {Dimensions, StyleSheet} from 'react-native'

export const buttonSize = Math.min(Dimensions.get('window').width,
                                   Dimensions.get('window').height) / 2

export const gaugeWidth = 20

export default StyleSheet.create({
  mainButton: {
    position: 'absolute',
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center',
    top: gaugeWidth,
    left: gaugeWidth,
  },
})
