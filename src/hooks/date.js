import {useEffect, useState} from 'react'
import {startOfWeek, addDays} from 'date-fns'

export const useCurrentWeek = () => {
  const [days, setDays] = useState([])

  useEffect(() => {
    const weekStart = startOfWeek(new Date(), {weekStartsOn: 1})
    setDays(Array(7).fill(weekStart).map((date, i) => addDays(date, i)))
  }, [])

  return days
}
