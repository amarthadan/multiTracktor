import React, {useState} from 'react'
import {TouchableOpacity, Text, View} from 'react-native'

import {GaugeProgress} from 'react-native-simple-gauge'

import styles, {buttonSize, gaugeWidth} from './MainButton.style'

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
        tintColor="#4682b4"
        backgroundColor="#b0c4de"
      >
        <TouchableOpacity
          style={styles.innerButton}
        >
          <Text>Main Button</Text>
        </TouchableOpacity>
      </GaugeProgress>
    </View>
  )
}

export default MainButton
