import React, {useState} from 'react'
import {View, Text, Picker} from 'react-native'
import {useSelector} from 'react-redux'
import Slider from '@react-native-community/slider'
import {NavigationEvents} from 'react-navigation'

import {TIME_PERIODS, SETTINGS_KEYS} from '../constants'
import {useStoreSettings} from '../hooks/settings'
import {settingsGoalSelector, settingsTimePeriodSelector} from '../redux/selectors'

const SettingsScreen = () => {
  const storeSettings = useStoreSettings()
  const [timePeriod, setTimePeriod] = useState(useSelector(settingsTimePeriodSelector))
  const [goal, setGoal] = useState(Number(useSelector(settingsGoalSelector)))

  return (
    <View>
      <NavigationEvents
        onWillBlur={() => storeSettings({
          [SETTINGS_KEYS.TIME_PERIOD]: timePeriod,
          [SETTINGS_KEYS.GOAL]: `${goal}`,
        })}
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
