import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  setMonth,
  addMonths,
} from 'date-fns'

import {settingsGoalSelector, settingsTimePeriodSelector} from '../redux/selectors'
import {countEventsBetweenDates} from '../helpers/database'

export const useStatus = () => {
  const goal = useSelector(settingsGoalSelector)
  const timePeriod = useSelector(settingsTimePeriodSelector)
  const [numberOfEvents, setNumberOfEvents] = useState(0)
  const [percentage, setPercentage] = useState(0)

  useEffect(() => {
    if (!goal || !timePeriod) {
      return
    }

    let startDate, endDate
    const current = new Date()

    const countEvents = async (startDate, endDate) => {
      setNumberOfEvents(await countEventsBetweenDates(startDate, endDate))
    }

    switch (Number(timePeriod)) {
      case 1:
        startDate = startOfMonth(current)
        endDate = endOfMonth(current)
        break
      case 3:
        startDate = startOfQuarter(current)
        endDate = endOfQuarter(current)
        break
      case 6: {
        const current = new Date()
        const middle = setMonth(current, 6)

        if (current <= middle) {
          startDate = startOfYear(current)
          endDate = middle
        } else {
          startDate = startOfMonth(addMonths(middle, 1))
          endDate = endOfYear(current)
        }
        break
      }
      default:
        startDate = startOfYear(current)
        endDate = endOfYear(current)
    }

    countEvents(startDate, endDate)
    setPercentage(numberOfEvents / Number(goal) * 100)
  }, [goal, numberOfEvents, timePeriod])

  return percentage
}
