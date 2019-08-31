import React from 'react'
import {TouchableOpacity, Text} from 'react-native'

import {GaugeProgress} from 'react-native-simple-gauge'

import styles, {buttonSize, gaugeWidth} from './MainButton.style'

const MainButton = () => {
  return (
     <GaugeProgress
       size={buttonSize + gaugeWidth * 2}
       width={gaugeWidth}
       fill={69}
       cropDegree={180}
       tintColor="#4682b4"
       backgroundColor="#b0c4de">
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => {}}>
          <Text>Main Button</Text>
        </TouchableOpacity>
      </GaugeProgress>
  )
}

export default MainButton
