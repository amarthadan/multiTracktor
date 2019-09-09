import React from 'react'

import {CalendarList} from 'react-native-calendars'

const CalendarScreen = () => {
  return (
    <CalendarList
      pastScrollRange={3}
      futureScrollRange={0}
    />
  )
}

export default CalendarScreen
