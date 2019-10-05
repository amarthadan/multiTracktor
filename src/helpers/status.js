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

import {countEventsBetweenDates} from './database'

export const getStatus = async (goal, timePeriod) => {
  if (!goal || !timePeriod) {
    return 0
  }

  let startDate, endDate
  const current = new Date()

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

  const numberOfEvents = await countEventsBetweenDates(startDate, endDate)

  return (numberOfEvents / Number(goal) * 100)
}
