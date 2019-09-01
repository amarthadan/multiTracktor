import React from 'react'
import {View} from 'react-native'

import WeekOverview from './WeekOverview'
import MainButton from './MainButton'
import styles from './MainScreen.style'

const MainScreen = () => {
  return (
    <View style={styles.mainView}>
      <View style={styles.weekOverview}>
        <WeekOverview />
      </View>
      <View style={styles.mainButton}>
        <MainButton />
      </View>
    </View>
  )
}

export default MainScreen
