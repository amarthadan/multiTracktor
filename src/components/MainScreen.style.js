import {StyleSheet} from 'react-native'
import {COLORS} from '../constants'

export default StyleSheet.create({
  mainView: {
    backgroundColor: COLORS.primary.light,
    alignItems: 'stretch',
    flex: 1,
  },
  weekOverview: {
    flex: 3,
  },
  mainButton: {
    flex: 2,
  },
})
