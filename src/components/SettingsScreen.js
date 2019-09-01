import React, {useState} from 'react'
import {View, Text, Picker} from 'react-native'
import Slider from '@react-native-community/slider'
import {NavigationEvents} from 'react-navigation'

import {TIME_PERIODS} from '../constants'
import {useSettings, useStoreSettings} from '../hooks/settings'

const SettingsScreen = () => {
  const settings = useSettings()
  const storeSettings = useStoreSettings()
  const [timePeriod, setTimePeriod] = useState(settings['@time_period'])
  const [goal, setGoal] = useState(Number(settings['@goal']))

  return (
    <View>
      <NavigationEvents
        onWillBlur={() => storeSettings({'@time_period': timePeriod, '@goal': `${goal}`})}
      />
      <View>
        <Text>Time period:</Text>
        <Picker
          selectedValue={timePeriod}
          onValueChange={(value) => setTimePeriod(value)}
        >
          {TIME_PERIODS.map(
            (period) => <Picker.Item label={period} value={period} key={period} />
          )}
        </Picker>
      </View>
      <View>
        <Text>Goal:</Text>
        <Text>{goal}</Text>
        <Slider
          minimumValue={1}
          maximumValue={365}
          step={1}
          value={goal}
          onValueChange={(value) => setGoal(value)}
        />
      </View>
    </View>
  )
}

export default SettingsScreen
