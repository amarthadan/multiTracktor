import React from 'react'
import {TouchableOpacity, Text, View} from 'react-native'
import {useNavigation} from 'react-navigation-hooks'
import {AnimatedGaugeProgress} from 'react-native-simple-gauge'

import {COLORS} from '../constants'
import {MAIN} from '../navigation/routes'
import {useStatus} from '../hooks/status'

import style, {buttonSize, gaugeWidth} from './MainButton.style'

const MainButton = () => {
  const {navigate} = useNavigation()
  const percentage = useStatus()

  const openNewEvent = () => navigate(MAIN.NEW_EVENT)

  return (
    <View style={style.wrapper}>
      <AnimatedGaugeProgress
        size={buttonSize + gaugeWidth * 2}
        width={gaugeWidth}
        fill={percentage}
        cropDegree={180}
        tintColor={COLORS.secondary.normal}
        backgroundColor={COLORS.secondary.light}
      >
        <TouchableOpacity style={style.button} onPress={openNewEvent}>
          <Text>Main Button</Text>
        </TouchableOpacity>
      </AnimatedGaugeProgress>
    </View>
  )
}

export default MainButton
