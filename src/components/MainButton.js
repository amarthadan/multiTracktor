import React, {useState} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'

import {GaugeProgress} from 'react-native-simple-gauge'

import styles, {buttonSize, gaugeWidth} from './MainButton.style'
import {COLORS} from '../constants'

const percentage = (f, s) => f / s * 100 || 0

const MainButton = () => {
  const all = 2
  const [visited] = useState(1)

  return (
    <View style={styles.mainButton}>
      <GaugeProgress
        size={buttonSize + gaugeWidth * 2}
        width={gaugeWidth}
        fill={percentage(visited, all)}
        cropDegree={180}
        tintColor={COLORS.secondary.normal}
        backgroundColor={COLORS.secondary.light}
        strokeCap="circle"
      >
        <TouchableOpacity
          style={styles.innerButton}
        >
          <Text style={styles.buttonText}>Main Button</Text>
        </TouchableOpacity>
      </GaugeProgress>
    </View>
  )
}

export default MainButton
