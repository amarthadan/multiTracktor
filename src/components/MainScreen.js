import React, {Fragment, useState, useEffect, useCallback} from 'react'
import {useSelector} from 'react-redux'
import {View, TouchableOpacity, Text} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {useNavigation} from 'react-navigation-hooks'
import {startOfWeek, endOfWeek} from 'date-fns'

import {MAIN} from '../navigation/routes'
import {settingsGoalSelector, settingsTimePeriodSelector} from '../redux/selectors'
import {getStatus} from '../helpers/status'
import {getEventsBetweenDates} from '../helpers/database'

import WeekOverview from './WeekOverview'
import MainButton from './MainButton'

import styles from './MainScreen.style'

const MainScreen = () => {
  const {navigate} = useNavigation()
  const goal = useSelector(settingsGoalSelector)
  const timePeriod = useSelector(settingsTimePeriodSelector)
  const [percentage, setPercentage] = useState(0)
  const [currentWeekEvents, setCurrentWeekEvents] = useState([])

  const refresh = useCallback(async () => {
    const currentDate = new Date()
    const events = await getEventsBetweenDates(
      startOfWeek(currentDate, {weekStartsOn: 1}),
      endOfWeek(currentDate, {weekStartsOn: 1})
    )

    setCurrentWeekEvents(events)
    setPercentage(await getStatus(goal, timePeriod))
  }, [goal, timePeriod])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <Fragment>
      <NavigationEvents
        onWillFocus={refresh}
      />
      <View style={styles.mainView}>
        <View style={styles.weekOverview}>
          <WeekOverview events={currentWeekEvents} />
        </View>
        <View style={styles.mainButton}>
          <MainButton percentage={percentage} />
        </View>
        <View>
          <TouchableOpacity onPress={() => navigate(MAIN.SETTINGS)}>
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  )
}

export default MainScreen
