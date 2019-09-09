import React from 'react'
import {Text, View} from 'react-native'

import _ from 'lodash'

const DAY = 3600000*24

const week = () => _.range(7).map(d => new Date(Date.now() - DAY * d))

const WeekOverview = () => {
  const overview = week().map(d =>
    <View key={d.toString()} style={{flex: 1}}>
      <Text>
        {d.toString()}
      </Text>
    </View>
  )

  return (
    <View style={{flex: 1}}>
      {overview}
    </View>
  )
}

export default WeekOverview
